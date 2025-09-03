# OpenLayers Map Component

An interactive map section component that uses the OpenLayers library to display maps with markers and popups.

## Features

- Dynamic loading of OpenLayers library (only when component is used)
- Support for multiple markers with custom content
- Popup windows with title, body text, and optional links
- Configurable map center, zoom level, and container dimensions
- Responsive map container
- OpenStreetMap tiles with proper attribution
- Smooth animations and transitions

## Configuration

### Basic Properties

- `latitude`: (number, required) - Map center latitude
- `longitude`: (number, required) - Map center longitude
- `zoom`: (number, default: 10) - Initial zoom level
- `containerId`: (string, default: 'map') - Unique ID for the map container
- `containerHeight`: (number, default: 600) - Height of the map in pixels

### Markers

Each marker in the `markers` array can have:

- `title`: (string) - Marker tooltip text
- `latitude`: (number, required) - Marker latitude
- `longitude`: (number, required) - Marker longitude
- `content`: (object) - Popup content
  - `title`: (string) - Popup heading
  - `body`: (string) - Popup description
  - `link`: (string) - Optional external link URL

## Usage Example

```yaml
- sectionType: openlayers
  containerTag: section
  classes: ''
  id: ''
  description: 'Interactive map with OpenLayers'
  isDisabled: false
  containerFields:
    inContainer: false
    isAnimated: false
    noMargin:
      top: false
      bottom: false
    noPadding:
      top: false
      bottom: false
    background:
      color: ''
      image: ''
      imageScreen: 'none'
  openlayers:
    latitude: 51.509865
    longitude: -0.118092
    zoom: 10
    containerId: 'map'
    containerHeight: 600
    markers:
      - title: London
        latitude: 51.509865
        longitude: -0.118092
        content:
          title: 'London'
          body: 'London is a political, historical, cultural, and tourist center...'
          link: 'https://en.wikipedia.org/wiki/London'
```

## Dependencies

This component dynamically loads:
- OpenLayers CSS v10.3.0 from jsDelivr CDN
- OpenLayers JS v10.3.0 from jsDelivr CDN

The scripts and styles are only loaded once, even if multiple maps are present on the same page.

## Differences from Leaflet Component

While similar in functionality to the Leaflet component, OpenLayers offers:
- More advanced vector capabilities
- Better support for custom projections
- More extensive API for complex mapping applications
- Built-in support for various map formats (GeoJSON, KML, etc.)
- More customization options for controls and interactions

## Notes

- The component uses OpenStreetMap tiles by default
- Map containers must have a unique ID if multiple maps are on the same page
- The component includes proper attribution for OpenStreetMap
- Popups are styled with a clean, modern appearance
- All external links open in new tabs with proper security attributes
- The marker icon uses the default OpenLayers icon but can be customized