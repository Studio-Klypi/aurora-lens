import mjml2html from "mjml";
import type { EmailTemplate } from "../types";

interface EmailVerifiedProps {
  displayName: string;
}

export function emailVerifiedTemplate(props: EmailVerifiedProps): EmailTemplate {
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
              Email verified
            </mj-text>
            <mj-text>
              Hi ${props.displayName},
            </mj-text>
            <mj-text>
              Your email address has been successfully verified. Your account is now fully active and you can start using Aurora Lens.
            </mj-text>
            <mj-text font-size="14px" color="#8c8c8c" line-height="20px">
              If you didn't perform this action, please contact our support team immediately.
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

  const text = `Email verified

Hi ${props.displayName},

Your email address has been successfully verified. Your account is now fully active and you can start using Aurora Lens.

If you didn't perform this action, please contact our support team immediately.

Aurora Lens — Studio Klypi`;

  return { html, text };
}
