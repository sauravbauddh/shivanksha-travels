import { NextRequest, NextResponse } from 'next/server';
import { resend, emailConfig } from '@/lib/email/client';
import {
  getContactNotificationTemplate,
  getAutoReplyTemplate,
} from '@/lib/email/templates';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check if email service is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic)
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 100),
      phone: phone?.trim().substring(0, 20),
      message: message.trim().substring(0, 1000),
    };

    // Send notification email to business
    const notificationTemplate = getContactNotificationTemplate(sanitizedData);
    await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: notificationTemplate.subject,
      html: notificationTemplate.html,
    });

    // Send auto-reply to customer
    const autoReplyTemplate = getAutoReplyTemplate(sanitizedData.name);
    await resend.emails.send({
      from: emailConfig.from,
      to: sanitizedData.email,
      subject: autoReplyTemplate.subject,
      html: autoReplyTemplate.html,
    });

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
