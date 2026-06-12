interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
}

const projects: Project[] = [
  {
    title: 'Project One',
    description:
      'A short description of what this project does and why it matters. Replace with your real projects.',
    tags: ['TypeScript', 'React', 'Node.js'],
    href: '#',
    repo: '#',
  },
  {
    title: 'Project Two',
    description:
      'Another project description. Highlight the problem it solves and the interesting technical decisions.',
    tags: ['Python', 'Docker', 'PostgreSQL'],
    repo: '#',
  },
  {
    title: 'Project Three',
    description:
      'A third project. Keep descriptions concise — one or two sentences is enough.',
    tags: ['Go', 'gRPC', 'Redis'],
    href: '#',
    repo: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <div className="card-header">
                <h3>{project.title}</h3>
                <div className="links">
                  {project.repo && (
                    <a href={project.repo} aria-label="Repository">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                  )}
                  {project.href && (
                    <a href={project.href} aria-label="Live site">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <p className="description">{project.description}</p>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        #projects {
          background: var(--color-bg);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .card:hover {
          border-color: var(--color-accent);
          transform: translateY(-3px);
        }
        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        h3 {
          font-size: 1.1rem;
          color: var(--color-text);
        }
        .links {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .links a {
          color: var(--color-text-muted);
          display: flex;
          transition: color 0.2s;
        }
        .links a:hover {
          color: var(--color-text);
        }
        .description {
          font-size: 0.9rem;
          flex: 1;
        }
        .tags {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tags li {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-accent-light);
          background: rgba(124, 58, 237, 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 0.25rem;
        }
      `}</style>
    </section>
  );
}
