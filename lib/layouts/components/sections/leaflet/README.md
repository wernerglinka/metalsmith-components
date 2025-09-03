# Leaflet Map Component

An interactive map section component that uses the Leaflet library to display maps with markers and popups.

## Features

- Dynamic loading of Leaflet library (only when component is used)
- Support for multiple markers with custom content
- Popup windows with title, body text, and optional links
- Configurable map center, zoom level, and container dimensions
- Responsive map container
- OpenStreetMap tiles with proper attribution

## Configuration

### Basic Properties

- `latitute`: (number, required) - Map center latitude
- `longitude`: (number, required) - Map center longitude
- `zoom`: (number, default: 10) - Initial zoom level
- `containerId`: (string, default: 'map') - Unique ID for the map container
- `containerHeight`: (number, default: 600) - Height of the map in pixels

### Markers

Each marker in the `markers` array can have:

- `title`: (string) - Marker tooltip text
- `latitute`: (number, required) - Marker latitude
- `longitude`: (number, required) - Marker longitude
- `content`: (object) - Popup content
  - `title`: (string) - Popup heading
  - `body`: (string) - Popup description
  - `link`: (string) - Optional external link URL

## Usage Example

```yaml
- container: 'section'
  name: 'leaflet'
  containerFields:
    isDisabled: false
    isAnimated: false
    containerId: ''
    containerClass: ''
    inContainer: false
    isNarrow: false
    background:
      color: ''
      image: ''
      isDark: false
  leaflet:
    latitute: 51.509865
    longitude: -0.118092
    zoom: 10
    containerId: 'map'
    containerHeight: 600
    markers:
      - title: London
        latitute: 51.509865
        longitude: -0.118092
        content:
          title: 'London'
          body: 'London is a political, historical, cultural, and tourist center...'
          link: 'https://en.wikipedia.org/wiki/London'
```

## Dependencies

This component dynamically loads:
- Leaflet CSS v1.9.4 from unpkg CDN
- Leaflet JS v1.9.4 from unpkg CDN

The scripts and styles are only loaded once, even if multiple maps are present on the same page.

## Notes

- The component uses OpenStreetMap tiles by default
- Map containers must have a unique ID if multiple maps are on the same page
- The component includes proper attribution for OpenStreetMap
- Popup tips are hidden via CSS for a cleaner appearance
- All external links open in new tabs with proper security attributes