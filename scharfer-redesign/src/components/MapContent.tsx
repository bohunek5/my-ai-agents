'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icons
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A custom red icon more similar to Scharfer styling
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const distributors = [
  { id: 1, name: 'SIGMA TORUŃ, NIP 9562212019', lat: 53.029145, lng: 18.607443 },
  { id: 2, name: 'DIRECT IMPORT, NIP 9581660374', lat: 54.450254, lng: 18.387280 },
  { id: 3, name: 'BUDZAP SP. Z O.O., NIP 9462339507', lat: 51.237071, lng: 22.608154 },
  { id: 4, name: 'ELMAR PLUS, NIP 8141533518', lat: 50.243217, lng: 21.782976 }
];

export default function MapContent() {
  return (
    <MapContainer 
      center={[52.0693, 19.4803]} 
      zoom={6} 
      scrollWheelZoom={true} 
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {distributors.map((dist) => (
        <Marker key={dist.id} position={[dist.lat, dist.lng]} icon={redIcon}>
          <Popup>
            <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--c-heading)' }}>{dist.name}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--c-text)' }}>Dystrybutor Scharfer</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
