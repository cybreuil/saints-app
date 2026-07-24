const API_URL = import.meta.env.VITE_API_URL || "localhost:8080";

export async function getCalendars() {
	const response = await fetch(`${API_URL}/calendars`);
	if (!response.ok) {
		throw new Error(`Erreur API ${response.status} ${response.statusText}`);
	}
	return response.json();
}
