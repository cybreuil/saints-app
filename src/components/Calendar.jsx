import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSaintsByDate } from '../services/api';
import { getCurrentDateParts, getMonthName } from '../utils/dateUtils';
import './Calendar.css';

function Calendar() {
  const [year, setYear] = useState(getCurrentDateParts().year);
  const [month, setMonth] = useState(getCurrentDateParts().month);
  const [selectedDay, setSelectedDay] = useState(null);
  const [saints, setSaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  useEffect(() => {
    if (selectedDay) {
      fetchSaintsForDay(selectedDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, month, year]);

  const fetchSaintsForDay = async (day) => {
    setLoading(true);
    try {
      const data = await getSaintsByDate(month, day);
      setSaints(Array.isArray(data) ? data : (data ? [data] : []));
    } catch (err) {
      console.error('Error fetching saints:', err);
      setSaints([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const navigateMonth = (direction) => {
    let newMonth = month + direction;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setMonth(newMonth);
    setYear(newYear);
    setSelectedDay(null);
    setSaints([]);
  };

  const goToToday = () => {
    const today = getCurrentDateParts();
    setYear(today.year);
    setMonth(today.month);
    setSelectedDay(today.day);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalSlots = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday =
        dayNumber === getCurrentDateParts().day &&
        month === getCurrentDateParts().month &&
        year === getCurrentDateParts().year;
      const isSelected = dayNumber === selectedDay;

      days.push(
        <div
          key={i}
          className={`calendar-day ${isValidDay ? 'valid' : 'empty'} ${
            isToday ? 'today' : ''
          } ${isSelected ? 'selected' : ''}`}
          onClick={() => isValidDay && handleDayClick(dayNumber)}
        >
          {isValidDay ? dayNumber : ''}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <h1>Saints Calendar</h1>
      </div>

      <div className="calendar-navigation">
        <button onClick={() => navigateMonth(-1)} className="month-nav-button">
          ← Previous
        </button>
        <div className="current-month">
          <h2>
            {getMonthName(month)} {year}
          </h2>
          <button onClick={goToToday} className="today-button">
            Today
          </button>
        </div>
        <button onClick={() => navigateMonth(1)} className="month-nav-button">
          Next →
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-weekdays">
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
        </div>
        <div className="calendar-grid">{renderCalendarDays()}</div>
      </div>

      {selectedDay && (
        <div className="saints-for-day">
          <h3>
            Saints for {getMonthName(month)} {selectedDay}
          </h3>
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : saints.length > 0 ? (
            <div className="saints-list">
              {saints.map((saint, index) => (
                <div key={saint.id || index} className="saint-card">
                  <h4>{saint.name}</h4>
                  {saint.titles && saint.titles.length > 0 && (
                    <p className="saint-titles-small">
                      {saint.titles.join(', ')}
                    </p>
                  )}
                  {saint.description && (
                    <p className="saint-description-small">
                      {saint.description.substring(0, 150)}
                      {saint.description.length > 150 ? '...' : ''}
                    </p>
                  )}
                  {saint.id && (
                    <button
                      onClick={() => navigate(`/saint/${saint.id}`)}
                      className="view-details-button"
                    >
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-saints-text">No saints listed for this day.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;
