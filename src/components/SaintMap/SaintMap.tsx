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

export function SaintMap({ places }: SaintMapProps) {
	const mapRef = useRef<MapRef>(null);
	const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

	const validPlaces = useMemo(
		() =>
			places.filter(
				(place) =>
					Number.isFinite(place.latitude) &&
					Number.isFinite(place.longitude),
			),
		[places],
	);

	useEffect(() => {
		if (!mapRef.current || validPlaces.length === 0) return;

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

				{validPlaces.map((place) => {
					const color = ROLE_COLORS[place.role] ?? "#8b6f47";

					return (
						<Marker
							key={`${place.role}-${place.code}`}
							longitude={place.longitude}
							latitude={place.latitude}
							anchor="center"
							onClick={(event) => {
								event.originalEvent.stopPropagation();
								setSelectedPlace(place);
							}}
						>
							<button
								type="button"
								className={`saint-map__marker saint-map__marker--${place.role}`}
								style={
									{
										"--marker-color": color,
									} as React.CSSProperties
								}
								aria-label={`${ROLE_LABELS[place.role] ?? place.role} : ${place.name}`}
							>
								<span />
							</button>
						</Marker>
					);
				})}

				{selectedPlace && (
					<Popup
						longitude={selectedPlace.longitude}
						latitude={selectedPlace.latitude}
						anchor="bottom"
						offset={18}
						closeButton
						closeOnClick={false}
						onClose={() => setSelectedPlace(null)}
					>
						<div className="saint-map__popup">
							<span className="saint-map__popup-role">
								{ROLE_LABELS[selectedPlace.role] ??
									selectedPlace.role}
							</span>

							<strong className="saint-map__popup-name">
								{selectedPlace.name}
							</strong>

							<span className="saint-map__popup-country">
								{selectedPlace.country_code}
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
