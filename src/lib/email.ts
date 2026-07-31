import { resend } from '@/lib/resend';

export async function sendOrderConfirmation(userEmail: string, orderDetails: any) {
  try {
    const data = await resend.emails.send({
      from: 'Joerich Phones <onboarding@resend.dev>', // Use your verified domain later
      to: 'kelvinkwasigyan@gmail.com', // Replace with userEmail in production
      subject: 'Order Confirmation - Joerich Phones',
      html: `
        <div>
          <h1>Thank you for your order!</h1>
          <p>We have received your order and it is being processed.</p>
          <h3>Order Summary</h3>
          <p>Total: GHS ${orderDetails.total}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Resend Error:", error);
    return { success: false, error };
  }
}

// 1. Send Account Confirmation / Welcome Email
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    const data = await resend.emails.send({
      from: 'Joerich Phones <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Welcome to Joerich Phones - Confirm Your Account',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Hello ${userName},</h2>
          <p>Thank you for creating an account with Joerich Phones. We are thrilled to have you!</p>
          <p>Explore our latest collection of premium devices and accessories right from Koforidua.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

// 2. Send Password Reset Email
export async function sendPasswordResetEmail(userEmail: string, resetLink: string) {
  try {
    const data = await resend.emails.send({
      from: 'Joerich Phones <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Reset Your Password - Joerich Phones',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <a href="${resetLink}" style="background-color: #111827; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">Reset Password</a>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
