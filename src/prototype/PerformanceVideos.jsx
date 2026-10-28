import React from 'react';
import './performance-videos.css';

export default function PerformanceVideos({ production }) {
  const videos = [
    { title: 'Full Performance', src: production.fullVideo },
    { title: `Edited Short Performance — ${production.duration} Minutes`, src: production.shortVideo }
  ];
  return <div className="two-column media-grid performance-videos">{videos.map(video => {
    const videoId = new URL(video.src).pathname.split('/').pop();
    return <section className="performance-video" key={video.src}>
      <h3>{video.title}</h3>
      <div className="performance-video-frame"><iframe
        src={`${video.src}?autoplay=0&controls=1&playsinline=1&rel=0`}
        title={`${production.title} — ${video.title}`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
      /></div>
      <a className="performance-video-external" href={`https://youtu.be/${videoId}`} target="_blank" rel="noreferrer" aria-label={`Watch ${production.title} — ${video.title} on YouTube`}>Watch on YouTube ↗</a>
    </section>;
  })}</div>;
}
