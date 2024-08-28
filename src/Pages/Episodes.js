import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from '../Queries/EpisodeQueries';
import EpisodeCard from '../Components/EpisodeCard';

const fetchEpisodesFromPages = async (pages, refetch) => {
  const results = [];
  for (const page of pages) {
    try {
      const { data } = await refetch({ page });
      results.push(...data.episodes.results);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }
  return results;
};

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const { loading, error, refetch } = useQuery(GET_EPISODES, { skip: true });

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        if (refetch) {
          setLoadingEpisodes(true);
          const allEpisodes = await fetchEpisodesFromPages([1, 2, 3], refetch);
          setEpisodes(allEpisodes);
        }
      } catch (err) {
        console.error('Error fetching episodes:', err);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [refetch]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-3">
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
      </div>
    </div>
  );

  return (
    <div className="container mt-3">
      <h2>Episodes</h2>
      {loadingEpisodes ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div className="row">
          {episodes.length > 0 ? (
            episodes.map(episode => (
              <div className="col-md-4 mb-4" key={episode.id}>
                <EpisodeCard episode={episode} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center">
                  <p className="card-text">No episodes found</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Episodes;
