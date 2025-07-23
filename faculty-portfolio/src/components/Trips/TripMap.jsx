import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
// import '../../assets/leaflet.css';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './TripMap.css';

// Fix default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = new Icon({
    // iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [17, 22],
});

function FitBounds({ trips }) {
    const map = useMap();

    useEffect(() => {
        if (!trips.length) return;

        const bounds = trips
            .filter(trip => trip.coordinates?.latitude && trip.coordinates?.longitude)
            .map(trip => [trip.coordinates.latitude, trip.coordinates.longitude]);

        if (bounds.length) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [trips, map]);

    return null;
}

function TripMap({ trips }) {
    const center = [20.5937, 78.9629]; // Default center: India
    return (
        <div className="tripMapBox">
            <h3 className="headingTrips">Trips on Map</h3>

            {trips.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No trips to show yet! 🌏 Add some!
                </p>
            ) : (
                <MapContainer center={center} zoom={2} scrollWheelZoom={true} className="trip-map">
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        // url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <FitBounds trips={trips} />
                    {trips.map((trip, index) => (
                        trip.coordinates?.latitude && trip.coordinates?.longitude && (
                            <Marker
                                key={index}
                                position={[trip.coordinates.latitude, trip.coordinates.longitude]}
                                icon={customIcon}
                            >
                                <Popup>
                                    <strong>{trip.location}</strong><br />
                                    {trip.year} - {trip.purpose}
                                </Popup>
                            </Marker>
                        )
                    ))}
                </MapContainer>
            )}
        </div>
    );

}

export default TripMap;
