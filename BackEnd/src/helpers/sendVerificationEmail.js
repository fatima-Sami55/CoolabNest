import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
import htmlContent from '../data/verificationMailTemplate.js';

dotenv.config();

// Initialize Brevo API
let apiInstance;
try {
  apiInstance = new brevo.TransactionalEmailsApi();
  
  // Check if API key exists
  if (!process.env.BREVO_API_KEY) {
    throw new Error('BREVO_API_KEY is not set in environment variables');
  }
  
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );
  
  console.log('✅ Brevo API initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Brevo API:', error.message);
}

export default async function sendVerificationEmail(toEmail, userName, token, userId) {
  try {
    // Check if Brevo API is initialized
    if (!apiInstance) {
      throw new Error('Brevo API is not properly initialized');
    }
    
    // Point to backend verification endpoint
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
    const verificationLink = `${backendUrl}/signup/verify-email?token=${token}&userId=${userId}`;
    
    console.log('=== EMAIL SENDING DEBUG ===');
    console.log('To Email:', toEmail);
    console.log('User Name:', userName);
    console.log('Verification Link:', verificationLink);
    console.log('Brevo API Key:', process.env.BREVO_API_KEY ? `Set (${process.env.BREVO_API_KEY.substring(0, 10)}...)` : 'Not Set');
    console.log('============================');

    const sendSmtpEmail = {
      sender: { email: 'amaan.ind.khi@gmail.com', name: 'CollabNest' },
      to: [{ email: toEmail, name: userName }],
      subject: 'Verify Your Email - CollabNest',
      htmlContent: htmlContent(verificationLink, userName)
    };

    console.log('Sending email with config:', JSON.stringify({
      ...sendSmtpEmail,
      htmlContent: '[HTML Content Hidden]' // Don't log the full HTML
    }, null, 2));
    
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Verification email sent successfully!');
    console.log('Response:', data);
    return true;
    
  } catch (error) {
    console.error('❌ Error sending verification email:');
    console.error('Error details:', {
      message: error.message,
      response: error.response?.body,
      statusCode: error.response?.statusCode,
      name: error.name,
      stack: error.stack
    });
    return false;
  }
}
