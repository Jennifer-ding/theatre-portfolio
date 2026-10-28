import React, { useEffect, useRef, useState } from 'react';
import './friendship-flipbook.css';

const PDF_URL = '/images/documents/friendship-full-script.pdf';
const TITLE = 'The Things I Called Friendship';

function ZoomReader({ pdf, pdfUrl, initialPage, onClose }) {
  const dialog = useRef(null);
  const canvas = useRef(null);
  const view = useRef(null);
  const [page, setPage] = useState(initialPage);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(600);
  const [error, setError] = useState('');
  useEffect(() => {
    const active = document.activeElement;
    const scroll = window.scrollY;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(180, entry.contentRect.width - 32)));
    observer.observe(view.current);
    return () => { observer.disconnect(); document.body.style.overflow = overflow; active?.focus({ preventScroll: true }); window.scrollTo({ top: scroll, behavior: 'instant' }); };
  }, []);
  useEffect(() => {
    let cancelled = false;
    let render;
    setError('');
    (async () => {
      const original = await pdf.getPage(page);
      if (cancelled) return;
      const natural = original.getViewport({ scale: 1 });
      const cssWidth = Math.min(width, 900) * zoom;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = original.getViewport({ scale: cssWidth / natural.width * pixelRatio });
      const element = canvas.current;
      element.width = Math.ceil(viewport.width); element.height = Math.ceil(viewport.height);
      element.style.width = `${cssWidth}px`; element.style.height = `${cssWidth * natural.height / natural.width}px`;
      render = original.render({ canvasContext: element.getContext('2d'), viewport });
      await render.promise;
    })().catch(err => { if (!cancelled && err.name !== 'RenderingCancelledException') setError('This page could not be displayed. Please open the original PDF below.'); });
    return () => { cancelled = true; render?.cancel(); };
  }, [pdf, page, zoom, width]);
  const turn = delta => { setPage(p => Math.max(1, Math.min(pdf.numPages, p + delta))); view.current.scrollTo(0, 0); };
  return <dialog className="friendship-script-zoom" ref={dialog} aria-label="Enlarged original script" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); turn(e.key === 'ArrowLeft' ? -1 : 1); }
  }}>
    <header><span>Original script · Page {page} of {pdf.numPages}</span><button onPointerUp={event => { if (event.pointerType === 'touch') { event.preventDefault(); onClose(); } }} onClick={onClose}>Close ×</button></header>
    <div className="friendship-script-controls"><button aria-label="Previous enlarged page" disabled={page === 1} onClick={() => turn(-1)}>←</button><button aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(z => Math.max(1, z - .5))}>−</button><button onClick={() => setZoom(1)}>Fit width</button><span>{Math.round(zoom * 100)}%</span><button aria-label="Zoom in" disabled={zoom >= 3} onClick={() => setZoom(z => Math.min(3, z + .5))}>+</button><button aria-label="Next enlarged page" disabled={page === pdf.numPages} onClick={() => turn(1)}>→</button></div>
    <div className="friendship-script-zoom-viewport" ref={view} tabIndex="0" aria-label="Original PDF page; scroll or swipe to pan"><canvas ref={canvas} role="img" aria-label={`Original script page ${page}`}/>{error && <p role="alert">{error}</p>}</div>
    <a href={pdfUrl} target="_blank" rel="noreferrer">Open Original PDF ↗</a>
  </dialog>;
}

