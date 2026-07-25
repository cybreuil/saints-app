import { fetchApi } from "./client";
import type { Calendar } from "../types/Calendar";

export function getCalendars() {
  return fetchApi<Calendar[]>("/calendars");
}
