import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAIL } from "../Queries/CharacterQueries";
import usePersistedState from "../Hooks/UsePersistedState";
import "./PageStyles/CharacterDetail.css";
import aliveIcon from "../assets/alive.png";
import deadIcon from "../assets/dead.png";
import unknownIcon from "../assets/question.png";
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });
  const [locationName, setLocationName] = useState("");
  const [locations, setLocations] = usePersistedState('locationsState', []);

  const handleAssignLocation = () => {
    if (locationName) {
      const character = { id: data.character.id, name: data.character.name };
      let locationExists = false;
      let characterReassigned = false;

      const updatedLocations = locations.map(loc => {
        if (loc.name === locationName) {
          locationExists = true;

          // Cek Karakter sudah ada di lokasi tersebut atau belum
          if (loc.characters.some(c => c.id === character.id)) {
            return loc;
          }

          // Tambah karakter ke lokasi
          return {
            ...loc,
            characters: [...loc.characters, character],
          };
        } else {
          // Menghapus karakter dari lokasi sebelumnya jika ada
          if (loc.characters.some(c => c.id === character.id)) {
            characterReassigned = true;
            return {
              ...loc,
              characters: loc.characters.filter(c => c.id !== character.id),
            };
          }
          return loc;
        }
      });

      if (!locationExists) {
        // Menambahkan lokasi baru
        setLocations([...updatedLocations, { name: locationName, characters: [character] }]);
        toast.success("Location assigned successfully!");
      } else if (characterReassigned) {
        // Kalau karakter dipindahkan ke lokasi baru
        setLocations(updatedLocations);
        toast.success("Character reassigned to new location!");
      } else {
        // Tambah Lokasi yang ada
        toast.success("Location assigned successfully!");
        setLocations(updatedLocations);
      }

      setLocationName("");
    } else {
      toast.error("Location name cannot be empty!");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error: {error.message}
        </div>
      </div>
    );

  let statusIcon;
  switch (data.character.status) {
    case "Alive":
      statusIcon = aliveIcon;
      break;
    case "Dead":
      statusIcon = deadIcon;
      break;
    default:
      statusIcon = unknownIcon;
  }

  let genderIcon;
  if (data.character.gender === "Male") {
    genderIcon = maleIcon;
  } else if (data.character.gender === "Female") {
    genderIcon = femaleIcon;
  }

  return (
    <div className="container mt-4 mb-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg rounded-lg border-0">
            <div className="d-flex justify-content-center mt-3">
              <img
                src={data.character.image}
                alt={data.character.name}
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "0.5rem" }}
              />
            </div>
            <div className="card-body text-center">
              <h2 className="card-title mb-3">{data.character.name}</h2>
              <div className="d-flex justify-content-center mb-3">
                <div className="d-flex flex-column align-items-center mx-4">
                  <img
                    src={statusIcon}
                    alt={data.character.status}
                    style={{ width: "32px", height: "32px" }}
                    className="mb-2"
                  />
                  <p className="card-text mb-1">
                    <span
                      className={`badge ${
                        data.character.status === "Alive"
                          ? "bg-success"
                          : data.character.status === "Dead"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {data.character.status}
                    </span>
                  </p>
                </div>
                <div className="d-flex flex-column align-items-center mx-4">
                  <img
                    src={genderIcon}
                    alt={data.character.gender}
                    style={{ width: "32px", height: "32px" }}
                    className="mb-2"
                  />
                  <p className="card-text mb-1">{data.character.gender}</p>
                </div>
              </div>
              <p className="card-text mt-3">Origin: {data.character.location.name}</p>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Assign to location"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="form-control mb-3"
                />
                <button
                  onClick={handleAssignLocation}
                  className="btn btn-success w-100"
                >
                  Assign Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
