import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

let testAccount: any = null;

// Logger setup
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[Email API] INFO: ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[Email API] ERROR: ${message}`, error || '');
  }
};

const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5174' 
    : 'https://pension-pilot.co.uk',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
}

async function getTransporter() {
  // Check if we're in production by looking for SMTP credentials
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    logger.info('Using production SMTP configuration');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Development mode using Ethereal
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();
    logger.info('Created test email account', {
      user: testAccount.user,
      pass: testAccount.pass
    });
  }

  logger.info('Using development SMTP configuration (Ethereal)');
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    res.setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405)
      .setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
      .json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, body } = req.body

    logger.info('Attempting to send email', { 
      to, 
      subject,
      isDevelopment: !process.env.SMTP_HOST 
    });

    const transporter = await getTransporter();
    const fromEmail = process.env.SMTP_FROM_EMAIL || '"Pension Pilot" <noreply@pension-pilot.co.uk>';

    // Send mail
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      text: body,
    })

    // If we're in development, include the preview URL
    const response: any = { message: 'Email sent successfully' };
    
    if (!process.env.SMTP_HOST) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      logger.info('Development email preview', { previewUrl });
      response.previewUrl = previewUrl;
    }

    logger.info('Email sent successfully', { 
      to,
      messageId: info.messageId,
      isDevelopment: !process.env.SMTP_HOST
    });

    // Add CORS headers to response
    return res.status(200)
      .setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
      .setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods'])
      .setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers'])
      .json(response);
  } catch (error) {
    logger.error('Failed to send email', error);
    return res.status(500)
      .setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin'])
      .setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods'])
      .setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers'])
      .json({ 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      })
  }
}