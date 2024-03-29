// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome (agent) {
    agent.add(` 3...2...1.. Ground Control to Major Tom!`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
 function majorTom(agent) {
  agent.add(`You want to know about Major Tom?`);
   agent.add(new Card({
      title: `About Major Tom`,
      imageUrl: 'https://cdn10.bigcommerce.com/s-kfeqy/products/3418/images/12743/BLA1266-Space-Odity__03290.1468014622.1280.1280.jpg',
      text: `Major Tom is a fictional astronaut referenced in David Bowie's songs "Space Oddity", "Ashes to Ashes", "Hallo Spaceboy", "New Killer Star" and "Blackstar". Bowie's own interpretation of the character evolved throughout his career 👨‍🚀`,
       buttonText: 'Blast off!',
      buttonUrl: 'https://www.youtube.com/watch?v=iYYRH4apXDo'
    })
  );
   agent.add(new Suggestion(`Quick Reply`));
  agent.add(new Suggestion(`Suggestion`));
  agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
 }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
function googleAssistantHandler(agent) {
   let conv = agent.conv(); // Get Actions on Google library conv instance
  conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
   agent.add(conv); // Add Actions on Google library responses to your agent's response
 }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('About Major Tom', majorTom);
  // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
