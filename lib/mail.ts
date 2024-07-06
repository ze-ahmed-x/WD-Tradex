'use server'
import nodemailer from "nodemailer"
import Handlebars from "handlebars";
import { activationTemplate } from "./EmailTemplates/activation";
import { resetPassTemplate } from "./EmailTemplates/resetPassword";

export async function sendMail({to, subject, body}: { to:string, subject:string, body:string}) {
    
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    // To check if all the credentials are okay to send email    
    //   try {
    //     const testResult = await transport.verify();
    //     console.log("test result")
    //     console.log(testResult)
    //   } catch (error) {
    //     console.log("varify error: " + error)
    //   }
      try {
        const sendMail = await transport.sendMail({
            from: 'no-reply@tradex.com',
            to: to,
            subject: subject,
            html: body
        })
        // console.log({sendMail})
      } catch (error) {
        // console.log("sendMail Error: " + error)
      }
}


export async function compileActivationTemplate(name: string, url: string) {
    const template = Handlebars.compile(activationTemplate);
    const htmlBody = template({ name: name, url: url});
    return htmlBody;
}

export async function compileResetPassTemplate(name: string, url: string) {
  const template = Handlebars.compile(resetPassTemplate);
  const htmlBody = template({ name: name, url: url });
  return htmlBody;
}

// export const compileActivationTemplate = (name: string, url: string)=> {
// const template = Handlebars.compile(activationTemplate);
// const htmlBody = template({
//     name,
//     url
// });
// return htmlBody
// }

// export async function compileActivationTemplate(name: string, url: string) {
//     try {     
//         const template = Handlebars.compile(activationTemplate);
//         const htmlBody = template({
//           name,
//           url,
//         });
//         return htmlBody;
//     } catch (error) {
//         console.log(error)
//     }
//     return ''
// }  