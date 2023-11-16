import React, { useRef, useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';



const IsraelMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [dialogText, setDialogText] = useState<string>(''); // הוסף משתנה להצגת טקסט בדיאלוג
  useEffect(() => {
    if (!mapRef.current) return;
    const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({
              attributions: [], // Empty array to remove attributions
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([34.8516, 31.0461]),
          zoom: 7.5,
        }),
        overlays: [
          new Overlay({}),
        ],
        controls: [], // Empty array to remove all default controls
        interactions: defaultInteractions().extend([]),
      });
    const marker1 = new Overlay({
        position: fromLonLat([34.7806, 32.0809]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker1);
    marker1.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים על הסמן
      setDialogText('Tel Aviv electrical store');
    });
    const marker2 = new Overlay({
      position: fromLonLat([35.2137, 31.7683]),
      element: createMarkerElement(),
    });
    map.addOverlay(marker2);
    marker2.getElement()?.addEventListener('click', () => {
      setDialogText('Jerusalem electrical store');
    });
    const marker3 = new Overlay({
        position: fromLonLat([34.9888, 31.7496]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker3);
    marker3.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים על הסמן
      setDialogText('Beit Shemesh electrical store');
    });
    const marker4 = new Overlay({
        position: fromLonLat([34.9896, 32.7940]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker1);
    marker4.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים על הסמן
      setDialogText('Haifa electrical store');
    });
    map.addOverlay(marker4);

    const marker5 = new Overlay({
        position: fromLonLat([ 34.9358, 30.9871]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker5);
    marker5.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים על הסמן
      setDialogText('Yeruham electrical store');
    });
    map.addOverlay(marker5);

    const marker6 = new Overlay({
        position: fromLonLat([34.6452, 31.8044]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker6);
    marker6.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים  הסמן
      setDialogText('Ashdod electrical store');
    });
    map.addOverlay(marker6);


    
    const marker7 = new Overlay({
        position: fromLonLat([34.7933, 31.2518]),
        element: createMarkerElement(),
      });
    map.addOverlay(marker1);
    marker7.getElement()?.addEventListener('click', () => {
      // הצג טקסט בדיאלוג כאשר לוחצים על הסמן
      setDialogText('Beer Sheva electrical store');
    });
    map.addOverlay(marker7);



    return () => {
      map.setTarget('');
    };

  }, []);
  const createMarkerElement = () => {
    const markerElement = document.createElement('div');
    markerElement.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/256/2981/2981011.png" alt="Marker" width="32" height="32" />';
    markerElement.style.position = 'relative';
    markerElement.style.left = '-16px';
    markerElement.style.top = '-32px';
    return markerElement;
  };
  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px' }}>
      <div style={{ display: 'table-row' }}>
        {/* הצג תיבת דיאלוג מותאמת אישית */}
        <div style={{ position: 'absolute', top: '10px', left: '300px',margin:"8px", backgroundColor: 'white', padding: '8px', border: '1px solid black', borderRadius: '4px', display: dialogText ? 'block' : 'none' }}>
          <p >{dialogText}</p>
        </div>
      </div>
    </div>
  );
};
export default IsraelMap;