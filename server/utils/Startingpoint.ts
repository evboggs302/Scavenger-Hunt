import twilio from "twilio";

const { TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN } = process.env;
export const client = twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);

const messageBody = `
  Hello all!
  
  We are looking forward to celebrating with you!
  However, due to local COVID restrictions at our venue, our 
  venue will be closed on originally scheduled date of May 8th.
  
  We have rescheudled our wedding celebration to JULY 31, 2020
  at 4:30pm, at the same venue.
  
  Please reach out to Nicki and/or myself if you have any questions
  or need to change your RSVP response.

  Best,
  Evan Boggs
`;

const guestList = [
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
  "123-123-4567",
];

const sendSMS = async () => {
  await Promise.all(
    guestList.map((guestNumber) =>
      client.messages.create({
        body: messageBody,
        from: `1-222-333-1234`,
        to: guestNumber,
      })
    )
  );
};

sendSMS();
