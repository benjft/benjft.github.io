export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <p className="greeting">Hi, I'm</p>
        <h1>benjft</h1>
        <p className="tagline">Software Engineer</p>
        <p className="intro">
          I build things for the web — focused on clean code, great UX, and
          systems that scale.
        </p>
        <div className="actions">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>
      <style>{`
        #hero {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: 4rem;
        }
        .greeting {
          font-family: var(--font-mono);
          color: var(--color-accent-light);
          font-size: 1rem;
          margin-bottom: 0.75rem;
          max-width: none;
        }
        h1 {
          font-size: clamp(2.5rem, 8vw, 5rem);
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .tagline {
          font-size: clamp(1.25rem, 3vw, 2rem);
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
          max-width: none;
        }
        .intro {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
        }
        .actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-primary, .btn-secondary {
          padding: 0.75rem 1.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 0.95rem;
          transition: opacity 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .btn-primary:hover, .btn-secondary:hover {
          opacity: 0.85;
          transform: translateY(-1px);
          text-decoration: none;
        }
        .btn-primary {
          background: var(--color-accent);
          color: #fff;
        }
        .btn-secondary {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border);
        }
      `}</style>
    </section>
  );
}
