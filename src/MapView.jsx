
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';

const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const dropIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function MapView({
    pickupPosition = [12.9716, 77.5946],
    dropPosition = [13.0033, 77.5700],
    pickupName = 'Bengaluru',
    dropName = 'Malleswaram',
    onDistanceChange
}) {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [routeError, setRouteError] = useState('');

    const pickupLat = pickupPosition[0];
    const pickupLon = pickupPosition[1];

    const dropLat = dropPosition[0];
    const dropLon = dropPosition[1];

    const getRoute = async () => {
        try {
            setRouteError('');
            const url = `https://router.project-osrm.org/route/v1/driving/${pickupLon},${pickupLat};${dropLon},${dropLat}?overview=full&geometries=geojson`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);


            if (data.code === 'Ok') {
                const coordinates = data.routes[0].geometry.coordinates;

                const leafletCoordinates = coordinates.map((point) => [
                    point[1],
                    point[0]
                ]);

                setRouteCoordinates(leafletCoordinates);
                setDistance(data.routes[0].distance);
                setDuration(data.routes[0].duration);
                onDistanceChange?.(data.routes[0].distance / 1000);
            } else {
                setRouteCoordinates([]);
                setRouteError('Unable to find a route. Please try different locations.');
                console.error('Route not found:', data.code);
            }
        } catch (error) {
            console.error('Unable to fetch route:', error);
            setRouteCoordinates([]);
            setRouteError('Unable to load the route. Check your internet connection and try again.');
        }
    };

    useEffect(() => {
        getRoute();
    }, [pickupPosition, dropPosition]);


    const totalMinutes = Math.round(duration / 60);
    return (
        <>
            <MapContainer
                center={pickupPosition}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
            >
                <FitRoute
                    routeCoordinates={routeCoordinates}
                    pickupPosition={pickupPosition}
                    dropPosition={dropPosition} />
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={pickupPosition} icon={pickupIcon}>
                    <Popup>Pickup: {pickupName}</Popup>
                </Marker>

                <Marker position={dropPosition} icon={dropIcon}>
                    <Popup>Drop: {dropName}</Popup>
                </Marker>

                <Polyline
                    positions={
                        routeCoordinates
                        // routeCoordinates.length > 0
                        //     ? routeCoordinates
                        //     : [pickupPosition, dropPosition]
                    }
                    color="blue"
                    weight={5}
                    opacity={0.8}
                />
            </MapContainer>
            <p>
                Estimated distance: {(distance / 1000).toFixed(2)} Km </p>
            <p> Estimated Time: {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60}min</p>
            {routeError && <p>{routeError}</p>}
        </>
    );
}

function FitRoute({ routeCoordinates, pickupPosition, dropPosition }) {
    const map = useMap();

    useEffect(() => {
        const allPositions =
            routeCoordinates.length > 0
                ? routeCoordinates
                : [pickupPosition, dropPosition];

        map.fitBounds(allPositions, { padding: [40, 40] });
    }, [map, routeCoordinates, pickupPosition, dropPosition]);

    return null;
}

export default MapView;
