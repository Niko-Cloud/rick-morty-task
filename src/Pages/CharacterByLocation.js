import React, { useState } from 'react';
import usePersistedState from '../Hooks/UsePersistedState';
import Dropdown from 'react-dropdown-select';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageStyles/CharacterByLocation.css';

const CharacterByLocation = () => {
  const [locations, setLocations] = usePersistedState('locationsState', []);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const options = [{ value: '', label: 'No location selected' }, ...locations.map(location => ({
    value: location.name,
    label: location.name,
  }))];

  const handleChange = (selected) => {
    setSelectedLocation(selected[0] || null);
  };

  const characters = selectedLocation && selectedLocation.value
    ? locations.find(loc => loc.name === selectedLocation.value)?.characters || []
    : [];

  const handleClearLocalState = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all locations?");
    if (confirmClear) {
      localStorage.removeItem('locationsState');
      setLocations([]);
      setSelectedLocation(null);
      toast.success("All locations have been cleared!");
    }
  };

  const handleDeleteLocation = () => {
    if (selectedLocation && selectedLocation.value) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the location "${selectedLocation.value}"?`);
      if (confirmDelete) {
        const updatedLocations = locations.filter(loc => loc.name !== selectedLocation.value);
        setLocations(updatedLocations);
        setSelectedLocation(null);
        toast.success(`Location "${selectedLocation.value}" has been deleted!`);
      }
    } else {
      toast.error("No location selected to delete!");
    }
  };

  const buttonText = selectedLocation && selectedLocation.value
    ? 'Delete Selected Location'
    : 'Clear All Locations';

  const handleButtonClick = selectedLocation && selectedLocation.value
    ? handleDeleteLocation
    : handleClearLocalState;

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className=" shadow-sm mb-4 position-relative">
        <div className="card-body">
          <Dropdown
            options={options}
            onChange={handleChange}
            placeholder="Select a location"
            value={selectedLocation ? [selectedLocation] : options[0]}
            className="mb-3 custom-dropdown"
            style={{ border: '1px solid #ced4da', borderRadius: '.25rem' }}
          />
          {selectedLocation && selectedLocation.value && (
            <div className="mt-3 mb-3">
              <h3 className="mb-3">{selectedLocation.value}</h3>
              {characters.length > 0 ? (
                <ul className="list-group">
                  {characters.map(character => (
                    <li key={character.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <Link to={`/character/${character.id}`} className="text-decoration-none text-dark">
                        <span className="d-inline-block">
                          {character.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No characters found for this location.</p>
              )}
            </div>
          )}
          <button
            onClick={handleButtonClick}
            className={`btn ${selectedLocation && selectedLocation.value ? 'btn-danger' : 'btn-warning'} w-100 mt-3`}
            style={{ borderRadius: '.25rem', boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)' }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterByLocation;
