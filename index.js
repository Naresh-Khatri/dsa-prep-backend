const express = require('express');
const app = express()
const { c, cpp, java, python, node } = require('compile-run')
const morgan = require('morgan')
const cors = require('cors')

// const questions = require('./questions');
const questions = require('../../project-quasar/dsa-prep-spa/src/questions');


const PORT = 3333;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  next()
})
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


app.post("/", async (req, res) => {
  console.log(req.body)
  let sourceCode = req.body.code
  let lang = req.body.lang
  try {
    switch (lang) {
      case 'c':
        res.send(await executeC(req.body))
        break
      case 'cpp':
        res.send(await cpp.runSource(sourceCode))
        break
      case 'python':
        res.send(await python.runSource(sourceCode))
        break
      case 'java':
        // res.send(await java.runSource(sourceCode))
        res.send({ stderr: 'Currently not executing java 😢' })
        break
      case 'javascript':
        res.send(await node.runSource(sourceCode))
        break
      default:
        res.send({ stderr: 'unsupported language!😭' })
    }
  }
  catch (err) {
    console.log(err)
    res.send({ stderr: 'something is fishy 🐟' })
  }
}
);

function executeC(body) {
  return new Promise(async (resolve, reject) => {

    let payload = {passedCount:0, totalCount:0, tests: [] };
    try {
      payload.totalCount = questions[body.qNo].testCases.length
      //runs source code for every test case
      //using Promise.all since forEach doesnt work with await
      await Promise.all(questions[body.qNo].testCases.map(async (testCase) => {
        //run the test case with testCase.input
        let output = await c.runSource(body.code, { stdin: testCase.input })

        //testing out user's output
        console.log(`test   input: ${testCase.input}\nusers output: ${output.stdout}\ntest  output: ${testCase.output}`);

        //using regex since replaceAll not available <es12+
        console.log(output.stdout.replace(/ /g, ''), testCase.output.replace(/ /g, ''))
        let passed = output.stdout.replace(/ /g, '') == testCase.output.replace(/ /g, '')
        
        //add expected output and inputFront to output obj
        output.expout = testCase.output
        output.input = testCase.inputFront || 'test input not found!'
        
        // console.log(output)
        // console.log(passed)

        //increament if passed
        if(passed) payload.passedCount++
        Object.assign(output, { passed: passed })
        payload.tests.push(output)
      }))
      // console.log(payload)
      resolve(payload)
    }
    catch (err) {
      console.log(err)
      reject(err)
    }
  })
}


app.listen(PORT, () => { console.log(`Server up on http://localhost:${PORT}`) })