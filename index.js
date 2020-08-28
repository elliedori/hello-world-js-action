const core = require('@actions/core');
const github = require('@actions/github');
const { IncomingWebhook } = require('@slack/webhook');
const fs = require('fs');

try {
  const slackWebhookUrl = core.getInput('slack-webhook-url');
  const webhook = new IncomingWebhook(slackWebhookUrl)
  const nameToGreet = core.getInput('who-to-greet');
  (async () => {
    await webhook.send({
      text: 'Message from custom action',
    });
  })();
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (err) {
  core.setFailed(err.message);
}


// curl -X POST -H 'Content-type: application/json' --data '{"blocks":[{"type":"header","text":{"type":"plain_text","text":"CI build failed for commit '"${COMMIT_SHA:0:9}"' on '${GITHUB_REF#refs/heads/}'"}},{"type":"section","text":{"type":"mrkdwn","text":"— _Author: '"$COMMIT_OWNER"' '"$OWNER_LINK"' _ <https://github.com/'"$GITHUB_REPOSITORY"'/actions/runs/'"$GITHUB_RUN_ID"'|View build>"}}, {"type":"section","text":{"type":"mrkdwn","text":"\n '"$results"'"}}]}' "$SLACK_WEBHOOK_URL"