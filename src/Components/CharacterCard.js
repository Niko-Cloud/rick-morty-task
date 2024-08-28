import React from 'react';
import { Link } from 'react-router-dom';
import './ComponentStyles/CharacterCard.css';
import maleIcon from '../assets/male.png';
import femaleIcon from '../assets/female.png';
import aliveIcon from '../assets/alive.png';
import deadIcon from '../assets/dead.png';
import questionIcon from '../assets/question.png';

const CharacterCard = ({ character }) => {
  const genderIcon = character.gender === 'Male' ? maleIcon : femaleIcon;

  const statusIcon = character.status === 'Alive' ? aliveIcon
                    : character.status === 'Dead' ? deadIcon
                    : questionIcon;

  return (
    <Link to={`/character/${character.id}`} className="card-link">
      <div className="card character-card shadow-sm d-flex flex-column h-100">
        <img src={character.image} className="card-img-top character-photo" alt={character.name} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="text-center">
            <h5 className="card-title">{character.name}</h5>
            <p className="card-text text-muted">{character.species}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <img src={statusIcon} alt={character.status} style={{ width: '20px', height: '20px' }} />
            <img src={genderIcon} alt={character.gender} style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
