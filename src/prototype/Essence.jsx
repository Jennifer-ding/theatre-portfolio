import React, { useEffect, useRef, useState } from 'react';
import { essence } from './essence-content';
import './essence.css';

// Preserve the supplied emphasis without displaying Markdown formatting markers.
function Passage({ text }) { return text.split(/(\*[^*]+\*)/g).map((part, index) => part.startsWith('*') && part.endsWith('*') ? <em key={index}>{part.slice(1, -1)}</em> : part); }

function EssenceLetter({ item, onEnlarge }) {
  const [expanded, setExpanded] = useState(false);
  return <section className="essence-letter" aria-labelledby={`essence-${item.id}-title`}>
    <button type="button" className="essence-photo" onClick={event => onEnlarge(item, event.currentTarget)} aria-label={`Enlarge ${item.letter} photograph: ${item.alt}`} aria-haspopup="dialog"><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" style={{ objectPosition: item.id === 'f' ? '50% 35%' : '50% 50%' }}/><span aria-hidden="true">View larger +</span></button>
    <span className="essence-decorative-letter" aria-hidden="true">{item.letter}</span>
    <h2 id={`essence-${item.id}-title`}>{item.name}</h2>
    <p className="essence-signature">{item.signature}</p>
    <button type="button" className="essence-read-more" aria-expanded={expanded} aria-controls={`essence-${item.id}-writing`} onClick={() => setExpanded(value => !value)}>{expanded ? 'Show Less' : 'Read More'}<span aria-hidden="true">{expanded ? ' −' : ' +'}</span><span className="essence-sr-only">: {item.name}</span></button>
    <div className={`essence-writing ${expanded ? 'is-expanded' : ''}`} id={`essence-${item.id}-writing`} aria-hidden={!expanded} inert={!expanded}><div>{item.paragraphs.map((text, index) => <p key={index}><Passage text={text}/></p>)}</div></div>
  </section>;
}

export default function Essence() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const close = useRef(null);
  const origin = useRef(null);
  // Same native-dialog lightbox approach as the existing photography galleries.
  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    const y = window.scrollY;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal(); close.current.focus();
    return () => {
      modal.close(); document.body.style.overflow = overflow;
      requestAnimationFrame(() => { origin.current?.focus({ preventScroll: true }); window.scrollTo({ top: y, behavior: 'instant' }); });
    };
  }, [selected]);
  return <div className="essence-chapter">
    <div className="essence-letters">{essence.items.map(item => <EssenceLetter key={item.id} item={item} onEnlarge={(photo, trigger) => { origin.current = trigger; setSelected(photo); }}/>)}</div>
    <p className="essence-closing">{essence.closing}</p>
    <dialog className="essence-lightbox" ref={dialog} aria-label={selected ? `Original photograph: ${selected.alt}` : 'Original Essence photograph'} onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      {selected && <><button ref={close} type="button" onPointerUp={event => { if (event.pointerType === 'touch') { event.preventDefault(); setSelected(null); } }} onClick={() => setSelected(null)}>Close ×</button><img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height}/><a href={selected.src} target="_blank" rel="noreferrer">Open original image ↗</a></>}
    </dialog>
  </div>;
}
