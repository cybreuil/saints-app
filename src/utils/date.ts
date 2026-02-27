function pad(n: number) {
	return n.toString().padStart(2, "0");
}

// Format Date -> nous donne une string "YYYY-MM-DD" en LOCAL !!
// Permet d'éviter les problèmes de timezone qui peuvent survenir avec toISOString() ou new Date("YYYY-MM-DD") qui sont basés sur UTC.
export function formatYMD(d: Date): string {
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Parse "YYYY-MM-DD" as local date (midnight local)
// Note: new Date("YYYY-MM-DD") is parsed as UTC, which can cause off-by-one-day issues depending on timezone. So we parse manually.
// Nous renvoie une date locale correspondant à la date indiquée, sans décalage de timezone. Par exemple, "2024-06-15" sera toujours interprété comme le 15 juin 2024 à minuit local, même si l'utilisateur est dans un fuseau horaire différent.
export function parseYMD(s: string): Date {
	const [y, m, day] = s.split("-").map(Number);
	return new Date(y, m - 1, day);
}

// Nous renvoie le string du jour LOCAL au format "YYYY-MM-DD". Par exemple, si aujourd'hui est le 15 juin 2024, cette fonction retournera "2024-06-15", même si l'utilisateur est dans un fuseau horaire différent.
export function getTodayStr(): string {
	return formatYMD(new Date());
}
// Nous renvoie la date du jour à minuit local, sans composant temporel. Par exemple, si aujourd'hui est le 15 juin 2024, cette fonction retournera une Date représentant le 15 juin 2024 à 00:00:00 local.
export function getToday(): Date {
	const today = parseYMD(formatYMD(new Date()));
	return today;
}
