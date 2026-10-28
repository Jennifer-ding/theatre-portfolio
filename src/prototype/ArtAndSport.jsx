import React, { useEffect, useRef, useState } from 'react';
import { chapterImages as images, training, soloExhibition, athleticAchievements } from './art-sport-content';
import './art-sport.css';
import ArtworkCoverflow from './ArtworkCoverflow';

// Native modal supplies focus containment, Escape and return-to-trigger focus.
function ImageGallery({ photos, label, artwork = false }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    closeButton.current?.focus();
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);
  return <>
    <div className={`chapter-image-grid ${artwork ? 'artwork-grid' : ''}`} aria-label={label}>
      {photos.map((photo, index) => <figure key={photo.src}>
        <button type="button" className="chapter-image-button" onClick={() => setSelected(photo)} aria-label={`Enlarge ${photo.alt}`} aria-haspopup="dialog">
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy"/>
          <span className="chapter-image-enlarge" aria-hidden="true">View larger +</span>
        </button>
        <figcaption>{photo.caption || `${label} / ${String(index + 1).padStart(2, '0')}`}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="chapter-image-dialog" aria-label={selected ? `Enlarged image: ${selected.alt}` : 'Enlarged image'} onCancel={event => { event.preventDefault(); setSelected(null); }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      {selected && <><button type="button" className="chapter-dialog-close" ref={closeButton} onClick={() => setSelected(null)}>Close ×</button><img src={selected.src} alt={selected.alt} width={selected.width} height={selected.height}/><p>{selected.caption || selected.alt}</p><a href={selected.src} target="_blank" rel="noreferrer">Open original image in a new tab</a></>}
    </dialog>
  </>;
}

export function Imagination() {
  return <div className="art-sport-chapter imagination-chapter">
    <div className="two-column">
      <section className="copy-block"><h3>Paintings</h3><p className="chapter-training">{training.fineArt}</p><a className="chapter-section-link" href="#/act/V" onClick={event => { event.preventDefault(); document.getElementById('fine-art-works')?.scrollIntoView({ block: 'start' }); }}>View Fine Art works ↓</a></section>
      <section className="copy-block"><h3>Chinese calligraphy</h3><p className="chapter-training">{training.calligraphy}</p><p>{soloExhibition}</p><a className="chapter-section-link" href="#/act/V" onClick={event => { event.preventDefault(); document.getElementById('calligraphy-works')?.scrollIntoView({ block: 'start' }); }}>View calligraphy and ink paintings ↓</a></section>
    </div>
    <section className="copy-block"><h3>Fine art training background</h3><ul className="chapter-training-list"><li>{training.fineArt}</li><li>{training.calligraphy}</li></ul></section>
    <section className="chapter-gallery-section" aria-labelledby="artwork-heading"><h3 id="artwork-heading">Artwork gallery</h3>
      <section id="fine-art-works"><h4>Fine Art</h4><ArtworkCoverflow photos={images.fineArt} label="Fine Art"/></section>
      <section id="calligraphy-works"><h4>Chinese calligraphy and ink paintings</h4><ArtworkCoverflow photos={images.calligraphy} label="Calligraphy and ink painting"/></section>
    </section>
  </div>;
}

export function Fortitude() {
  // Preserve original caption numbers while hiding only the requested photo.
  const volleyball = images.volleyball.map((photo, index) => ({ ...photo, caption: photo.caption || `Volleyball / ${String(index + 1).padStart(2, '0')}` })).filter(photo => !photo.src.endsWith('/volleyball-02大.jpeg'));
  const teamwork = images.general.filter(photo => photo.src.includes('/teamwork-'));
  const awards = images.general.filter(photo => !photo.src.includes('/teamwork-'));
  return <div className="art-sport-chapter fortitude-chapter">
    <div className="two-column"><section className="copy-block"><h3>Volleyball</h3><p className="chapter-training">{training.volleyball}</p></section><section className="copy-block"><h3>Squash</h3><p className="chapter-training">{training.squash}</p></section></div>
    <section className="chapter-gallery-section" aria-label="Athletic photography"><h4>Volleyball photography</h4><ImageGallery photos={volleyball} label="Volleyball"/><h4>Squash photography</h4><ImageGallery photos={images.squash} label="Squash"/></section>
    <div className="three-column">
      <section className="copy-block"><h3>Teamwork</h3><ImageGallery photos={teamwork} label="Teamwork"/></section>
      <section className="copy-block"><h3>Achievements</h3><ul className="chapter-awards">{athleticAchievements.map(award => <li key={award}>{award}</li>)}</ul><ImageGallery photos={awards} label="Achievements"/></section>
    </div>
  </div>;
}
