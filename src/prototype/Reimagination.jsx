import React, { useEffect, useRef, useState } from 'react';
import { reimagination as copy } from './reimagination-content';
import './reimagination.css';

function Emphasis({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export default function Reimagination() {
  const lastLine = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setRevealed(true); observer.disconnect(); }
    }, { threshold: .2 });
    observer.observe(lastLine.current);
    return () => observer.disconnect();
  }, []);
  return <article className="reimagination-chapter">
    <section className="reimagination-essay" aria-labelledby="reimagination-dream-heading">
      <h2 id="reimagination-dream-heading">{copy.heading}</h2>
      {copy.paragraphs.map((text, index) => <p key={index} className={text === '**WHAT IF I COMBINED THE TWO???**' ? 'reimagination-turning-point' : undefined}><Emphasis text={text}/></p>)}
    </section>
    <section className="reimagination-collection" aria-labelledby="reimagination-collection-heading">
      <h2 id="reimagination-collection-heading">{copy.collectionTitle}</h2>
      <p>{copy.collectionSubtitle}</p>
      <p>{copy.collectionLine}</p>
    </section>
    <p className={`reimagination-final ${revealed ? 'is-revealed' : ''}`} ref={lastLine}>{copy.closing}</p>
  </article>;
}
