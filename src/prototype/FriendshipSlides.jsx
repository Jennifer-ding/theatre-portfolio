import React, { useEffect, useRef, useState } from 'react';
import './friendship-slides.css';

const sceneNames = [
  ['Prologue', 'Prologue'],
  ['Scene 1: Party of Acquaintance', 'Party of Acquaintance'],
  ['Scene 2, Act 1: Art Room', 'Art Room'],
  ['Scene 2, Act 2: Dorm', 'Dorm'],
  ['Scene 2, Act 3: Cafeteria', 'Cafeteria'],
  ['Scene 3, Act 1: The Beach', 'The Beach'],
  ['Scene 3, Act 2: The Hotel Room', 'The Hotel Room'],
  ['Scene 4: The Quiet House', 'The Quiet House'],
  ['Scene 5: Rooftop', 'Rooftop'],
  ['Epilogue', 'Epilogue']
];
const slides = [
  { src: '/images/friendship/friendship-synopsis.jpg', title: 'Synopsis' },
  { src: '/images/friendship/friendship-motivation.jpg', title: 'Creative Motivation' },
  ...sceneNames.map(([title, label], i) => ({ src: `/images/friendship/friendship-scene-${String(i + 1).padStart(2, '0')}.jpg`, title, label, id: `friendship-scene-${String(i + 1).padStart(2, '0')}` }))
];

export default function FriendshipSlides() {
  const [selected, setSelected] = useState(null);
  const [scale, setScale] = useState(1);
  const [fitWidth, setFitWidth] = useState(1);
  const dialog = useRef(null);
  const viewport = useRef(null);
  const closeButton = useRef(null);
  const origin = useRef(null);
  const pan = useRef(null);
  const open = selected !== null;
  const slide = open ? slides[selected] : null;
  const maxScale = Math.max(1, 1920 / fitWidth);
  const zoom = amount => setScale(value => Math.min(maxScale, Math.max(1, value * amount)));
  const changeSlide = amount => { setSelected(index => (index + amount + slides.length) % slides.length); setScale(1); };

  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    closeButton.current.focus();
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => { origin.current?.focus({ preventScroll: true }); window.scrollTo({ top: scrollY, behavior: 'instant' }); });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const element = viewport.current;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      setFitWidth(Math.max(1, Math.min(1920, bounds.width - 40, (bounds.height - 40) * 16 / 9)));
      setScale(1);
      element.scrollTo(0, 0);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element, { box: 'border-box' });
    return () => observer.disconnect();
  }, [open, selected]);

  useEffect(() => {
    if (open && scale === 1) viewport.current?.scrollTo(0, 0);
  }, [open, scale]);

  const openSlide = (event, index) => { origin.current = event.currentTarget; setSelected(index); setScale(1); };
  const imageButton = (image, index) => <button type="button" className="friendship-slide-button" aria-label={`Enlarge ${image.title} PowerPoint slide`} aria-haspopup="dialog" onClick={event => openSlide(event, index)}><img src={image.src} alt={`${image.title} — original PowerPoint slide for The Things I Called Friendship`} width="1920" height="1080" loading="lazy"/><span className="friendship-slide-enlarge" aria-hidden="true">View full-resolution slide +</span></button>;
  const jumpTo = (event, id) => {
    event.preventDefault();
    const label = document.getElementById(`${id}-heading`);
    label?.focus({ preventScroll: true });
    label?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };
  return <div className="friendship-slides">
    <div className="friendship-slide-intro" aria-label="Synopsis and Creative Motivation slides">{slides.slice(0, 2).map((image, i) => <figure key={image.src}>{imageButton(image, i)}</figure>)}</div>
    <section className="friendship-scene-section" aria-labelledby="friendship-scenes-heading"><h3 id="friendship-scenes-heading">Scene by Scene</h3>
      <nav className="friendship-scene-index" aria-label="Scene by Scene notebook index"><ol>{slides.slice(2).map((image, i) => <li key={image.id}><a href="#/act/III/friendship" onClick={event => jumpTo(event, image.id)}><span>{String(i + 1).padStart(2, '0')} /</span> {image.title}</a></li>)}</ol></nav>
      <div className="friendship-scene-slides">{slides.slice(2).map((image, i) => <section className="friendship-scene-slide" key={image.id} aria-labelledby={`${image.id}-heading`}><h4 id={`${image.id}-heading`} tabIndex="-1">{String(i + 1).padStart(2, '0')} / {image.label}</h4>{imageButton(image, i + 2)}</section>)}</div>
    </section>
    <dialog className="friendship-slide-lightbox" ref={dialog} aria-label="Original Friendship PowerPoint slide viewer" onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onKeyDown={event => {
      if (event.key === '+' || event.key === '=') { event.preventDefault(); zoom(1.5); }
      if (event.key === '-') { event.preventDefault(); zoom(1 / 1.5); }
      if (event.key === '0') { event.preventDefault(); setScale(1); }
      if (scale === 1 && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); changeSlide(event.key === 'ArrowRight' ? 1 : -1); }
    }}>
      {slide && <><div className="friendship-viewer-header"><span>{slide.title} / {selected + 1} of 12</span><button type="button" ref={closeButton} onPointerUp={event => { if (event.pointerType === 'touch') { event.preventDefault(); setSelected(null); } }} onClick={() => setSelected(null)}>Close ×</button></div>
        <div className="friendship-viewer-toolbar" aria-label="Slide zoom and navigation"><button type="button" onClick={() => changeSlide(-1)} aria-label="Previous slide">←</button><button type="button" onClick={() => zoom(1 / 1.5)} disabled={scale <= 1} aria-label="Zoom out">−</button><button type="button" onClick={() => setScale(1)}>Fit</button><button type="button" onClick={() => setScale(maxScale)}>Original size</button><button type="button" onClick={() => zoom(1.5)} disabled={scale >= maxScale - .001} aria-label="Zoom in">+</button><button type="button" onClick={() => changeSlide(1)} aria-label="Next slide">→</button></div>
        <div className={`friendship-viewer-viewport ${scale > 1 ? 'is-zoomed' : ''}`} ref={viewport} tabIndex="0" aria-label="Slide image; zoom in then scroll or drag to pan" onPointerDown={event => {
          if (scale <= 1 || event.pointerType !== 'mouse' || event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
          pan.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
          event.currentTarget.setPointerCapture(event.pointerId);
        }} onPointerMove={event => { if (pan.current) { event.currentTarget.scrollLeft = pan.current.left + pan.current.x - event.clientX; event.currentTarget.scrollTop = pan.current.top + pan.current.y - event.clientY; } }} onPointerUp={() => { pan.current = null; }} onPointerCancel={() => { pan.current = null; }}>
          <div className="friendship-viewer-canvas" style={{ minWidth: `${fitWidth * scale + 24}px`, minHeight: `${fitWidth * scale * 9 / 16 + 24}px` }}><img src={slide.src} alt={`${slide.title} — complete original PowerPoint slide`} draggable="false" style={{ width: `${fitWidth * scale}px`, height: `${fitWidth * scale * 9 / 16}px` }}/></div>
        </div><p className="friendship-viewer-help">Zoom to inspect. Drag or scroll to pan; swipe to pan on touchscreens. + / − to zoom, 0 to fit.</p></>}
    </dialog>
  </div>;
}
