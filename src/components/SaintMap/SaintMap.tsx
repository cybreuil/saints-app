import { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";

import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "maplibre-gl/dist/maplibre-gl.css";

import type { Place } from "../../types/Place";
import "./SaintMap.css";

setWorkerUrl(workerUrl);

const ROLE_LABELS: Record<string, string> = {
	birth: "Naissance",
	death: "Mort",
	activity: "Activité",
};

const ROLE_COLORS: Record<string, string> = {
	birth: "#64748b",
	death: "#9f1239",
	activity: "#a16207",
};

const DEFAULT_CENTER = {
	longitude: 10,
	latitude: 48,
};

type SaintMapProps = {
	places: Place[];
};

type PlaceGroup = {
	key: string;
	latitude: number;
	longitude: number;
	places: Place[];
};

function getGroupKey(place: Place): string {
	/*
	 * On arrondit légèrement les coordonnées pour éviter qu'une minuscule
	 * différence flottante empêche deux lieux identiques d'être regroupés.
	 */
	return `${place.latitude.toFixed(5)},${place.longitude.toFixed(5)}`;
}

export function SaintMap({ places }: SaintMapProps) {
	const mapRef = useRef<MapRef>(null);
	const [selectedGroup, setSelectedGroup] = useState<PlaceGroup | null>(null);

	const validPlaces = useMemo(() => {
		return places.filter(
			(place) =>
				Number.isFinite(place.latitude) &&
				Number.isFinite(place.longitude),
		);
	}, [places]);

	const groupedPlaces = useMemo<PlaceGroup[]>(() => {
		const groups: Record<string, PlaceGroup> = {};

		for (const place of validPlaces) {
			const key = getGroupKey(place);

			if (!groups[key]) {
				groups[key] = {
					key,
					latitude: place.latitude,
					longitude: place.longitude,
					places: [],
				};
			}

			groups[key].places.push(place);
		}

		return Object.values(groups);
	}, [validPlaces]);

	useEffect(() => {
		if (!mapRef.current || validPlaces.length === 0) {
			return;
		}

		if (validPlaces.length === 1) {
			mapRef.current.flyTo({
				center: [validPlaces[0].longitude, validPlaces[0].latitude],
				zoom: 7,
				duration: 900,
			});

			return;
		}

		const longitudes = validPlaces.map((place) => place.longitude);
		const latitudes = validPlaces.map((place) => place.latitude);

		const minLng = Math.min(...longitudes);
		const maxLng = Math.max(...longitudes);
		const minLat = Math.min(...latitudes);
		const maxLat = Math.max(...latitudes);

		mapRef.current.fitBounds(
			[
				[minLng, minLat],
				[maxLng, maxLat],
			],
			{
				padding: {
					top: 60,
					right: 60,
					bottom: 60,
					left: 60,
				},
				maxZoom: 8,
				duration: 900,
			},
		);
	}, [validPlaces]);

	if (validPlaces.length === 0) {
		return (
			<div className="saint-map saint-map--empty">
				<span>Aucune localisation disponible.</span>
			</div>
		);
	}

	return (
		<div className="saint-map">
			<Map
				ref={mapRef}
				initialViewState={{
					longitude:
						validPlaces[0]?.longitude ?? DEFAULT_CENTER.longitude,
					latitude:
						validPlaces[0]?.latitude ?? DEFAULT_CENTER.latitude,
					zoom: 4,
				}}
				mapStyle="https://tiles.openfreemap.org/styles/liberty"
				attributionControl
			>
				<NavigationControl
					position="bottom-right"
					showCompass={false}
				/>

				{groupedPlaces.map((group) => {
					const isGrouped = group.places.length > 1;

					return (
						<Marker
							key={group.key}
							longitude={group.longitude}
							latitude={group.latitude}
							anchor="center"
							onClick={(event) => {
								event.originalEvent.stopPropagation();
								setSelectedGroup(group);
							}}
						>
							<button
								type="button"
								className={`saint-map__marker ${
									isGrouped
										? "saint-map__marker--group"
										: `saint-map__marker--${group.places[0].role}`
								}`}
								aria-label={
									isGrouped
										? `${group.places.length} localisations : ${group.places
												.map(
													(place) =>
														ROLE_LABELS[
															place.role
														] ?? place.role,
												)
												.join(", ")}`
										: `${
												ROLE_LABELS[
													group.places[0].role
												] ?? group.places[0].role
											} : ${group.places[0].name}`
								}
							>
								{isGrouped ? (
									<span className="saint-map__marker-group">
										{group.places.map((place) => (
											<i
												key={`${place.role}-${place.code}`}
												style={{
													background:
														ROLE_COLORS[
															place.role
														] ?? "#8b6f47",
												}}
											/>
										))}
									</span>
								) : (
									<span
										className="saint-map__marker-dot"
										style={
											{
												"--marker-color":
													ROLE_COLORS[
														group.places[0].role
													] ?? "#8b6f47",
											} as React.CSSProperties
										}
									/>
								)}
							</button>
						</Marker>
					);
				})}

				{selectedGroup && (
					<Popup
						longitude={selectedGroup.longitude}
						latitude={selectedGroup.latitude}
						anchor="bottom"
						offset={18}
						closeButton
						closeOnClick={false}
						onClose={() => setSelectedGroup(null)}
					>
						<div className="saint-map__popup">
							<div className="saint-map__popup-roles">
								{selectedGroup.places.map((place, index) => {
									const color =
										ROLE_COLORS[place.role] ?? "#8b6f47";

									return (
										<span
											key={`${place.role}-${place.code}`}
											className="saint-map__popup-role"
											style={{ color }}
										>
											{index > 0 && (
												<span className="saint-map__popup-separator">
													·
												</span>
											)}

											{ROLE_LABELS[place.role] ??
												place.role}
										</span>
									);
								})}
							</div>

							<strong className="saint-map__popup-name">
								{selectedGroup.places[0].name}
							</strong>

							<span className="saint-map__popup-country">
								{selectedGroup.places[0].country_code}
							</span>
						</div>
					</Popup>
				)}
			</Map>

			<div className="saint-map__legend" aria-hidden="true">
				{Object.entries(ROLE_LABELS).map(([role, label]) => (
					<span key={role}>
						<i
							style={{
								background: ROLE_COLORS[role] ?? "#8b6f47",
							}}
						/>
						{label}
					</span>
				))}
			</div>
		</div>
	);
}
