/**
 * OpenLayers Map Provider
 */

import { loadScript } from '../helpers/load-script.js';
import { loadStylesheet } from '../helpers/load-styles.js';
import { svgMarker, validateMapData, createPopupContent } from '../helpers/mapping-utils.js';

/**
 * Initialize OpenLayers library
 * @returns {Promise} Resolves when OpenLayers is loaded
 */
const loadOpenLayers = () => {
  loadStylesheet('https://cdn.jsdelivr.net/npm/ol@v10.3.0/ol.css');
  
  return loadScript(
    'https://cdn.jsdelivr.net/npm/ol@v10.3.0/dist/ol.js',
    'ol'
  );
};

/**
 * Create OpenLayers map instance
 * @param {HTMLElement} mapContainer - Map container element
 * @returns {Object|null} Map instance or null if creation failed
 */
export const createOpenLayersMap = async (mapContainer) => {
  const mapData = validateMapData(mapContainer);
  if (!mapData) {
    return null;
  }

  const { mapId, latitude, longitude, zoom, markers } = mapData;

  // Load OpenLayers if not already loaded
  await loadOpenLayers();

  // Create the map
  const map = new ol.Map({
    target: mapId,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: zoom
    })
  });

  // Create marker features
  const markerFeatures = [];
  
  markers.forEach((marker) => {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([marker.longitude, marker.latitude])
      ),
      title: marker.title,
      content: marker.content
    });
    markerFeatures.push(feature);
  });

  // Create vector source and layer for markers
  const vectorSource = new ol.source.Vector({
    features: markerFeatures
  });

  // Create SVG icon style
  const svgIcon = new ol.style.Icon({
    anchor: [0.5, 1],
    src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarker),
    scale: 1
  });

  const iconStyle = new ol.style.Style({
    image: svgIcon
  });

  const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  });

  map.addLayer(vectorLayer);

  // Create popup overlay
  const popupElement = document.createElement('div');
  popupElement.className = 'ol-popup';
  popupElement.innerHTML = `
    <a href="#" class="ol-popup-closer"></a>
    <div class="ol-popup-content"></div>
  `;
  document.body.appendChild(popupElement);

  const popup = new ol.Overlay({
    element: popupElement,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
  map.addOverlay(popup);

  // Close button handler
  const closer = popupElement.querySelector('.ol-popup-closer');
  closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
  };

  // Click handler for markers
  map.on('click', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      const content = feature.get('content');
      const contentElement = popupElement.querySelector('.ol-popup-content');
      
      if (content) {
        const popupHTML = createPopupContent(content);
        contentElement.innerHTML = popupHTML;
        popup.setPosition(coordinates);
      }
    } else {
      popup.setPosition(undefined);
    }
  });

  // Change cursor on hover
  map.on('pointermove', function (evt) {
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    const target = map.getTargetElement();
    if (target) {
      target.style.cursor = hit ? 'pointer' : '';
    }
  });

  return {
    element: mapContainer,
    map: map,
    markers: markers.length
  };
};

/**
 * Initialize all OpenLayers maps
 * @returns {Promise<Array>} Array of map instances
 */
export const initOpenLayersMaps = async () => {
  const mapContainers = document.querySelectorAll('.js-openlayers-map');
  const instances = [];

  for (const container of mapContainers) {
    const instance = await createOpenLayersMap(container);
    if (instance) {
      instances.push(instance);
    }
  }

  return instances;
};