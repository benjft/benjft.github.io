export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <p className="greeting">Hi, I'm</p>
        <h1>Benjft</h1>
        <p className="tagline">Software Engineer</p>
        <p className="intro">
          I work mostly in .Net, React, and Sql Server, though my personal projects are eclectic.
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
    </section>
  );
}
