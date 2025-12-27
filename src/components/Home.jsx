import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSaintOfDay } from '../services/api';
import { formatDisplayDate } from '../utils/dateUtils';
import './Home.css';

function Home() {
  const [saint, setSaint] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSaintOfDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const fetchSaintOfDay = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSaintOfDay(formatDate(currentDate));
      setSaint(data);
    } catch (err) {
      setError('Unable to load saint data. Please make sure the saints-api is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const navigateDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const viewSaintDetails = (saintId) => {
    navigate(`/saint/${saintId}`);
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading saint of the day...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="date-navigation">
        <button onClick={() => navigateDate(-1)} className="nav-button">
          ← Previous Day
        </button>
        <div className="current-date">
          <h2>{formatDisplayDate(currentDate)}</h2>
          {currentDate.toDateString() !== new Date().toDateString() && (
            <button onClick={goToToday} className="today-button">
              Today
            </button>
          )}
        </div>
        <button onClick={() => navigateDate(1)} className="nav-button">
          Next Day →
        </button>
      </div>

      <div className="saint-of-day">
        {saint ? (
          <>
            <h1>{saint.name || 'No Saint Listed'}</h1>
            {saint.titles && saint.titles.length > 0 && (
              <p className="saint-titles">{saint.titles.join(', ')}</p>
            )}
            {saint.description && (
              <div className="saint-description">
                <p>{saint.description}</p>
              </div>
            )}
            {saint.birth_year && (
              <p className="saint-dates">
                Born: {saint.birth_year}
                {saint.death_year && ` - Died: ${saint.death_year}`}
              </p>
            )}
            {saint.feast_day && (
              <p className="feast-day">Feast Day: {saint.feast_day}</p>
            )}
            {saint.id && (
              <button 
                onClick={() => viewSaintDetails(saint.id)}
                className="details-button"
              >
                View Full Profile
              </button>
            )}
          </>
        ) : (
          <div className="no-saint">
            <h1>No Saint Listed</h1>
            <p>There is no saint celebration recorded for this day.</p>
          </div>
        )}
      </div>

      <div className="calendar-link">
        <button onClick={() => navigate('/calendar')} className="calendar-button">
          View Full Calendar
        </button>
      </div>
    </div>
  );
}

export default Home;
