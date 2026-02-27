export function formatYMD(d: Date): string {
	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseYMD(s: string): Date {
	const [y, m, day] = s.split("-").map(Number);
	return new Date(y, m - 1, day);
}
