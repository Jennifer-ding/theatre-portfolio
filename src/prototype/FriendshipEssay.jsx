import React from 'react';
import { friendshipEssay as essay } from './friendship-essay';
import './friendship-essay.css';

export default function FriendshipEssay() {
  const jumpTo = (event, id) => {
    event.preventDefault();
    const heading = document.getElementById(`friendship-essay-${id}`);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  return <article className="friendship-essay" aria-label="Complete original directorial essay">
    <header className="friendship-essay-frontmatter"><p className="friendship-essay-author">{essay.author}</p><p className="friendship-essay-document-title">{essay.title}</p></header>
    <div className="friendship-essay-layout">
      <nav className="friendship-essay-index" aria-label="Notebook index"><p>Notebook index</p><ol>{essay.sections.map(section => <li key={section.id}><a href="#/act/IV/friendship" onClick={event => jumpTo(event, section.id)}>{section.heading}</a></li>)}</ol></nav>
      <div className="friendship-essay-sections">{essay.sections.map((section, index) => <section className="friendship-essay-chapter" key={section.id} aria-labelledby={`friendship-essay-${section.id}`}><span className="friendship-essay-chapter-number">{String(index + 1).padStart(2, '0')}</span><h3 id={`friendship-essay-${section.id}`} tabIndex="-1">{section.heading}</h3>{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</section>)}</div>
    </div>
  </article>;
}
