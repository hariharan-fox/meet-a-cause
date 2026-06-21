import Link from "next/link";

const sections = [
  {
    id: "who-we-are",
    title: "Who We Are",
    content: (
      <>
        <p>
          Meet A Cause is a social experiences platform that connects people with
          meaningful causes and the organisations behind them. Our platform is
          accessible at meetacause.in.
        </p>
        <p>
          We are a technology platform — not an event organiser, not an NGO. We
          build the infrastructure that connects experience seekers with causes
          worth showing up for.
        </p>
        <p>
          For questions about this policy, reach us at:{" "}
          <a href="mailto:hello@meetacause.in">hello@meetacause.in</a>
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <h3>Information you give us directly</h3>
        <ul>
          <li>Name, email address, and phone number when you create an account</li>
          <li>City or neighbourhood to show you relevant events nearby</li>
          <li>Event registrations and attendance history</li>
          <li>Any content you submit — feedback, reviews, or profile details</li>
        </ul>
        <h3>Information we collect automatically</h3>
        <ul>
          <li>Device type, browser, and operating system</li>
          <li>IP address and approximate location</li>
          <li>Pages visited, time spent, and actions taken on the platform</li>
          <li>How you found us (referral source)</li>
        </ul>
        <h3>Information from third parties</h3>
        <ul>
          <li>
            If you sign in with Google, we receive your name, email, and profile
            picture — nothing else
          </li>
          <li>
            If you connect via WhatsApp for notifications, we store only the
            number you provide
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>Show you events that match your interests and location</li>
          <li>Send event confirmations, reminders, and updates</li>
          <li>
            Enable organisations to coordinate with registered participants
          </li>
          <li>Improve the platform through usage analytics</li>
          <li>
            Send platform announcements and new feature updates — you can opt
            out at any time
          </li>
          <li>Comply with legal obligations under Indian law</li>
        </ul>
        <div className="highlight-box">
          <p>
            <strong>We do not</strong> sell your data to advertisers, build
            advertising profiles, or share your information with organisations
            beyond what is needed for event coordination.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "How We Share Your Information",
    content: (
      <>
        <h3>With organisations hosting events</h3>
        <p>
          When you register for an event, the hosting organisation receives your
          name, contact number, and registration status — only what they need to
          coordinate the experience.
        </p>
        <h3>With service providers</h3>
        <p>
          We work with trusted vendors (cloud hosting, email delivery, analytics)
          who process data on our behalf under strict confidentiality terms.
        </p>
        <h3>When required by law</h3>
        <p>
          We will disclose information if required by Indian courts, law
          enforcement, or regulatory authorities.
        </p>
        <div className="highlight-box">
          <p>
            <strong>We never sell your personal data. Ever.</strong>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Storage & Security",
    content: (
      <>
        <ul>
          <li>
            All data is stored on servers within India or in compliance with
            applicable Indian data protection laws
          </li>
          <li>We use HTTPS encryption for all data in transit</li>
          <li>
            Access to personal data is restricted to authorised team members only
          </li>
          <li>Passwords are never stored in plain text</li>
          <li>
            In the event of a data breach, we will notify affected users within
            72 hours of becoming aware
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access —</strong> request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong>Correction —</strong> update inaccurate information via your
            profile settings
          </li>
          <li>
            <strong>Deletion —</strong> request deletion of your account and
            associated data
          </li>
          <li>
            <strong>Opt-out —</strong> unsubscribe from marketing emails at any
            time via the link in any email
          </li>
          <li>
            <strong>Portability —</strong> request your data in a readable
            format
          </li>
        </ul>
        <p>
          To exercise any of these rights, write to us at{" "}
          <a href="mailto:hello@meetacause.in">hello@meetacause.in</a>. We will
          respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>
          We use cookies and similar technologies to keep you logged in,
          remember your preferences, and understand how the platform is used.
          You can disable cookies in your browser settings, though some features
          may not work correctly if you do.
        </p>
        <p>We do not use third-party advertising cookies.</p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Meet A Cause is intended for users aged 16 and above. We do not
          knowingly collect personal data from anyone under 16. If you believe a
          minor has created an account, contact us and we will delete it
          promptly.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          We may update this policy as the platform evolves. We will notify you
          of significant changes via email or an in-app notice at least 14 days
          before they take effect. Continued use of the platform after that date
          constitutes acceptance.
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

export default function PrivacyPage() {
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

        .legal-hero-meta span {
          display: flex;
          align-items: center;
          gap: 6px;
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
            <h1>Privacy Policy</h1>
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
          </div>
        </div>

        <div className="legal-footer-note">
          <p>
            Also read our{" "}
            <Link href="/terms">Terms and Conditions</Link>
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
