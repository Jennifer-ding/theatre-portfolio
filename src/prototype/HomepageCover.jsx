import React from 'react';
import { acts } from './content';
import { coverContent as cover } from './coverContent';
import './homepage-cover.css';

export default function HomepageCover() {
  return <section className="identity-cover" aria-labelledby="page-heading">
    <div className="identity-topline"><span>A PERSONAL ARCHIVE / EIGHT ACTS</span><span>J.W.D. / OPENING PAGE</span></div>
    <div className="identity-layout">
      <div className="identity-copy">
        <p className="identity-kicker">The person behind the curtain</p>
        <h1 id="page-heading" tabIndex="-1" className="identity-title" aria-label="Jennifer">{acts.map(act => <a key={act.id} href={`#/act/${act.id}`} aria-label={`${act.letter} — Act ${act.id}: ${act.name}`} title={`Act ${act.id} — ${act.name}`}>{act.letter}</a>)}</h1>
        <p className="identity-letter-hint">EACH LETTER OPENS AN ACT</p>
        <div className="identity-bio"><p className="identity-name">{cover.name}</p><p className="identity-roles">{cover.roles}</p><p className={`identity-intro ${cover.introduction ? '' : 'identity-pending'}`}>{cover.introduction || '[A short introduction, in my own words — to be added.]'}</p></div>
        <a className="identity-cta" href="#/act/I">Enter My World <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>
        <p className="identity-margin-note">a name, eight ways in.</p>
      </div>
      <div className="identity-collage" role="group" aria-label="Personal photo collage — clearly labeled placeholders">
        <div className="identity-paper identity-paper-back" aria-hidden="true"/>
        <div className="identity-arc" aria-hidden="true"/>
        {cover.photos.map((photo, i) => <figure key={i} className={`identity-photo identity-photo-${i+1}`}><div className="identity-photo-window">{photo.src ? <img src={photo.src} alt={photo.alt}/> : <div className={`identity-photo-placeholder identity-tone-${i+1}`}><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="9" width="34" height="30" rx="1"/><circle cx="31" cy="18" r="3"/><path d="m8 33 11-12 11 13 5-6 6 8"/></svg><span>{photo.label}</span><small>PHOTO TO BE SUPPLIED</small></div>}</div><figcaption>{photo.caption}</figcaption></figure>)}
        <div className="identity-paper-note"><span className="identity-note-pin" aria-hidden="true"/><span className="identity-note-label">A NOTE IN THE MARGIN</span><p>{cover.note || '[A few words from my notebook — to be added.]'}</p><span className="identity-note-rule" aria-hidden="true"/></div>
        <span className="identity-collage-label">FRAGMENTS OF A PERSONAL ARCHIVE</span>
        <span className="identity-cross" aria-hidden="true">+</span>
      </div>
    </div>
    <div className="identity-bottomline"><span>JOURNEY BEGINS HERE</span><span>Scroll to unfold the playbill <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v13m-5-5 5 5 5-5"/></svg></span></div>
  </section>;
}
