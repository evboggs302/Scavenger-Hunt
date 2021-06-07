# Scavenger Hunt

For those who have ever created a scavenger hunt, they know how time consuming it can be not only think up the clues, but to also sort out the logistics of the entire hunt. This app aims to lighten the logisitcal burden of planning their next hunt.

## _AVAILABLE SCRIPTS_

- `npm start` <br />
  _Runs the app in the development mode and opens browser to [http://localhost:3000](http://localhost:3000).
  The page will reload with edits. You will also see any lint errors in the console._

- `npm run serve` // `nodemon`<br/>
  _Launches the server file._
- `npm test`<br/>
  _Starts the test suit; runs all test in the `__tests__` directory._

## _NGROK & POSTMAN_

- Ngrok is a tool used to expose your local node server to the outside world, namely for Twilio webhooks and Postman testing.
- install ngrok from their website (free version works fine)
- open a terminal, in the root dir run the below command.

```bash
./ngrok http 22306
```

- copy the provided url `http://<some_random_string>.ngrok.io/`
- paste that into 2 places:
  - the SMS webhook field on the Twilio dashboard for your selected phone number
  - saved to a variable in your PostMan environment

## _CARBON DESIGN SYSTEM_

- created by IBM
- React component library used instead of creating components and styles from scratch.

## _.ENV example content_

```txt
ACCT_SID=< provided by Twilio >
AUTH_TOKEN=< provided by Twilio >
TWILIO_NUMBER=< provided by Twilio >
MONGO_CONNECTION=< provided by MongoDB >
SESSION_SECRET=< randomly button smash a long value >
SASS_PATH="node_modules"
```