export function ScriptFlipbook({ pdfUrl = PDF_URL, title = TITLE, subtitle = '', theme = '', directNavigation = false }) {
  const root = useRef(null);
  const host = useRef(null);
  const flip = useRef(null);
  const pdf = useRef(null);
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState('');
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [zoomPage, setZoomPage] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [destination, setDestination] = useState('1');

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let loading;
    let renderer;
    let instance;
    const pageUrls = [];
    const bookHost = document.createElement('div');
    host.current.append(bookHost);
    (async () => {
      setStatus('Loading the original script…');
      const [{ getDocument, GlobalWorkerOptions }, worker, { PageFlip }] = await Promise.all([
        import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url'), import('page-flip')
      ]);
      if (cancelled) return;
      GlobalWorkerOptions.workerSrc = worker.default;
      loading = getDocument({ url: pdfUrl });
      const document = await loading.promise;
      if (cancelled) return;
      pdf.current = document;
      setCount(document.numPages);
      const firstPage = await document.getPage(1);
      if (cancelled) return;
      const originalSize = firstPage.getViewport({ scale: 1 });
      const pageRatio = originalSize.height / originalSize.width;
      const elements = [];
      const titleText = title;
      const cover = (back = false) => {
        const el = window.document.createElement('div');
        el.className = 'friendship-script-page friendship-script-hardcover';
        el.dataset.density = 'hard';
        const inner = window.document.createElement('div');
        const label = window.document.createElement('span'); label.textContent = back ? 'END OF SCRIPT' : 'AN ORIGINAL PLAY';
        const title = window.document.createElement('h4'); title.textContent = titleText;
        const author = window.document.createElement('p'); author.textContent = 'Jennifer Wanjia Ding';
        inner.append(label, title);
        if (subtitle) { const sub = window.document.createElement('span'); sub.className = 'awan-script-subtitle'; sub.textContent = subtitle; inner.append(sub); }
        inner.append(author); el.append(inner); return el;
      };
      elements.push(cover());
      // Render the exact PDF pages once, sequentially, to avoid simultaneous canvas memory spikes.
      for (let number = 1; number <= document.numPages; number++) {
        if (cancelled) return;
        setStatus(`Preparing original pages · ${number} / ${document.numPages}`);
        const page = await document.getPage(number);
        if (cancelled) return;
        const viewport = page.getViewport({ scale: 1.5 });
        const el = window.document.createElement('div'); el.className = 'friendship-script-page'; el.dataset.pdfPage = number;
        const canvas = window.document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', `Original script page ${number}`);
        renderer = page.render({ canvasContext: canvas.getContext('2d'), viewport });
        await renderer.promise;
        if (cancelled) return;
        // StPageFlip clones pages in portrait mode; images retain pixels when cloned, canvases do not.
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (cancelled) return;
        const url = URL.createObjectURL(blob); pageUrls.push(url);
        const image = window.document.createElement('img'); image.src = url;
        image.alt = `Original script page ${number}`; image.draggable = false;
        await image.decode();
        canvas.width = 0; canvas.height = 0;
        el.append(image); elements.push(el);
      }
      elements.push(cover(true));
      bookHost.append(...elements);
      instance = new PageFlip(bookHost, {
        width: 400, height: 400 * pageRatio, size: 'stretch', minWidth: 320, maxWidth: 470,
        minHeight: 140 * pageRatio, maxHeight: 470 * pageRatio,
        showCover: true, usePortrait: true, drawShadow: true, maxShadowOpacity: .25,
        flippingTime: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 850,
        mobileScrollSupport: false, swipeDistance: 25, showPageCorners: true
      });
      flip.current = instance;
      const changed = event => setCurrent(event.data);
      instance.on('flip', changed);
      instance.on('changeOrientation', event => setPortrait(event.data === 'portrait'));
      instance.on('init', event => { setPortrait(event.data.mode === 'portrait'); setReady(true); setStatus(''); });
      instance.loadFromHTML(elements);
      // Opening the front hardcover reveals the first original page(s).
      requestAnimationFrame(() => { if (!cancelled) instance.flipNext(); });
    })().catch(error => { if (!cancelled) { console.error('Script reader:', error); setStatus('The reader could not load. You can still read every page using Open Original PDF.'); } });
    return () => { cancelled = true; renderer?.cancel(); instance?.destroy(); bookHost.remove(); flip.current = null; pdf.current = null; loading?.destroy(); pageUrls.forEach(url => URL.revokeObjectURL(url)); };
  }, [started, pdfUrl, title, subtitle]);

  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (root.current.requestFullscreen) await root.current.requestFullscreen();
      else setExpanded(value => !value);
    } catch { setExpanded(value => !value); }
  };
  const pageLabel = current === 0 ? 'Front cover' : current > count ? 'Back cover' : `Page${!portrait && current < count ? 's' : ''} ${current}${!portrait && current < count ? `–${current + 1}` : ''} of ${count}`;
  return <section className={`friendship-script ${theme ? `friendship-script--${theme}` : ''} ${expanded ? 'is-expanded' : ''}`} ref={root} aria-labelledby="friendship-script-heading" onKeyDown={event => {
    if (zoomPage !== null) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.key === 'ArrowLeft' ? flip.current?.flipPrev() : flip.current?.flipNext(); }
    if (event.key === 'Escape') setExpanded(false);
  }}>
    <div className="friendship-script-heading"><p className="eyebrow">03 / On the page</p><h3 id="friendship-script-heading">The full script</h3><p>Original manuscript · PDF archive</p></div>
    {!started && <button className="friendship-script-closed" onClick={() => setStarted(true)} aria-label={`Open ${title} script flipbook`}><span>AN ORIGINAL PLAY</span><strong>{title === TITLE ? <>The Things<br/>I Called<br/><em>Friendship</em></> : title}</strong>{subtitle && <span className="awan-script-subtitle">{subtitle}</span>}<span>Jennifer Wanjia Ding</span><small>Open the book ↗</small></button>}
    <p className="friendship-script-status" role="status" aria-live="polite">{status}</p>
    {started && <div className={`friendship-script-stage ${ready ? 'is-ready' : ''}`} ref={host} tabIndex="0" aria-label="Interactive script book. Use arrow keys, click a page edge, drag, or swipe to turn pages."/>}
    {ready && <><div className="friendship-script-controls"><button onClick={() => flip.current?.flipPrev()} disabled={current === 0} aria-label="Previous script page">← Previous</button><span role="status" aria-live="polite">{pageLabel}</span><button onClick={() => flip.current?.flipNext()} disabled={current > count} aria-label="Next script page">Next →</button></div><div className="friendship-script-controls"><button onClick={() => setZoomPage(Math.max(1, Math.min(count, current)))}>Zoom / Read closely</button><button onClick={fullscreen}>Fullscreen</button>{expanded && <button onClick={() => setExpanded(false)}>Exit fullscreen</button>}</div><p className="friendship-script-help">Click a page edge, drag, or swipe to turn. Use arrow keys when the book is focused.</p></>}
    {ready && directNavigation && <form className="friendship-script-controls awan-script-jump" onSubmit={event => {
      event.preventDefault();
      const number = Number(destination);
      if (Number.isInteger(number) && number >= 1 && number <= count) flip.current?.flip(number);
    }}><label htmlFor="awan-script-page">Go to page</label><input id="awan-script-page" type="number" min="1" max={count} step="1" required value={destination} onChange={event => setDestination(event.target.value)}/><button type="submit">Go</button></form>}
    <a className="friendship-script-original" href={pdfUrl} target="_blank" rel="noreferrer">Open Original PDF ↗</a>
    {zoomPage !== null && <ZoomReader pdfUrl={pdfUrl} pdf={pdf.current} initialPage={zoomPage} onClose={() => setZoomPage(null)}/>}
  </section>;
}

// Preserve the approved Friendship reader with its original defaults.
export default function FriendshipFlipbook() { return <ScriptFlipbook/>; }
