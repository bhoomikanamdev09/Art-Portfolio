import { send } from "@emailjs/browser";

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
  if (!isEmailConfigured()) {
    throw new Error("Email service is not configured.");
  }

  return send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name,
      from_email,
      reply_to: from_email,
      enquiry_type,
      idea,
      email_subject: `New Artwork Enquiry — ${enquiry_type}`,
    },
    { publicKey: PUBLIC_KEY },
  );
}
