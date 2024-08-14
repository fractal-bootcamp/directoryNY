import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';

export default function DirectoryMap() {
    const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error('Google Maps API key is not set in the environment variables.');
        return null;
    }

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: 40.71538951197941, lng: -73.94677444686317 }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }
                />
            </APIProvider>
        </div>
    );
}