import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
import htmlContent from '../data/verificationMailTemplate.js';

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default async function sendVerificationEmail(toEmail, userName, token, userId) {
  const verificationLink = `${process.env.FRONTEND_URL}/signup/verify-email?token=${token}&userId=${userId}`;

  const sendSmtpEmail = {
    sender: { email: 'samifatima975@gmail.com', name: 'CollabNest' },
    to: [{ email: toEmail, name: userName }],
    subject: 'Verify Your Email - CollabNest',
    htmlContent: htmlContent(verificationLink, userName)
  };

  try {
  const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log('Verification email sent! Message ID:', data.body?.messageId || 'No ID returned');
  return true;
 } catch (error) {
  console.error(
    'Error sending verification email:',
    error.response?.body?.message || error.message || error
  );
  return false;
}
}
