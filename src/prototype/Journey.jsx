import React, { useId, useRef, useState } from 'react';
import { journeyItems } from './journey-content';
import './journey.css';

export default function Journey() {
  const [expanded, setExpanded] = useState(null);
  const prefix = useId();
  const buttons = useRef([]);
  const focusItem = (event, index) => {
    let target;
    if (event.key === 'ArrowDown') target = (index + 1) % journeyItems.length;
    if (event.key === 'ArrowUp') target = (index - 1 + journeyItems.length) % journeyItems.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = journeyItems.length - 1;
    if (target !== undefined) { event.preventDefault(); buttons.current[target]?.focus(); }
  };
  return <>
    <figure className="journey-headshot">
      <div className="journey-headshot-frame"><img src="/images/headshot.JPG" alt="Official portrait of Jennifer Wanjia Ding" width="8192" height="5464"/></div>
      <figcaption><span className="journey-headshot-name">Jennifer Wanjia Ding</span><span className="journey-headshot-roles">Director · Playwright · Actor · Volleyball Player</span></figcaption>
    </figure>
    <div className="journey-accordion">
    {journeyItems.map((item, index) => {
      const open = expanded === item.id;
      const buttonId = `${prefix}-${item.id}-button`;
      const panelId = `${prefix}-${item.id}-panel`;
      return <section className={`journey-entry ${open ? 'is-expanded' : ''}`} key={item.id}>
        <h2 className="journey-entry-heading"><button type="button" id={buttonId} ref={element => { buttons.current[index] = element; }} aria-controls={panelId} aria-expanded={open} onClick={() => setExpanded(open ? null : item.id)} onKeyDown={event => focusItem(event, index)}>
          <span className="journey-entry-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="journey-entry-copy"><span className="journey-entry-title">{item.title}</span><span className="journey-entry-preview">{item.preview}</span></span>
          <span className="journey-entry-symbol" aria-hidden="true">+</span>
        </button></h2>
        <div className="journey-entry-panel" id={panelId} role="region" aria-labelledby={buttonId} aria-hidden={!open} inert={!open}>
          <div className="journey-entry-clip"><div className="journey-entry-text"><span className="journey-archive-label">PERSONAL ARCHIVE / {String(index + 1).padStart(2, '0')}</span><p>{item.text}</p></div></div>
        </div>
      </section>;
    })}
  </div></>;
}
