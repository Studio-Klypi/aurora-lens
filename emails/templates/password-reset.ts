import mjml2html from "mjml";
import type { EmailTemplate } from "./types";

interface PasswordResetProps {
  displayName: string;
  resetUrl: string;
}

export function passwordResetTemplate(props: PasswordResetProps): EmailTemplate {
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
              Réinitialisation du mot de passe
            </mj-text>
            <mj-text>
              Bonjour ${props.displayName},
            </mj-text>
            <mj-text>
              Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.
            </mj-text>
            <mj-button background-color="#0f172a" border-radius="6px" font-size="16px" font-weight="600" href="${props.resetUrl}" padding="32px 0">
              Réinitialiser mon mot de passe
            </mj-button>
            <mj-text font-size="14px" color="#8c8c8c" line-height="20px">
              Ce lien expire dans 15 minutes. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
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

  const text = `Réinitialisation du mot de passe

Bonjour ${props.displayName},

Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour en choisir un nouveau :

${props.resetUrl}

Ce lien expire dans 15 minutes. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.

Aurora Lens — Studio Klypi`;

  return { html, text };
}
