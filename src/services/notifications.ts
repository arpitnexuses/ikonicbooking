import type { BookingDetails } from '../types';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface WhatsAppData {
  to: string;
  message: string;
}

export async function sendBookingConfirmation(booking: BookingDetails, email: string) {
  const emailData: EmailData = {
    to: email,
    subject: 'Your Ikonic Limousine Booking Confirmation',
    body: generateEmailBody(booking)
  };

  const whatsAppData: WhatsAppData = {
    to: '', // Customer's phone number would be added here
    message: generateWhatsAppMessage(booking)
  };

  try {
    // In a real implementation, these would call your backend API
    await Promise.all([
      sendEmail(emailData),
      sendWhatsApp(whatsAppData)
    ]);
    return true;
  } catch (error) {
    console.error('Failed to send notifications:', error);
    return false;
  }
}

function generateEmailBody(booking: BookingDetails): string {
  const date = new Date(`${booking.date}T${booking.time}`);
  
  return `
Dear Valued Customer,

Thank you for choosing Ikonic Limousine. Your booking has been confirmed!

Booking Reference: IKN-${Date.now().toString(36).toUpperCase()}

Journey Details:
- Date: ${date.toLocaleDateString()}
- Time: ${date.toLocaleTimeString()}
- Service Type: ${booking.type === 'transfer' ? 'Transfer' : 'Hourly Service'}
- Pickup Location: ${booking.pickupLocation.address}
${booking.type === 'transfer' && booking.dropoffLocation ? `- Drop-off Location: ${booking.dropoffLocation.address}` : ''}
${booking.duration ? `- Duration: ${booking.duration} hours` : ''}
- Vehicle: ${booking.vehicle?.name || 'Standard'}
- Total Amount: AED ${booking.price.toFixed(2)}

If you need to modify your booking or have any questions, please contact us:
- Phone: +971 44 498900
- Email: support@ikoniclimousine.com

Thank you for choosing Ikonic Limousine. We look forward to serving you.

Best regards,
The Ikonic Limousine Team
`;
}

function generateWhatsAppMessage(booking: BookingDetails): string {
  const date = new Date(`${booking.date}T${booking.time}`);
  
  return `🚗 *Ikonic Limousine Booking Confirmed*\n\n` +
    `Reference: IKN-${Date.now().toString(36).toUpperCase()}\n\n` +
    `📅 ${date.toLocaleDateString()}\n` +
    `⏰ ${date.toLocaleTimeString()}\n` +
    `📍 From: ${booking.pickupLocation.address}\n` +
    `${booking.type === 'transfer' && booking.dropoffLocation ? `📍 To: ${booking.dropoffLocation.address}\n` : ''}` +
    `🚘 Vehicle: ${booking.vehicle?.name || 'Standard'}\n\n` +
    `💰 Total: AED ${booking.price.toFixed(2)}\n\n` +
    `Need help? Call us: +971 44 498900`;
}

// These functions would be implemented to call your backend API
async function sendEmail(data: EmailData): Promise<void> {
  // Implementation would call your email service API
  console.log('Sending email:', data);
}

async function sendWhatsApp(data: WhatsAppData): Promise<void> {
  // Implementation would call your WhatsApp Business API
  console.log('Sending WhatsApp:', data);
}