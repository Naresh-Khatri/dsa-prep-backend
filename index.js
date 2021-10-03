const express = require('express');
const app = express()
const { c, cpp, java, python, node } = require('compile-run')
const morgan = require('morgan')

const PORT = 3333;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  next()
})
app.use(express.json())
app.use(morgan('dev'))


app.post("/", async (req, res) => {
  console.log(req.body)
  let sourceCode = req.body.code
  let lang = req.body.lang
  try {
    switch (lang) {
      case 'c':
        res.send(await c.runSource(sourceCode))
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

app.listen(PORT, () => { console.log(`Server up on http://localhost:${PORT}`) })