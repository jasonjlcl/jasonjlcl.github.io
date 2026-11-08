'use strict';
const projectDetails = {
  routes: {
    title: 'SG Route Optimization', category: 'FULL-STACK / OPTIMIZATION',
    intro: 'A local full-stack logistics planning system for turning delivery requirements into workable routes.',
    sections: [
      ['THE CHALLENGE', 'Connect the steps of route planning—uploading delivery data, checking it, finding locations, optimizing routes, and producing useful driver artifacts—in one workflow.'],
      ['THE BUILD', 'React and TypeScript provide the planning interface. FastAPI coordinates validation, geocoding, OR-Tools optimization with time windows, and CSV/PDF/static-map exports. Interactive resequencing keeps planners in control.'],
      ['SYSTEM THINKING', 'The repository covers asynchronous jobs, local SQLite or PostgreSQL data storage, Redis/RQ workers, and cloud-oriented deployment and monitoring architecture. Its previous cloud hosting was decommissioned; this portfolio links to the source rather than an inactive demo.'],
      ['TECHNOLOGIES', 'React · Vite · TypeScript · React-Leaflet · Python · FastAPI · SQLAlchemy · OR-Tools · Redis']
    ], url: 'https://github.com/jasonjlcl/SG-Route-OPT'
  },
  forge: {
    title: 'Skill Forge', category: 'FULL-STACK / GENERATIVE AI',
    intro: 'A GenAI-assisted onboarding platform for manufacturing teams, connecting learning content with interactive guidance.',
    sections: [
      ['THE CHALLENGE', 'Make onboarding content easier to explore through contextual questions, personalized learning, quizzes, and progress tracking.'],
      ['THE BUILD', 'A React/TypeScript frontend connects to a Node.js and Express API. Retrieval-augmented chat uses ChromaDB context and streams responses with Server-Sent Events. PostgreSQL and Drizzle support persistent learning data.'],
      ['BEYOND THE CHAT', 'The project documents cookie-based authentication, CSRF protection, resilience policies, request observability, retrieval evaluation, and staged CI/CD checks.'],
      ['TECHNOLOGIES', 'React · TypeScript · Node.js · Express · PostgreSQL · Drizzle · ChromaDB · OpenAI/Gemini · SSE']
    ], url: 'https://github.com/jasonjlcl/Skill-Forge-'
  },
  warehouse: {
    title: 'End-to-End Data Warehouse & BI', category: 'DATA ENGINEERING / ANALYTICS',
    intro: 'A complete analytical workflow from synthetic sales data to a dimensional warehouse and interactive business intelligence.',
    sections: [
      ['THE CHALLENGE', 'Bring modeling, data generation, ingestion, validation, and reporting together instead of treating a dashboard as an isolated output.'],
      ['THE BUILD', 'Python scripts generate synthetic business data. SQL defines a central orders fact table and associated dimensions. Automated loads stage and ingest data into Snowflake, with validation and error logging.'],
      ['THE ANALYTICAL LAYER', 'SQL queries explore sales, customer, and time-based patterns. Power BI connects to Snowflake for interactive filtering and reporting. The repository includes the generation scripts and workflow documentation.'],
      ['TECHNOLOGIES', 'Python · Pandas · NumPy · Faker · SQL · Snowflake · Power BI']
    ], url: 'https://github.com/jasonjlcl/End-to-End-DWBI-with-Snowflake-Python-SQL-Power-BI'
  },
  research: {
    title: 'Automated Literature Review', category: 'APPLIED AI / RESEARCH AUTOMATION',
    intro: 'A Python pipeline for turning exported literature records into structured, analysis-ready research datasets.',
    sections: [
      ['THE CHALLENGE', 'Organize literature-review processing so that ingestion, DOI resolution, insight extraction, and export can be repeated and recovered when individual records fail.'],
      ['THE BUILD', 'The pipeline ingests OpenAlex CSV/JSON exports, cleans and filters records, resolves DOIs asynchronously with retries, and uses an LLM to extract 23 structured insight fields from abstracts.'],
      ['DESIGNED FOR RECOVERY', 'Per-record outputs support failed-row recovery and merge. Final results are exported as CSV and Parquet with processing metadata. The project also includes an optional local GUI and technical documentation.'],
      ['TECHNOLOGIES', 'Python · OpenAlex exports · Async DOI resolution · LLMs · CSV · Parquet']
    ], url: 'https://github.com/jasonjlcl/Gen-AI-literature-review-'
  }
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const cards = [...document.querySelectorAll('.project-card')];
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('.project-counter').textContent = `${String(count).padStart(2, '0')} PROJECTS`;
}));

const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projectDetails[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const details = document.querySelector('#dialog-details');
  details.replaceChildren(...project.sections.map(([title, copy]) => {
    const section = document.createElement('section'); section.className = 'dialog-detail';
    const heading = document.createElement('h3'); heading.textContent = title;
    const paragraph = document.createElement('p'); paragraph.textContent = copy;
    section.append(heading, paragraph); return section;
  }));
  document.querySelector('#dialog-source').href = project.url;
  dialog.showModal(); dialog.scrollTop = 0;
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.06 });
  document.querySelectorAll('.project-card,.about-grid,.capabilities').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); });
}
const visual = document.querySelector('.hero-visual');
visual.addEventListener('pointermove', event => {
  if (reducedMotion.matches || event.pointerType !== 'mouse') return;
  const bounds = visual.getBoundingClientRect();
  visual.style.setProperty('--tilt-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 8}deg`);
  visual.style.setProperty('--tilt-y', `${-((event.clientY - bounds.top) / bounds.height - .5) * 8}deg`);
});
visual.addEventListener('pointerleave', () => { visual.style.setProperty('--tilt-x', '0deg'); visual.style.setProperty('--tilt-y', '0deg'); });
document.querySelector('#year').textContent = String(new Date().getFullYear());
