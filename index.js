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

    try {
      //run source code for every test case
      questions[body.qNo].testCases.forEach(async testCase => {
        let output = await c.runSource(body.code, { stdin: testCase.input })
        console.log('test   input: ' + testCase.input)
        console.log('users output: ' + output.stdout)
        console.log('test  output: ' + testCase.output)

        //using regex since replaceAll not available <es12+
        console.log(output.stdout.replace(/ /g, ''), testCase.output.replace(/ /g, ''))
        console.log(output.stdout.replace(/ /g, '') == testCase.output.replace(/ /g, ''))
        resolve(output)
      });
    }
    catch (err) {
      console.log(err)
      reject(err)
    }
  })
}


app.listen(PORT, () => { console.log(`Server up on http://localhost:${PORT}`) })