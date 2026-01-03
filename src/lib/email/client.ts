import { Resend } from 'resend';

// Initialize Resend client (will be undefined if API key is missing)
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const emailConfig = {
  from: process.env.CONTACT_EMAIL_FROM || 'noreply@shivankshatravels.in',
  to: process.env.CONTACT_EMAIL_TO || 'info@shivankshatravels.in',
};
