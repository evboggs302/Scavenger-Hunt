# Scavenger Hunt [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/KaPY5DRacCDokmFK4eGLRe/TaQGeiEsqhUYuNcoDGRjDZ/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/KaPY5DRacCDokmFK4eGLRe/TaQGeiEsqhUYuNcoDGRjDZ/tree/master)

This repo will eventually hold a scavenger hunt app that will utilize the Twilio texting service.

---

**_🚧 🚧 WARNING 🚧 🚧_**

I'm currently transitioning the server from Express/Rest -> AolloGraphql... this will be a tad messy until I'm finished 😬

_The following may or may not be accurate at the time of you reading this._

**_🚧 🚧 WARNING 🚧 🚧_**

---

### Storybook

https://digital-scavenger-storybook.onrender.com

### Available Scripts

- `yarn start` Runs the app in the development mode.<br />
  _Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  The page will reload with edits. You will also see any lint errors in the console._

- `yarn run serve` // `nodemon` Launches the server file.
- `yarn test` starts the test suit; runs all test in the `__tests__` directory

### NGROK & POSTMAN

- Ngrok is a tool used to expose your local node server to the outside world, namely for Twilio webhooks and Postman testing.
- install ngrok from their website (free version works fine)
- open a terminal, in the root dir run the below command.

```bash
./ngrok http 22306
```

- copy the provided url `http://<some_random_string>.ngrok.io/`
- paste that into 2 places:
  - the webhook field on the Twilio dashboard for your selected phone number
  - saved to a variable in your PostMan environment

### .ENV example content

```txt
ACCT_SID=< provided by Twilio >
AUTH_TOKEN=< provided by Twilio >
TWILIO_NUMBER=< provided by Twilio >

MONGO_URI=< provided by MongoDB >

SESSION_SECRET=< randomly button smash a long value >
PORT=< 5 digit number >
SASS_PATH="node_modules"

JWT_SECRET=< randomly button smash a long value >
ACCESS_TOKEN_SECRET=< randomly button smash a long value >
ACCESS_TOKEN_DURATION=1d
REFRESH_TOKEN_SECRET=< randomly button smash a long value >
REFRESH_TOKEN_DURATION=14d
```
