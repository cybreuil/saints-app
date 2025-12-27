import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSaintById } from '../services/api';
import './SaintDetail.css';

function SaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saint, setSaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSaintDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchSaintDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSaintById(id);
      setSaint(data);
    } catch (err) {
      setError('Unable to load saint details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="saint-detail">
        <div className="loading">Loading saint details...</div>
      </div>
    );
  }

  if (error || !saint) {
    return (
      <div className="saint-detail">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <div className="error">{error || 'Saint not found'}</div>
      </div>
    );
  }

  return (
    <div className="saint-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="saint-profile">
        <div className="saint-header">
          <h1>{saint.name}</h1>
          {saint.titles && saint.titles.length > 0 && (
            <p className="saint-titles">{saint.titles.join(', ')}</p>
          )}
        </div>

        <div className="saint-info-grid">
          {saint.feast_day && (
            <div className="info-card">
              <h3>Feast Day</h3>
              <p>{saint.feast_day}</p>
            </div>
          )}

          {saint.birth_year && (
            <div className="info-card">
              <h3>Born</h3>
              <p>{saint.birth_year}</p>
            </div>
          )}

          {saint.death_year && (
            <div className="info-card">
              <h3>Died</h3>
              <p>{saint.death_year}</p>
            </div>
          )}

          {saint.birth_place && (
            <div className="info-card">
              <h3>Birth Place</h3>
              <p>{saint.birth_place}</p>
            </div>
          )}

          {saint.patron_of && saint.patron_of.length > 0 && (
            <div className="info-card wide">
              <h3>Patron Of</h3>
              <p>{saint.patron_of.join(', ')}</p>
            </div>
          )}
        </div>

        {saint.description && (
          <div className="saint-biography">
            <h2>Biography</h2>
            <div className="biography-content">
              {saint.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {saint.canonization_date && (
          <div className="additional-info">
            <h3>Canonization</h3>
            <p>{saint.canonization_date}</p>
          </div>
        )}

        {saint.symbols && saint.symbols.length > 0 && (
          <div className="additional-info">
            <h3>Symbols</h3>
            <p>{saint.symbols.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaintDetail;
