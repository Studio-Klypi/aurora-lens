import mjml2html from "mjml";
import type { EmailTemplate } from "../types";

interface EmailVerificationProps {
  displayName: string;
  verificationUrl: string;
}

export function emailVerificationTemplate(props: EmailVerificationProps): EmailTemplate {
  const { html } = mjml2html(`
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" />
          <mj-text font-size="16px" color="#4a4a4a" line-height="24px" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#f6f9fc">
        <mj-section padding="40px 0">
          <mj-column background-color="#ffffff" border-radius="8px" padding="40px">
            <mj-text font-size="24px" font-weight="600" color="#1a1a1a" padding-bottom="24px">
              Welcome to Aurora Lens
            </mj-text>
            <mj-text>
              Hi ${props.displayName},
            </mj-text>
            <mj-text>
              Thank you for signing up. Please click the button below to verify your email address.
            </mj-text>
            <mj-button background-color="#0f172a" border-radius="6px" font-size="16px" font-weight="600" href="${props.verificationUrl}" padding="32px 0">
              Verify my email
            </mj-button>
            <mj-text font-size="14px" color="#8c8c8c" line-height="20px">
              Please open this link in the same browser you used to sign up, so your session remains active. This link expires in 15 minutes. If you didn't create an account, you can safely ignore this email.
            </mj-text>
            <mj-divider border-color="#e6e6e6" padding="24px 0" />
            <mj-text font-size="12px" color="#b4b4b4" line-height="16px">
              Aurora Lens — Studio Klypi
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `);

  const text = `Welcome to Aurora Lens

Hi ${props.displayName},

Thank you for signing up. Please click the link below to verify your email address:

${props.verificationUrl}

Please open this link in the same browser you used to sign up, so your session remains active. This link expires in 15 minutes. If you didn't create an account, you can safely ignore this email.

Aurora Lens — Studio Klypi`;

  return { html, text };
}
