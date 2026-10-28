import React from 'react';
import { awanEssay as essay } from './awan-essay';
import './awan-essay.css';

export default function AwanEssay() {
  const jumpTo = (event, id) => {
    event.preventDefault();
    const heading = document.getElementById(`awan-essay-${id}`);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  return <article className="awan-essay" aria-label="Complete original directorial essay">
    <header className="awan-essay-frontmatter"><p className="awan-essay-author">{essay.author}</p><p className="awan-essay-document-title">{essay.title}</p></header>
    <div className="awan-essay-layout">
      <nav className="awan-essay-index" aria-label="Notebook index"><p>Notebook index</p><ol>{essay.sections.map(section => <li key={section.id}><a href="#/act/IV/a-wan" onClick={event => jumpTo(event, section.id)}>{section.heading}</a></li>)}</ol></nav>
      <div className="awan-essay-sections">{essay.sections.map((section, index) => <section className="awan-essay-chapter" key={section.id} aria-labelledby={`awan-essay-${section.id}`}><span className="awan-essay-chapter-number">{String(index + 1).padStart(2, '0')}</span><h3 id={`awan-essay-${section.id}`} tabIndex="-1">{section.heading}</h3>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>)}</div>
    </div>
  </article>;
}
