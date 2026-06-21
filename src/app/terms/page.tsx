import Link from "next/link";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing or using meetacause.in, you agree to be bound by these
          Terms and Conditions. If you do not agree, please do not use the
          platform.
        </p>
        <p>
          These terms form a legally binding agreement between you and Meet A
          Cause under the laws of India, including the Information Technology
          Act, 2000 and applicable rules thereunder.
        </p>
      </>
    ),
  },
  {
    id: "what-we-are",
    title: "What Meet A Cause Is",
    content: (
      <>
        <p>
          Meet A Cause is a platform that connects individuals with social
          experiences organised by causes, non-profits, and purpose-driven
          organisations.
        </p>
        <div className="highlight-box">
          <p>
            <strong>We are a platform, not an organiser.</strong> We do not
            conduct events ourselves — we facilitate discovery, registration,
            and coordination between experience seekers and the causes behind
            each event.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <p>To use Meet A Cause you must:</p>
        <ul>
          <li>Be at least 16 years of age</li>
          <li>Provide accurate registration information</li>
          <li>
            Have the legal capacity to enter into a binding agreement under
            Indian law
          </li>
        </ul>
        <p>
          If you are registering on behalf of an organisation, you confirm you
          have the authority to bind that organisation to these terms.
        </p>
      </>
    ),
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    content: (
      <>
        <ul>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials
          </li>
          <li>
            You are responsible for all activity that occurs under your account
          </li>
          <li>
            Notify us immediately at{" "}
            <a href="mailto:hello@meetacause.in">hello@meetacause.in</a> if you
            suspect unauthorised access
          </li>
          <li>
            We reserve the right to suspend or terminate accounts that violate
            these terms
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-conduct",
    title: "User Conduct",
    content: (
      <>
        <p>When using Meet A Cause, you agree not to:</p>
        <ul>
          <li>
            Provide false or misleading information in your profile or event
            registrations
          </li>
          <li>
            Register for events you have no intention of attending without
            cancelling in advance
          </li>
          <li>
            Harass, threaten, or harm other users or event organisers
          </li>
          <li>
            Post or share content that is offensive, defamatory,
            discriminatory, or illegal
          </li>
          <li>
            Use the platform to promote personal commercial interests unrelated
            to the event
          </li>
          <li>
            Attempt to access, scrape, or interfere with the platform's systems
            or data
          </li>
          <li>Impersonate another person or organisation</li>
        </ul>
      </>
    ),
  },
  {
    id: "events-registrations",
    title: "Events & Registrations",
    content: (
      <>
        <h3>Accuracy of event information</h3>
        <p>
          Organisations listing events on Meet A Cause are responsible for the
          accuracy of their event details — dates, locations, activities, and
          requirements. We do not independently verify every detail.
        </p>
        <h3>Attendance</h3>
        <p>
          If you register for an event, you commit to attending or cancelling
          with reasonable notice. Repeated no-shows may result in account
          restrictions.
        </p>
        <h3>Changes and cancellations</h3>
        <p>
          Events may be modified or cancelled by the organising cause. Meet A
          Cause is not liable for changes made by organisers. We will do our
          best to notify registered participants promptly.
        </p>
        <h3>Conduct at events</h3>
        <p>
          You are responsible for your own behaviour at events. Meet A Cause is
          not liable for incidents that occur at or during third-party organised
          events.
        </p>
      </>
    ),
  },
  {
    id: "organisations",
    title: "Organisations on the Platform",
    content: (
      <>
        <p>
          Organisations, causes, non-profits, and social enterprises that list
          events agree to:
        </p>
        <ul>
          <li>
            Provide accurate and complete event information
          </li>
          <li>
            Not misrepresent the nature of their activities or their legal
            registration status
          </li>
          <li>Treat participants with dignity and professionalism</li>
          <li>
            Comply with all applicable Indian laws in the conduct of their
            events
          </li>
          <li>
            Not use participant contact details obtained through Meet A Cause
            for any purpose other than coordination of the registered event
          </li>
        </ul>
        <p>
          Meet A Cause reserves the right to remove any organisation or event
          listing that violates these obligations or receives substantiated
          complaints.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          All content on the Meet A Cause platform — including the name, logo,
          interface design, and original written content — is the intellectual
          property of Meet A Cause.
        </p>
        <p>
          You may not reproduce, redistribute, or create derivative works from
          any part of the platform without our prior written consent.
        </p>
        <p>
          Content you submit (profile details, feedback) remains yours. By
          submitting it, you grant us a non-exclusive licence to display it on
          the platform for the purpose of operating our services.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by Indian law:</p>
        <ul>
          <li>
            Meet A Cause is a technology platform and is not liable for the
            actions, omissions, or conduct of any user or event organiser
          </li>
          <li>
            We do not guarantee that events will proceed as described by
            organisers
          </li>
          <li>
            We are not liable for any loss, injury, or damage arising from
            attendance at or participation in any event listed on the platform
          </li>
          <li>
            Our total liability to you for any claim shall not exceed ₹1,000 or
            the amount you have paid us in the preceding 3 months, whichever is
            lower
          </li>
        </ul>
        <p>
          Nothing in these terms limits liability for fraud, death, or personal
          injury caused by our gross negligence.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify and hold harmless Meet A Cause, its directors,
          employees, and partners from any claims, losses, or damages arising
          from your use of the platform, your violation of these terms, or your
          conduct at any event.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links & Services",
    content: (
      <>
        <p>
          The platform may link to external websites or use third-party services
          such as payment gateways, maps, and login providers. We are not
          responsible for the content or practices of those third parties. Their
          own terms and privacy policies apply.
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modifications to the Platform",
    content: (
      <>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of
          the platform at any time, with or without notice. We are not liable to
          you or any third party for such changes.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law & Disputes",
    content: (
      <>
        <p>
          These terms are governed by the laws of India. Any disputes arising
          from these terms or your use of the platform shall be subject to the
          exclusive jurisdiction of the courts of Chennai, Tamil Nadu.
        </p>
        <p>
          For minor disputes, we encourage you to first contact us at{" "}
          <a href="mailto:hello@meetacause.in">hello@meetacause.in</a>. We will
          make a genuine effort to resolve issues informally within 30 days
          before formal proceedings are initiated.
        </p>
      </>
    ),
  },
  {
    id: "severability",
    title: "Severability",
    content: (
      <>
        <p>
          If any provision of these terms is found to be unenforceable, the
          remaining provisions continue in full force and effect.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>
          <strong>Meet A Cause</strong>
          <br />
          Email:{" "}
          <a href="mailto:hello@meetacause.in">hello@meetacause.in</a>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <style>{`
        .legal-page {
          min-height: 100vh;
          background: hsl(220, 14%, 96%);
        }

        .legal-hero {
          background: white;
          border-bottom: 1px solid hsl(220, 13%, 91%);
          padding: 64px 24px 48px;
        }

        .legal-hero-inner {
          max-width: 760px;
          margin: 0 auto;
        }

        .legal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(148, 62%, 40%);
          margin-bottom: 20px;
        }

        .legal-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(148, 62%, 40%);
        }

        .legal-hero h1 {
          font-family: 'Merriweather', Georgia, serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: hsl(222, 20%, 15%);
          line-height: 1.2;
          margin: 0 0 16px;
        }

        .legal-hero-meta {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          font-size: 13px;
          color: hsl(220, 9%, 55%);
        }

        .legal-body {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 48px;
          align-items: start;
        }

        .legal-nav {
          position: sticky;
          top: 80px;
        }

        .legal-nav-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: hsl(220, 9%, 65%);
          margin-bottom: 12px;
        }

        .legal-nav a {
          display: block;
          font-size: 13px;
          color: hsl(220, 9%, 55%);
          text-decoration: none;
          padding: 6px 0 6px 12px;
          border-left: 2px solid hsl(220, 13%, 88%);
          line-height: 1.4;
          transition: color 0.15s, border-color 0.15s;
        }

        .legal-nav a:hover {
          color: hsl(148, 62%, 35%);
          border-left-color: hsl(148, 62%, 40%);
        }

        .legal-content {
          min-width: 0;
        }

        .legal-section {
          padding-bottom: 40px;
          margin-bottom: 40px;
          border-bottom: 1px solid hsl(220, 13%, 91%);
        }

        .legal-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .section-number {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: hsl(148, 62%, 40%);
          margin-bottom: 8px;
          font-family: 'Inter', sans-serif;
        }

        .legal-section h2 {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 20px;
          font-weight: 700;
          color: hsl(222, 20%, 15%);
          margin: 0 0 20px;
          line-height: 1.3;
        }

        .legal-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: hsl(222, 20%, 20%);
          margin: 20px 0 8px;
        }

        .legal-section p {
          font-size: 14px;
          color: hsl(220, 9%, 40%);
          line-height: 1.75;
          margin: 0 0 12px;
        }

        .legal-section p:last-child {
          margin-bottom: 0;
        }

        .legal-section ul {
          margin: 0 0 12px;
          padding-left: 20px;
        }

        .legal-section li {
          font-size: 14px;
          color: hsl(220, 9%, 40%);
          line-height: 1.75;
          margin-bottom: 6px;
        }

        .legal-section a {
          color: hsl(148, 62%, 35%);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .highlight-box {
          background: hsl(148, 62%, 97%);
          border: 1px solid hsl(148, 62%, 85%);
          border-left: 3px solid hsl(148, 62%, 40%);
          border-radius: 0 8px 8px 0;
          padding: 14px 16px;
          margin-top: 16px;
        }

        .highlight-box p {
          color: hsl(148, 40%, 25%) !important;
          margin: 0 !important;
        }

        .legal-footer-note {
          background: white;
          border-top: 1px solid hsl(220, 13%, 91%);
          padding: 24px;
          text-align: center;
        }

        .legal-footer-note p {
          font-size: 13px;
          color: hsl(220, 9%, 55%);
          margin: 0 0 8px;
        }

        .legal-footer-note a {
          color: hsl(148, 62%, 35%);
          font-weight: 500;
          text-decoration: none;
        }

        .terms-agreement {
          background: hsl(220, 14%, 96%);
          border: 1px solid hsl(220, 13%, 88%);
          border-radius: 10px;
          padding: 16px 20px;
          margin-top: 40px;
          font-size: 13px;
          color: hsl(220, 9%, 50%);
          line-height: 1.6;
          text-align: center;
        }

        @media (max-width: 680px) {
          .legal-body {
            grid-template-columns: 1fr;
            padding: 32px 20px 60px;
          }
          .legal-nav {
            display: none;
          }
          .legal-hero {
            padding: 40px 20px 32px;
          }
        }
      `}</style>

      <div className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-inner">
            <div className="legal-eyebrow">
              <span className="legal-eyebrow-dot" />
              Legal
            </div>
            <h1>Terms and Conditions</h1>
            <div className="legal-hero-meta">
              <span>Effective: To be updated upon registration</span>
              <span>·</span>
              <span>Applies to meetacause.in</span>
            </div>
          </div>
        </div>

        <div className="legal-body">
          {/* Sidebar nav */}
          <aside className="legal-nav">
            <div className="legal-nav-label">On this page</div>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </aside>

          {/* Content */}
          <div className="legal-content">
            {sections.map((s, i) => (
              <div key={s.id} id={s.id} className="legal-section">
                <div className="section-number">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2>{s.title}</h2>
                {s.content}
              </div>
            ))}

            <div className="terms-agreement">
              By using Meet A Cause, you acknowledge that you have read,
              understood, and agreed to these Terms and Conditions and our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </div>
          </div>
        </div>

        <div className="legal-footer-note">
          <p>
            Also read our{" "}
            <Link href="/privacy">Privacy Policy</Link>
          </p>
          <p>
            Questions? Write to us at{" "}
            <a href="mailto:hello@meetacause.in">hello@meetacause.in</a>
          </p>
        </div>
      </div>
    </>
  );
}
