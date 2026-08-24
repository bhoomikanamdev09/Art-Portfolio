import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export const isEmailConfigured = () =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export async function sendContactMessage({
  from_name,
  from_email,
  enquiry_type,
  idea,
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS configuration is missing. Check your VITE_SERVICE_ID, VITE_TEMPLATE_ID and VITE_PUBLIC_KEY."
    );
  }

  // Explicitly initialize EmailJS.
  emailjs.init({
    publicKey: PUBLIC_KEY,
  });

  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: from_name.trim(),
      from_email: from_email.trim(),
      reply_to: from_email.trim(),
      enquiry_type,
      idea: idea.trim(),
      email_subject: `New Artwork Enquiry — ${enquiry_type}`,
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `EmailJS returned status ${response.status}.`
    );
  }

  return response;
}