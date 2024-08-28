import React from 'react';

const EpisodeCard = ({ episode }) => (
  <div className="card h-100">
    <div className="card-header" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.25rem' }}>
      {episode.name}
    </div>
    <div className="card-body" style={{ fontFamily: 'Georgia, serif' }}>
      <p className="card-text">Aired: {episode.air_date}</p>
    </div>
    <div className="card-footer text-muted">
      Episode: {episode.episode}
    </div>
  </div>
);

export default EpisodeCard;
