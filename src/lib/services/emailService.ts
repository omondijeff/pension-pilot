import type { EmailTemplate, EmailResponse } from '../types/email.types';

const logger = {
  info: (message: string, data?: any) => {
    console.log(`[Email Service] INFO: ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[Email Service] ERROR: ${message}`, error || '');
  }
};

// Mail service URL based on environment
const MAIL_SERVICE_URL = import.meta.env.PROD 
  ? 'https://mail.pension-pilot.co.uk' 
  : 'http://localhost:3000';

export class EmailService {
  private static async sendEmail(template: EmailTemplate): Promise<EmailResponse> {
    logger.info('Sending email', { 
      to: template.to, 
      subject: template.subject,
      service: MAIL_SERVICE_URL
    });

    try {
      const response = await fetch(`${MAIL_SERVICE_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: template.to,
          subject: template.subject,
          body: template.body,
          replyTo: 'support@pension-pilot.co.uk'
        })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        logger.error('Failed to send email', { 
          status: response.status, 
          error: data.error 
        });
        throw new Error(data.error || 'Failed to send email');
      }

      logger.info('Email sent successfully', { 
        to: template.to,
        subject: template.subject,
        messageId: data.messageId
      });
      
      return { message: 'Email sent successfully' };
    } catch (error) {
      logger.error('Failed to send email', error);
      throw error;
    }
  }

  static async sendKycUpdateConfirmation(userEmail: string, userName: string): Promise<EmailResponse> {
    if (!userEmail || !userName) {
      logger.error('Missing required data for KYC update confirmation');
      throw new Error('Email address and user name are required');
    }

    logger.info('Preparing KYC update confirmation email', { userEmail });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: 'Your KYC Profile Has Been Updated',
      body: `Hi ${userName},

We wanted to let you know that your Know Your Customer (KYC) profile has been successfully updated in our system. 

Here's what you can expect next:

1. Our compliance team will carefully review the information you provided to ensure it meets all necessary requirements, as you proceed adding your pension information. 
2. Once the review is complete, you'll receive a confirmation email letting you know that your KYC verification is finalized.
3. You can always check your current information by logging into your Pension Pilot dashboard.

If you notice any inaccuracies in the information you submitted, please update your profile right away to avoid any delays in the verification process.

Should you have any questions or need assistance, our support team is here to help. Just reply to this email or reach out to us at info@pension-pilot.co.uk.

Best regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }

  static async sendPasswordResetEmail(userEmail: string, resetToken: string, userName: string): Promise<EmailResponse> {
    logger.info('Preparing password reset email', { userEmail });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: `${userName}, Here's the Link to Reset Your Pension Pilot Password`,
      body: `Hi ${userName},

We received a request to reset the password for your Pension Pilot account. To create a new password, just click the link below:

${window.location.origin}/reset-password?token=${resetToken}

For security reasons, this password reset link will expire in 1 hour. If you don't reset your password within that timeframe, you'll need to submit a new request.

If you didn't ask to reset your password, you can safely ignore this email. Your account is still secure and no one can change your password without access to this email.

As always, if you have any questions or need help, our support team is ready to assist you. Just reply to this email or contact us at support@pension-pilot.co.uk.

Best regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }

  static async sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResponse> {
    logger.info('Preparing welcome email', { userEmail, userName });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: `Welcome to Pension Pilot, ${userName}!`,
      body: `Hi ${userName},

Welcome aboard! We're thrilled to have you as part of the Pension Pilot community.

To make the most of your Pension Pilot experience, here are a few quick steps to get you started:

1. Complete your profile: Add in your personal details so we can better serve you.
2. Submit your Pension Information documents: Our secure verification process helps protect your account.
3. Start managing your pension: You can now easily manage your pension submissions and keep track of your pension journey. 

We're here to help you every step of the way. If you have any questions, face any issues, or just want to chat about your pension strategy, our friendly support team is always ready to assist. 

You can reach us anytime by replying to this email or contacting us directly at info@pension-pilot.co.uk. We look forward to helping you pilot your pension to a successful future!

Warm regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }

  static async sendSubmissionReceivedEmail(userEmail: string, userName: string): Promise<EmailResponse> {
    logger.info('Preparing submission received email', { userEmail, userName });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: 'Thank You for Adding Your Pension Information',
      body: `Dear ${userName},

Thank you for providing your pension details. We're thrilled to have you on board with Pension Pilot!

We've begun the process of consolidating your pension, and while this typically takes up to 12 weeks, it's possible we'll complete it sooner. Rest assured, we're committed to keeping you informed every step of the way.

If we require any additional information or documents from you, we'll reach out promptly. In the meantime, if you have any questions or would like an update, feel free to contact us at info@pension-pilot.co.uk or 0800 123 4567.

Thank you for trusting us with your pension journey. We look forward to helping you simplify your retirement planning.

Warm regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }

  static async sendSubmissionUpdatedEmail(userEmail: string, userName: string): Promise<EmailResponse> {
    logger.info('Preparing submission updated email', { userEmail, userName });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: 'Your Pension Submission Has Been Updated',
      body: `Hi ${userName},

We wanted to let you know that your pension submission has been successfully updated in our system.

Our team is currently reviewing the updated information to ensure everything is in order. If we need any clarification or additional details, we'll reach out to you directly.

You can always check the status of your submission by logging into your Pension Pilot dashboard. If you have any questions in the meantime, feel free to reply to this email or contact our support team at support@pension-pilot.co.uk.

Best regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }

  static async sendSubmissionCompletedEmail(userEmail: string, userName: string): Promise<EmailResponse> {
    logger.info('Preparing submission completed email', { userEmail, userName });
    
    const template: EmailTemplate = {
      to: userEmail,
      subject: 'Your Pension Consolidation is Complete!',
      body: `Congratulations ${userName}!

We're pleased to inform you that the consolidation of your pension has been successfully completed.

Your pension is now streamlined and easier to manage. You can view the details of your consolidated pension by logging into your Pension Pilot dashboard.

From here, you can continue to track your pension growth, make additional contributions, and explore your retirement planning options. Remember, our support team is always here to assist you with any questions or guidance you may need.

Thank you for choosing Pension Pilot to simplify your pension journey. We're committed to helping you achieve your retirement goals.

Warm regards,
The Pension Pilot Team`
    };

    return this.sendEmail(template);
  }
}