import React, { useEffect } from 'react';
import './App.css';

const CLIENT_ID = 'AIzaSyBWLPQeL_3lvbQF1Aibna2oyUNt7yz2oNg';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${CLIENT_ID}&libraries=maps`;
    script.defer = true;
    script.async = true;

    // Use a boolean flag to track whether the Google Maps script has loaded
    let isGoogleMapsScriptLoaded = false;

    // Define a callback function for the script's onload event
    script.onload = () => {
      isGoogleMapsScriptLoaded = true;
    };

    document.head.appendChild(script);

    // Check for the Google Maps script every 100 milliseconds
    const checkGoogleMapsScript = setInterval(() => {
      if (isGoogleMapsScriptLoaded) {
        clearInterval(checkGoogleMapsScript);
        
        // The Google Maps script has loaded, call the initMap function
        window.initMap = () => {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 49.27964782714844, lng: -122.91876220703125 },
            zoom: 14,
          });

          const marker = new window.google.maps.Marker({
            position: { lat: 49.27964782714844, lng: -122.91876220703125 },
            map: map,
            title: 'My location',
          });
        };

        // Call the initMap function
        window.initMap();
      }
    }, 100);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="map" style={{ height: '400px', width: '100%' }}></div>
      </header>
    </div>
  );
}

export default App;
