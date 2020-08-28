const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');
// const fs = require('fs');

try {
  console.log("This has your new changes!");
  const slackWebhookUrl = core.getInput('slack-webhook-url');

  const userAccountNotification = {
    "username": "Error notifier", // This will appear as user name who posts the message
    "text": "Sample error message", // text
    "icon_emoji": ":bangbang:", // User icon, you can also use custom icons here
    "attachments": [{ // this defines the attachment block, allows for better layout usage
      "color": "#eed140", // color of the attachments sidebar.
      "fields": [ // actual fields
        {
          "title": "Environment", // Custom field
          "value": "Test", // Custom value
          "short": true // long fields will be full width
        },
        {
          "title": "User ID",
          "value": "331",
          "short": true
        }
      ]
    }]
  };

  function sendSlackMessage (webhookURL, messageBody) {
    // make sure the incoming message body can be parsed into valid JSON
    try {
      messageBody = JSON.stringify(messageBody);
    } catch (e) {
      throw new Error('Failed to stringify messageBody', e);
    }
  
    // Promisify the https.request
    return new Promise((resolve, reject) => {
      // general request options, we defined that it's a POST request and content is JSON
      const requestOptions = {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        }
      };
  
      // actual request
      const req = https.request(webhookURL, requestOptions, (res) => {
        let response = '';
  
        res.on('data', (d) => {
          response += d;
        });
        // response finished, resolve the promise with data
        res.on('end', () => {
          resolve(response);
        })
      });
  
      // there was an error, reject the promise
      req.on('error', (e) => {
        reject(e);
      });
  
      // send our message body (was parsed to JSON beforehand)
      req.write(messageBody);
      req.end();
    });
  }
  
  (async function () {
    if (!slackWebhookUrl) {
      console.error('Please fill in your Webhook URL');
    }
  
    console.log('Sending slack message');
    try {
      const slackResponse = await sendSlackMessage(slackWebhookUrl, userAccountNotification);
      console.log('Message response', slackResponse);
    } catch (e) {
      console.error('There was a error with the request', e);
    }
  })();

  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}
