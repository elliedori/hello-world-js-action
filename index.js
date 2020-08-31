const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');
// const path = require('path');

try {
  console.log("Updated action");

  const currentPath = process.cwd();
  console.log("Current path is:", currentPath);

  const resultFile = core.getInput('errors');
  console.log("file data: ", fs.readFileSync(resultFile));

  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}
