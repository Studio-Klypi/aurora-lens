import mjml2html from "mjml";
import type { EmailTemplate } from "../types";

interface PasswordResetConfirmedProps {
  displayName: string;
}

export function passwordResetConfirmedTemplate(props: PasswordResetConfirmedProps): EmailTemplate {
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
              Password successfully reset
            </mj-text>
            <mj-text>
              Hi ${props.displayName},
            </mj-text>
            <mj-text>
              Your password has been successfully changed. For security reasons, all your active sessions have been disconnected. Please log in again with your new password.
            </mj-text>
            <mj-text font-size="14px" color="#8c8c8c" line-height="20px">
              If you didn't perform this action, please contact our support team immediately as your account may have been compromised.
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

  const text = `Password successfully reset

Hi ${props.displayName},

Your password has been successfully changed. For security reasons, all your active sessions have been disconnected. Please log in again with your new password.

If you didn't perform this action, please contact our support team immediately as your account may have been compromised.

Aurora Lens — Studio Klypi`;

  return { html, text };
}
