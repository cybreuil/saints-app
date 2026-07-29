import type { Calendar } from "../types/Calendar";

export type CalendarOption = Calendar & {
	depth: number;
};

function flattenCalendars(calendars: Calendar[]): CalendarOption[] {
	const map = new Map<string, Calendar[]>();

	calendars.forEach((calendar) => {
		const parent = calendar.parent_code ?? "__root__";

		if (!map.has(parent)) {
			map.set(parent, []);
		}

		map.get(parent)!.push(calendar);
	});

	const result: CalendarOption[] = [];

	function visit(parent: string | null, depth: number) {
		const children = map.get(parent ?? "__root__") ?? [];

		for (const child of children) {
			result.push({
				...child,
				depth,
			});

			visit(child.code, depth + 1);
		}
	}

	visit(null, 0);

	return result;
}

export { flattenCalendars };
