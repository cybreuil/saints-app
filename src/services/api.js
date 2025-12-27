// API service for interacting with saints-api backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * Fetch saint of the day
 */
export const getSaintOfDay = async (date = null) => {
  try {
    const dateParam = date ? `?date=${date}` : '';
    const response = await fetch(`${API_BASE_URL}/saints/today${dateParam}`);
    if (!response.ok) {
      throw new Error('Failed to fetch saint of the day');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching saint of the day:', error);
    throw error;
  }
};

/**
 * Fetch all saints for a specific date
 */
export const getSaintsByDate = async (month, day) => {
  try {
    const response = await fetch(`${API_BASE_URL}/saints/date/${month}/${day}`);
    if (!response.ok) {
      throw new Error('Failed to fetch saints by date');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching saints by date:', error);
    throw error;
  }
};

/**
 * Fetch saint details by ID
 */
export const getSaintById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/saints/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch saint details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching saint details:', error);
    throw error;
  }
};

/**
 * Search for saints by name
 */
export const searchSaints = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/saints/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search saints');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching saints:', error);
    throw error;
  }
};

/**
 * Fetch calendar for a specific month
 */
export const getCalendarMonth = async (year, month) => {
  try {
    const response = await fetch(`${API_BASE_URL}/calendar/${year}/${month}`);
    if (!response.ok) {
      throw new Error('Failed to fetch calendar');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching calendar:', error);
    throw error;
  }
};
