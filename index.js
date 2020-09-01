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

  const jobName = core.getInput('job-name');
  // console.log("file data: ", fs.readFileSync(resultFile, 'utf8'));
  fs.writeFileSync('action-output.txt', 'This is from inside the action!');

  fs.writeFileSync(`job-${jobName}.txt`, `:no_entry_sign: *${jobName}* failed`);
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}
