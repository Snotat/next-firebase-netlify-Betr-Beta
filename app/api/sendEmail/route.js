import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

//Use mailpit
// const transporter = nodemailer.createTransport({
//   port: 1025,
// });

// const welcomeEmail = (clientName, username) => `<p>Welcome ${clientName}, your username is ${username}.</p>`
// const htmlOutput = welcomeEmail('Jane', 'Smith')

export async function POST(request) {
  const {email} = await request.json();

  if (email) {
    try {
      await sendTestTrackableEmail("", email);
      return Response.json({message: "Success!"});
    } catch (error) {
      console.log("Error", error);
      return Response.json({error: "Invalid log level"});
    }
  }
}

async function sendTestTrackableEmail(testText, email) {
  console.log(email);

  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject: "Test mail",
    html: `<div
      style="
        font-family: Arial, sans-serif;
        font-size: large;
        max-width: 400px;
        margin: 0 auto;
        padding: 60px;
        border: 1px solid #e0e0e0;
        background-color: #ffffff;
      "
    >
      <div style="text-align: center; margin-bottom: 30px">
       <img  src="https://assets.vercel.com/image/upload/v1573246280/front/favicon/vercel/android-chrome-192x192.png" alt="vercel-3" crossorigin="anonymous" width='108' height='83' />
        <h2>Verify your email to log on to Vercel</h2>
      </div>

      <p>Hello,</p>
      <p>We have received a login attempt from Singapore</p>
      <p>To complete the login process, please click the button below:</p>
      <a
        href="www.google.com"
        style="
          display: block;
          width: 100px;
          padding: 15px 40px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 40px;
          margin-bottom: 40px;
          background-color: #000000;
          color: #ffffff;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
        "
        >VERIFY</a
      >
      <p>Or copy and paste this URL into a new tab of your browser:</p>
      <div style="width: auto; margin-bottom: 60px">
        <a href="www.google.com" style="word-wrap: break-word">
          https://vercel.com/confirm?email=nsemek%40gmail.com&token=3geBc7LFLhLAwVwWWCRRr2M&mode=login
        </a>
      </div>
      <hr />
      <p style="margin-top: 30px">
        If you didn't attempt to log in but received this email, or if the location doesn't match, please ignore this email. If you are concerned
        about your account's safety, please reply to this email to get in touch with us.
      </p>
    </div>`,
  });

  return;
}
