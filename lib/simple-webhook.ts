// Simple webhook utility for sending name and email to Make.com

const WEBHOOK_URL = 'https://hook.eu2.make.com/ghdk1p8eqseejtkt2fynaoe0d2vj6v1l';

interface ChallengeSignupData {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Send challenge signup data (name + email) to Make.com webhook
 */
export async function sendChallengeSignup(data: ChallengeSignupData): Promise<void> {
  try {
    console.log('📤 Sending challenge signup to webhook:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    });

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        fullName: `${data.firstName} ${data.lastName}`,
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      console.log('✅ Challenge signup sent successfully');
    } else {
      console.error('❌ Webhook responded with error:', response.status);
    }
  } catch (error) {
    console.error('❌ Failed to send challenge signup to webhook:', error);
    // Don't throw - allow page to continue even if webhook fails
  }
}
