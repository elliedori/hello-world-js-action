const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
const fs = require('fs');
// const path = require('path');

try {
  console.log("Updated action");

  const currentPath = process.cwd();
  console.log("Current path is:", currentPath);

  fs.readdir('.', function (err, files) {
    console.log("Files in directory are: ");
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        console.log(file);
    });
  });

  const resultFile = core.getInput('errors');
  console.log("file data: ", fs.readFileSync(resultFile, 'utf8'));
  fs.writeFileSync('action-output.txt', 'This is from inside the action!');
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}
