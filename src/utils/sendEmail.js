import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";

export async function sendEmail({ to, subject, html, text }) {
  const command = new SendEmailCommand({
    Source: "noreply@ismailoday.dev",
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
        Text: {
          Data: text || "",
          Charset: "UTF-8",
        },
      },
    },
  });

  return await sesClient.send(command);
}