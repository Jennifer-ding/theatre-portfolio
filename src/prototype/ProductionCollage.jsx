import React, { useEffect, useRef, useState } from 'react';
import { productionLayouts } from './production-layouts';
import './production-collage.css';

const placement = ([x, y, w, h], mobile) => ({ '--x': `${x}%`, '--y': `${y}%`, '--w': `${w}%`, '--h': `${h}%`, '--mx': `${mobile[0]}%`, '--my': `${mobile[1]}%`, '--mw': `${mobile[2]}%`, '--mh': `${mobile[3]}%` });
const textPlacement = (position, mobile) => placement([...position, 0], [...mobile, 0]);
export default function ProductionCollage({ production }) {
  const layout = productionLayouts[production.id];
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const origin = useRef(null);
  const open = selected !== null;
  const photo = open ? layout.photos[selected] : null;
  const move = offset => setSelected(index => (index + offset + layout.photos.length) % layout.photos.length);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    closeButton.current.focus();
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => origin.current?.focus({ preventScroll: true }));
    };
  }, [open]);
  return <article className="experience-detail production-collage-detail">
    <div className={`production-slide slide-${production.id}`} aria-label={`${layout.title} — interactive portfolio composition`}>
      <svg className="production-slide-lines" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><path d="M40 170C-100 430 220 200 90 620S290 670 150 880M1520 0C1400 260 1650 300 1500 600S1600 800 1500 900"/></svg>
      <h2 className="production-slide-title" aria-label={layout.title} style={textPlacement(layout.titlePos, layout.mobileTitle)}>{layout.lines.map((line, i) => <span key={i}>{line}</span>)}</h2>
      <div className="production-slide-meta" style={textPlacement(layout.meta, layout.mobileMeta)}><p>{layout.date}</p><p>{layout.credits}</p></div>
      {layout.missing && <div className="production-photo-pending" style={placement(layout.missing, layout.mobileMissing)}><span>PHOTO MAPPING PENDING</span><p>Small ensemble inset beneath the title — awaiting confirmation.</p></div>}
      {layout.photos.map((image, index) => <button type="button" key={image.src} className={`production-slide-photo slide-photo-${index+1}`} style={placement(image.position, image.mobile)} aria-label={`Enlarge ${image.alt}`} aria-haspopup="dialog" onClick={event => { origin.current = event.currentTarget; setSelected(index); }}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy"/>
      </button>)}
    </div>
    <p className="production-collage-hint">Select any photograph to examine the original.</p>
    <a className="primary-button" href="#/act/II">Back to Experience</a>
    <dialog className="production-photo-lightbox" ref={dialog} aria-label={`${layout.title} — production photographs`} onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.stopPropagation(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {photo && <><div className="production-lightbox-top"><span>{layout.title} / {selected + 1} of {layout.photos.length}</span><button type="button" ref={closeButton} onClick={() => setSelected(null)}>Close ×</button></div>
        <div className="production-lightbox-stage" onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}><button className="production-lightbox-prev" type="button" aria-label="Previous photograph" onClick={() => move(-1)}>←</button><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/><button className="production-lightbox-next" type="button" aria-label="Next photograph" onClick={() => move(1)}>→</button></div>
        <p className="production-lightbox-caption" aria-live="polite">{photo.alt}</p></>}
    </dialog>
  </article>;
}
