import express from "express";
import  { c, cpp, java, python, node } from 'compile-run'
import  questions from '../questions.js'

const Router = express.Router();

Router.post("/", async (req, res) => {
  // console.log(req.body)
//   let sourceCode = req.req.body.code;
  let lang = req.body.lang;
  try {
    res.send(await execute(lang, req.body));
    // switch (lang) {
    //   case 'c':
    //     res.send(await execute('c', req.body))
    //     break
    //   case 'cpp':
    //     res.send(await execute('cpp', req.body))
    //     break
    //   case 'python':
    //     res.send(await python.runSource(sourceCode))
    //     break
    //   case 'java':
    //     // res.send(await java.runSource(sourceCode))
    //     res.send({ stderr: 'Currently not executing java 😢' })
    //     break
    //   case 'javascript':
    //     res.send(await node.runSource(sourceCode))
    //     break
    //   default:
    //     res.send({ stderr: 'unsupported language!😭' })
    // }
  } catch (err) {
    console.log(err);
    res.send({ stderr: "something is fishy 🐟" });
  }
});

Router.post("/playground", async (req, res) => {
  // console.log(req.body)
//   let sourceCode = req.req.body.code;
  let lang = req.body.lang;
  try {
    let output = null;
    switch (lang) {
        //run the test case with testCase.input
        case "c":
          // res.send(await execute('c', req.body))
          output = await c.runSource(req.body.code, { stdin: req.body.input });
          break;
        case "cpp":
          // res.send(await execute('cpp', req.body))
          output = await cpp.runSource(req.body.code, {
            stdin: req.body.input,
          });
          break;
        case "python":
          // res.send(await python.runSource(sourceCode))
          output = await python.runSource(req.body.code, {
            stdin: req.body.input,
          });
          break;
        case "java":
          // res.send(await java.runSource(sourceCode))
          output = { stderr: "Currently not executing java 😢" };
          // output = await java.runSource(req.body.code, { stdin: req.body.input })
          break;
        case "javascript":
          // res.send(await node.runSource(sourceCode))
          output = await node.runSource(req.body.code, {
            stdin: req.body.input,
          });
          break;
        default:
          output = { stderr: "unsupported language!😭" };
      }
      console.log(output);
      //resolve error in payload if stderr is present
      if (output.stderr || !output.stdout) {
        let payload = { error: output.stderr}
        return res.json(payload);
      }
      res.send(output);
  } catch (err) {
    console.log(err);
    res.status(404).send({ stderr: "something is fishy 🐟" });
  }
});

function execute(lang, body) {
  return new Promise(async (resolve, reject) => {
    console.log(lang);

    let payload = { passedCount: 0, totalCount: 0, tests: [] };

    try {
      let output = null;
      payload.totalCount = questions[body.qNo].testCases.length;
      //runs source code for every test case
      //using Promise.all since forEach doesnt work with await
      await Promise.all(
        questions[body.qNo].testCases.map(async (testCase) => {
          switch (lang) {
            //run the test case with testCase.input
            case "c":
              // res.send(await execute('c', req.body))
              output = await c.runSource(req.body.code, { stdin: testCase.input });
              break;
            case "cpp":
              // res.send(await execute('cpp', req.body))
              output = await cpp.runSource(req.body.code, {
                stdin: testCase.input,
              });
              break;
            case "python":
              // res.send(await python.runSource(sourceCode))
              output = await python.runSource(req.body.code, {
                stdin: testCase.input,
              });
              break;
            case "java":
              // res.send(await java.runSource(sourceCode))
              output = { stderr: "Currently not executing java 😢" };
              // output = await java.runSource(req.body.code, { stdin: testCase.input })
              break;
            case "javascript":
              // res.send(await node.runSource(sourceCode))
              output = await node.runSource(req.body.code, {
                stdin: testCase.input,
              });
              break;
            default:
              output = { stderr: "unsupported language!😭" };
          }
          console.log(output);
          //resolve error in payload if stderr is present
          if (output.stderr || !output.stdout) {
            payload.error = output.stderr;
            return resolve(payload);
          }

          //loging out user's output with test output
          console.log(
            `test   input: ${testCase.input}\nusers output: ${output.stdout}\ntest  output: ${testCase.output}`
          );

          //using regex since replaceAll not available <es12+
          console.log(
            output.stdout.replace(/ /g, ""),
            testCase.output.replace(/ /g, "")
          );
          let passed =
            output.stdout.replace(/ /g, "") ==
            testCase.output.replace(/ /g, "");

          //add expected output and inputFront to output obj
          output.expout = testCase.output;
          output.input = testCase.inputFront || "test input not found!";

          // console.log(output)
          // console.log(passed)

          //increament if passed
          if (passed) payload.passedCount++;
          Object.assign(output, { passed: passed });
          payload.tests.push(output);
        })
      );
      // console.log(payload)
      resolve(payload);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export default Router