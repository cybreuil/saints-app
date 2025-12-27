import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSaints } from '../services/api';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await searchSaints(query);
      setResults(Array.isArray(data) ? data : (data ? [data] : []));
    } catch (err) {
      console.error('Error searching saints:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setResults([]);
      setSearched(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <h1>Search Saints</h1>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter saint name..."
          className="search-input"
        />
        <button type="submit" disabled={!query.trim() || loading} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="loading-message">Searching for saints...</div>
      )}

      {!loading && searched && (
        <div className="search-results">
          {results.length > 0 ? (
            <>
              <h2>Found {results.length} saint{results.length !== 1 ? 's' : ''}</h2>
              <div className="results-grid">
                {results.map((saint, index) => (
                  <div key={saint.id || index} className="result-card">
                    <h3>{saint.name}</h3>
                    {saint.titles && saint.titles.length > 0 && (
                      <p className="result-titles">{saint.titles.join(', ')}</p>
                    )}
                    {saint.feast_day && (
                      <p className="result-feast-day">
                        Feast Day: {saint.feast_day}
                      </p>
                    )}
                    {saint.description && (
                      <p className="result-description">
                        {saint.description.substring(0, 120)}
                        {saint.description.length > 120 ? '...' : ''}
                      </p>
                    )}
                    {saint.id && (
                      <button
                        onClick={() => navigate(`/saint/${saint.id}`)}
                        className="view-button"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <h2>No saints found</h2>
              <p>Try searching with a different name or spelling.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
