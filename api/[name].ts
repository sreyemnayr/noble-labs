export default async function handler(request, response) {

  var postmark = require("postmark");

  const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || "";

  // api/[name].ts -> /api/lee
  // req.query.name -> "lee"
  const { name } = request.query;
  if(name==="contactform"){
    try {
      request.body;
    
    const {formName, formEmail, formSubject, formMessage} = request.body;

    // Require:
      
      // Send an email:
      let client = new postmark.ServerClient(POSTMARK_API_KEY);


      let email_one = {
        "Tag": "SubmissionResponse",
        "From": "Noble Labs <jeff@noblelabsms.com>",
        //"ReplyTo": `hello@noblelabsms.com`,
        "ReplyTo": `jeff@noblelabsms.com`,
        "To": `${formName} <${formEmail}>`,
        "Subject": "Thanks for your email!",
        "TextBody": `We have received your email and one of our associates will be in touch soon!\nHere's what you sent:\n\nSubject: ${formSubject}\n\nMessage: ${formMessage}`,
        "MessageStream": "outbound"
      }

      console.log(email_one);

      var sent = await client.sendEmail(email_one);
      /*
        .then(response => {
        console.log(response.To);
        console.log(response.SubmittedAt);
        console.log(response.Message);
        console.log(response.MessageID);
        console.log(response.ErrorCode);
    })
      */
    console.log(sent);
    if(sent?.ErrorCode > 0){
      return response.status(400).json({ error: sent });
    }

      var sent2 = await client.sendEmail({
        "Tag": "FormSubmission",
        "From": "Noble Labs Website <jeff@noblelabsms.com>",
        "ReplyTo": `${formName} <${formEmail}>`,
        //"Bcc": 'ryan@forkhunger.art',
        //"To": `hello@noblelabsms.com`,
        "To": `jeff@noblelabsms.com`,
        "Subject": `${formSubject} [Website Contact Form]`,
        "TextBody": `The following message was submitted\n\nSubject: ${formSubject}\n\nMessage: ${formMessage}`,
        "MessageStream": "outbound"
      });

      console.log(sent2);
      if(sent2?.ErrorCode > 0){
        return response.status(400).json({ error: sent2 });
      }

      return response.status(200).json({ success: 'Sent' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error });
    }

  }
  return response.end(`Hello ${name}!`);
}