import React from 'react';

const CharacterSearch = ({ searchQuery, onSearchChange }) => (
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search characters by name"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default CharacterSearch;
