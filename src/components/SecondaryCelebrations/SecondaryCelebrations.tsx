import "./SecondaryCelebrations.css";
import type { Celebration } from "../../types/Celebration";
import { Loader } from "../Loader/Loader";
import { useLanguage } from "../../hooks/useLanguage";

type SecondaryCelebrationsProps = {
	secondaryCelebrations: Celebration[] | null;
	isLoading: boolean;
	error: Error | null;
	fallbackColor: string;
};

const SecondaryCelebrations = ({
	secondaryCelebrations,
	isLoading,
	error,
	fallbackColor,
}: SecondaryCelebrationsProps) => {
	const { t } = useLanguage();

	return (
		<section className="panel secondary-celebrations">
			<h3 className="panel__title">
				{t("celebration.otherCelebrations")}
			</h3>

			{isLoading ? (
				<Loader size={32} />
			) : error ? (
				<p className="panel__error">{t("celebration.loadingError")}</p>
			) : !secondaryCelebrations?.length ? (
				<p className="panel__empty">
					{t("celebration.noOtherCelebrations")}
				</p>
			) : (
				<ul className="secondary-celebrations__list">
					{secondaryCelebrations.map((c) => (
						<li key={c.id} className="secondary-celebrations__item">
							<span
								className="secondary-celebrations__dot"
								style={{
									background:
										c.liturgical_color_hex || fallbackColor,
								}}
							/>
							<span className="secondary-celebrations__body">
								<span className="secondary-celebrations__name">
									{c.feast_name}
								</span>
								{c.rank_label && (
									<span className="secondary-celebrations__rank">
										{c.rank_label}
									</span>
								)}
							</span>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export { SecondaryCelebrations };
