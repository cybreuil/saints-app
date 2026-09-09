import { useMemo } from "react";
import type { LiturgicalSeasonFromCelebration } from "../../types/Celebration";
import { useLanguage } from "../../hooks/useLanguage";
import "./LiturgicalSeason.css";

interface LiturgicalSeasonProps {
	season: LiturgicalSeasonFromCelebration | null;
	/** Date affichée (YYYY-MM-DD), pour situer la progression dans le temps liturgique */
	date: string;
}

const DAY = 86_400_000;

const LiturgicalSeason = ({ season, date }: LiturgicalSeasonProps) => {
	const { t, languageCode } = useLanguage();

	const range = useMemo(() => {
		if (!season?.start || !season?.end) return null;

		const start = new Date(season.start).getTime();
		const end = new Date(season.end).getTime();
		const current = new Date(date).getTime();
		if ([start, end, current].some(Number.isNaN) || end <= start)
			return null;

		const fmt = new Intl.DateTimeFormat(languageCode, {
			day: "numeric",
			month: "short",
		});

		return {
			startLabel: fmt.format(start),
			endLabel: fmt.format(end),
			progress: Math.min(
				1,
				Math.max(0, (current - start) / (end - start)),
			),
			daysLeft: Math.max(0, Math.round((end - current) / DAY)),
		};
	}, [season, date, languageCode]);

	return (
		<section
			className="panel liturgical-season"
			style={
				{
					"--season-color":
						season?.hex_color ?? "var(--color-border-medium)",
				} as React.CSSProperties
			}
		>
			<h3 className="panel__title">{t("liturgical.season")}</h3>

			{!season ? (
				<p className="panel__empty">{t("common.unknown")}</p>
			) : (
				<>
					<p className="liturgical-season__name">{season.label}</p>

					{range && (
						<>
							<div
								className="liturgical-season__bar"
								role="progressbar"
								aria-valuemin={0}
								aria-valuemax={100}
								aria-valuenow={Math.round(range.progress * 100)}
							>
								<span
									style={{
										transform: `scaleX(${range.progress})`,
									}}
								/>
							</div>
							<div className="liturgical-season__range">
								<span>{range.startLabel}</span>
								<span className="liturgical-season__left">
									{range.daysLeft} {t("liturgical.daysLeft")}
								</span>
								<span>{range.endLabel}</span>
							</div>
						</>
					)}
				</>
			)}
		</section>
	);
};

export { LiturgicalSeason };
