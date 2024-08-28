import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../Queries/CharacterQueries';
import CharacterCard from '../Components/CharacterCard';
import CharacterSearch from '../Components/CharacterSearch';
import { useRecoilState } from 'recoil';
import { pageState, searchQueryState } from '../Recoil/Atoms';

const CharactersList = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page, name: searchQuery },
    skip: !page,
  });

  useEffect(() => {
    refetch();
  }, [page, searchQuery, refetch]);

  if (error) return (
    <div className="container mt-3">
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
      </div>
    </div>
  );

  const totalPages = data?.characters.info.pages || 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const generatePageButtons = () => {
    const buttons = [];
    let range = 0;
    if (page === 1 || page === totalPages) {
      range = 2;
    } else {
      range = 1;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i >= page - range && i <= page + range) {
        buttons.push(
          <li
            key={i}
            className={`page-item ${i === page ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
            style={{ cursor: 'pointer' }}
          >
            <span className="page-link">{i}</span>
          </li>
        );
      } else if (i === page - range - 1 || i === page + range + 1) {
        buttons.push(
          <li key={i} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Characters</h2>
      <CharacterSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="row d-flex justify-content-center">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          data.characters.results.map(character => (
            <div key={character.id} className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-3">
              <CharacterCard character={character} />
            </div>
          ))
        )}
      </div>
      <div className="mt-3 d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li
              className={`page-item ${page === 1 ? 'disabled' : ''}`}
              onClick={() => page > 1 && handlePageChange(1)}
              style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}
            >
              <span className="page-link">&laquo;</span>
            </li>
            <li
              className={`page-item ${page === 1 ? 'disabled' : ''}`}
              onClick={() => page > 1 && handlePageChange(page - 1)}
              style={{ cursor: page === 1 ? 'not-allowed' : 'pointer' }}
            >
              <span className="page-link">‹</span>
            </li>
            {generatePageButtons()}
            <li
              className={`page-item ${page === totalPages ? 'disabled' : ''}`}
              onClick={() => page < totalPages && handlePageChange(page + 1)}
              style={{ cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
            >
              <span className="page-link">›</span>
            </li>
            <li
              className={`page-item ${page === totalPages ? 'disabled' : ''}`}
              onClick={() => page < totalPages && handlePageChange(totalPages)}
              style={{ cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
            >
              <span className="page-link">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CharactersList;
