import React, { useEffect, useId, useRef, useState } from 'react';
import './artwork-coverflow.css';

export default function ArtworkCoverflow({ photos, label }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [drag, setDrag] = useState(0);
  const stage = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const buttons = useRef([]);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const wheel = useRef({ total: 0, time: 0 });
  const instructions = useId();
  const count = photos.length;
  const photo = photos[selected];
  const move = (amount) => setSelected(index => (index + amount + count) % count);

  useEffect(() => {
    const element = stage.current;
    const onWheel = event => {
      // Consume deliberate horizontal gestures only; ordinary page scrolling is preserved.
      const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      if (event.ctrlKey || !delta || (!event.shiftKey && Math.abs(event.deltaX) <= Math.abs(event.deltaY))) return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheel.current.time < 250) return;
      wheel.current.total += delta * (event.deltaMode === 1 ? 16 : 1);
      if (Math.abs(wheel.current.total) >= 28) {
        const direction = Math.sign(wheel.current.total);
        setSelected(index => (index + direction + count) % count);
        wheel.current = { total: 0, time: now };
      }
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => element.removeEventListener('wheel', onWheel);
  }, [count]);

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
      requestAnimationFrame(() => buttons.current.find(button => button?.dataset.current === 'true')?.focus({ preventScroll: true }));
    };
  }, [open]);

  const keys = event => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'Home') setSelected(0);
      else if (event.key === 'End') setSelected(count - 1);
      else move(event.key === 'ArrowRight' ? 1 : -1);
    }
  };
  const pointerDown = event => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
  };
  const pointerMove = event => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { gesture.current = null; return; }
    if (!start.horizontal && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      start.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (start.horizontal) {
      suppressClick.current = true;
      setDrag(Math.max(-75, Math.min(75, dx * .3)));
    }
  };
  const pointerEnd = (event, cancelled = false) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    if (!cancelled && start.horizontal) {
      const distance = event.clientX - start.x;
      if (Math.abs(distance) >= 35) move(distance < 0 ? 1 : -1);
    }
    gesture.current = null;
    setDrag(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return <section className="art-coverflow" role="region" aria-roledescription="carousel" aria-label={`${label} gallery`} onKeyDown={keys}>
    <p className="art-coverflow-hint" id={instructions}>Slide to explore · select a side work to focus · select the centre to enlarge</p>
    <div className={`art-coverflow-stage ${drag ? 'is-dragging' : ''}`} ref={stage} tabIndex="0" aria-label={`Browse ${label}`} aria-describedby={instructions}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={event => pointerEnd(event)} onPointerCancel={event => pointerEnd(event, true)}
      onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      {photos.map((work, index) => {
        const offset = ((index - selected + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
        const visible = Math.abs(offset) <= 2;
        return <button key={work.src} ref={element => { buttons.current[index] = element; }} type="button" className={`art-coverflow-work ${offset === 0 ? 'is-current' : ''}`}
          style={{ '--offset': offset, '--distance': Math.abs(offset), '--angle': `${offset === 0 ? 0 : offset > 0 ? -32 : 32}deg`, '--drag': `${drag}px`, zIndex: count - Math.abs(offset) }}
          aria-label={`${offset === 0 ? 'Enlarge' : 'Focus'} ${work.alt}`} aria-hidden={!visible} aria-haspopup={offset === 0 ? 'dialog' : undefined}
          aria-current={offset === 0 ? 'true' : undefined} data-current={offset === 0} tabIndex={offset === 0 ? 0 : -1}
          onClick={() => { if (offset === 0) setOpen(true); else setSelected(index); }}>
          <span className="art-coverflow-frame"><img src={work.src} alt={work.alt} width={work.width} height={work.height} draggable="false" loading={visible ? 'eager' : 'lazy'}/></span>
          <span className="art-coverflow-enlarge">{offset === 0 ? 'Examine artwork +' : 'Bring into focus'}</span>
        </button>;
      })}
    </div>
    <div className="art-coverflow-controls"><button type="button" onClick={() => move(-1)} aria-label={`Previous artwork in ${label}`}>← <span>Previous</span></button><div className="art-coverflow-caption" aria-live="polite" aria-atomic="true"><span>{String(selected + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span><p>{photo.caption || `${label} / ${String(selected + 1).padStart(2, '0')}`}</p></div><button type="button" onClick={() => move(1)} aria-label={`Next artwork in ${label}`}><span>Next</span> →</button></div>
    <dialog ref={dialog} className="art-coverflow-lightbox" aria-label={`${label} — enlarged original artwork`} onKeyDown={keys} onCancel={event => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)}>
      {open && <><div className="art-lightbox-header"><span>{label} / {selected + 1} of {count}</span><button type="button" ref={closeButton} onClick={() => setOpen(false)}>Close ×</button></div><div className="art-lightbox-image"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}/></div><div className="art-lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous artwork in lightbox">← Previous</button><a href={photo.src} target="_blank" rel="noreferrer">Open original image</a><button type="button" onClick={() => move(1)} aria-label="Next artwork in lightbox">Next →</button></div><p className="art-lightbox-caption" aria-live="polite">{photo.caption || photo.alt}</p></>}
    </dialog>
  </section>;
}
