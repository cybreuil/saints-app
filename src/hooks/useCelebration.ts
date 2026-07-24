import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export type Celebration = {
		id: number;
		is_optional: boolean;
		notes: string;
		observance_type: string;
		default_name: string;
		feast_id: number;
		feast_name: string;
		feast_description: string;
		liturgical_color_name: string;
		liturgical_color_hex: string;
		rank_id: number;
		rank_code: string;
		rank_precedence: number;
		rank_label: string;
		saints: Saint[];
}
export type Saint = {
	saint_id: number;
	saint_slug: string;
	saint_name: string;
	saint_century: string;
	saint_image_url: string;
}

export type CelebrationApiResponse = {
	context: {
		year: number;
		month: number;
		day: number;
		language_code: string;
		calendar_code: string;
	}
	liturgical_season: {
		code: string;
		"segment-index": number;
		label: string;
		start: string;
		end: string;
		color_code: string;
		color_label: string;
		hex_color: string;
	}
	celebrations: Celebration[];
}

const isValidDate = (dateStr: string) => {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
  	if (!regex.test(dateStr)) return false;
   	const d = new Date(dateStr);
    return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === dateStr;
};

export function useCelebration(calendar_code?: string, dateParam?: string) {
  const [celebration, setCelebration] = useState<Celebration | null>(null);
const [liturgicalSeason, setLiturgicalSeason] = useState<CelebrationApiResponse["liturgical_season"] | null>(null);
const [saints, setSaints] = useState<Saint[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
const [context, setContext] = useState<CelebrationApiResponse["context"] | null>(null);

  // derived state (no setState, avoids sync updates inside effects)
  const invalidDate = Boolean(dateParam && !isValidDate(dateParam));

  useEffect(() => {
    // if no calendar or date invalid -> don't start fetch
    if (!calendar_code || invalidDate) {
      // schedule clearing asynchronously to avoid sync setState inside effect body
      Promise.resolve().then(() => {
        setIsLoading(false);
        setError(null);
        setCelebration(null);
      });
      return;
    }

    const controller = new AbortController();
    let active = true;

    const isoDate = dateParam && isValidDate(dateParam)
      ? dateParam
      : new Date().toISOString().slice(0, 10);

    const base = API_URL.replace(/\/$/, "");
    const url = new URL(`${base}/celebrations/by-date`);
    url.search = new URLSearchParams({
      calendar_code,
      year: isoDate.slice(0, 4),
      month: isoDate.slice(5, 7),
      day: isoDate.slice(8, 10),
    }).toString();

    // run fetching in a microtask so setState calls are not synchronous in the effect body
    Promise.resolve().then(async () => {
      if (!active) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url.toString(), { signal: controller.signal });

        if (!active) return;

        if (res.status === 404) {
          setCelebration(null);
          return;
        }

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Erreur API ${res.status} ${res.statusText} - ${text}`);
        }

		  const body = (await res.json()) as CelebrationApiResponse;

		  setCelebration(body?.celebrations?.[0] ?? null);
		  setLiturgicalSeason(body?.liturgical_season ?? null);
		  setSaints(body?.celebrations?.[0].saints ?? null);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError(err);
		  setCelebration(null);
		  setLiturgicalSeason(null);
		  setSaints(null);
		  setContext(null);
      } finally {
        if (active) setIsLoading(false);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [calendar_code, dateParam, invalidDate]);

  return { celebration, isLoading, error, invalidDate, isValidDate, liturgicalSeason, saints, context };
}
