export default function handler(request, response) {

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
      console.log(client);




      client.sendEmail({
        "Tag": "SubmissionResponse",
        "From": "Noble Labs <hello@noblelabsms.com>",
        "To": `${formName} <${formEmail}>`,
        "Subject": "Thanks for your email!",
        "TextBody": `We have received your email and one of our associates will be in touch soon!\n
        Here's what you sent:\n
        \n
        Subject: ${formSubject}\n
        \n
        Message: ${formMessage}`,
        "MessageStream": "outbound"
      }).then(response => {
        console.log(response.To);
        console.log(response.SubmittedAt);
        console.log(response.Message);
        console.log(response.MessageID);
        console.log(response.ErrorCode);
    });

      client.sendEmail({
        "Tag": "FormSubmission",
        "From": "Noble Labs Website <hello@noblelabsms.com>",
        "ReplyTo": `${formName} <${formEmail}>`,
        "Bcc": 'ryan@forkhunger.art',
        "To": `hello@noblelabsms.com`,
        "Subject": `${formSubject} [Website Contact Form]`,
        "TextBody": `The following message was submitted\n
                      \n
                      Subject: ${formSubject}\n
                      \n
                      Message: ${formMessage}`,
        "MessageStream": "outbound"
        
      }).then(response => {
        console.log(response.To);
        console.log(response.SubmittedAt);
        console.log(response.Message);
        console.log(response.MessageID);
        console.log(response.ErrorCode);
    });

      return response.status(200).json({ success: 'Sent' });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error });
    }

  }
  return response.end(`Hello ${name}!`);
}