import React from 'react';
import { productions } from './content';
import './experience.css';
import ProductionCollage from './ProductionCollage';

export function ExperienceCards() {
  return <div className="cards repertoire experience-cards">{productions.map((p, i) => {
    const photo = p.photos[0];
    return <article className="production-card experience-card" key={p.id}>
      <div className="poster experience-cover">
        {photo ? <img className="experience-cover-image" src={photo.src} alt={photo.alt} loading="lazy"/> : <div className="experience-photo-placeholder" aria-hidden="true"/>}
        <span className="experience-cover-shade" aria-hidden="true"/>
        <span className="poster-no">NO. {String(i + 1).padStart(2, '0')}</span>
        <span className="poster-title">{p.title}</span>
        <span className="poster-label">{p.original ? 'ORIGINAL PLAY' : 'REPERTOIRE'}{photo ? '' : ' / AUTHENTIC PHOTO PENDING'}</span>
      </div>
      <div className="card-copy"><h3>{p.title}</h3><p className="credit">Date: {p.date || '[To be supplied]'}</p><p className="credit">My credits: {p.credits || '[To be supplied]'}</p>
        <a className="arrow-link experience-card-link" href={`#/act/${p.original ? 'III' : 'II'}/${p.id}`} aria-label={`${p.original ? 'Enter the story' : 'View production'} — ${p.title}`}>{p.original ? 'Enter the story' : 'View production'} <span aria-hidden="true">↗</span></a>
      </div>
    </article>;
  })}</div>;
}

export function ExperienceDetail({ production: p }) {
  return <ProductionCollage production={p}/>;
}
