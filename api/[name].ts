export default function handler(request, response) {
  // api/[name].ts -> /api/lee
  // req.query.name -> "lee"
  const { name } = request.query;
  if(name==="contactform"){
    try {
      request.body;
    
    const {formName, formEmail, formSubject, formMessage} = request.body;

    // Require:
      var postmark = require("postmark");

      // Send an email:
      var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
      console.log(client);
      console.log(process.env.POSTMARK_API_KEY);

      client.sendEmail({
        "Tag": "Website Contact Auto-Response",
        "From": "Noble Labs <hello@noblelabsms.com>",
        "To": `${formName} <${formEmail}>`,
        "Subject": "Thanks for your email!",
        "TextBody": `We have received your email and one of our associates will be in touch soon!\n
        Here's what you sent:\n
        \n
        Subject: ${formSubject}\n
        \n
        Message: ${formMessage}`
      }).catch((e)=>{
        console.log(e);
        return response.status(400).json({ error: JSON.stringify(e) });
      });

      client.sendEmail({
        "Tag": "Website Contact",
        "From": "Noble Labs Website <hello@noblelabsms.com>",
        "ReplyTo": `${formName} <${formEmail}>`,
        "Bcc": 'ryan@forkhunger.art',
        "To": `hello@noblelabsms.com`,
        "Subject": `${formSubject} [Website Contact Form]`,
        "TextBody": `The following message was submitted\n
                      \n
                      Subject: ${formSubject}\n
                      \n
                      Message: ${formMessage}`
        
      }).catch((e)=>{
        console.log(e);
        return response.status(400).json({ error: JSON.stringify(e) });
      });
      return response.status(200).json({ success: 'Sent' });
    } catch (error) {
      return response.status(400).json({ error: 'My custom 400 error' });
    }

  }
  return response.end(`Hello ${name}!`);
}