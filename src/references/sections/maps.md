---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Maps

navigation:
  navLabel: 'Maps'
  navIndex: 4

card:
  title: 'Maps'
  description: 'Map component supporting Leaflet and OpenLayers providers with dynamic library loading, custom SVG markers, and popup interactions.'
  image: '/assets/images/sample11.jpg'
  tags: ['maps', 'location', 'leaflet', 'openlayers', 'markers', 'interactive', 'geolocation']

seo:
  title: Map Component - Interactive Maps with Leaflet and OpenLayers for Metalsmith
  description: 'Maps component supporting Leaflet and OpenLayers providers with dynamic library loading, custom SVG markers, and popup interactions for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith maps, leaflet maps, openlayers maps, interactive maps, custom markers, maps component, map integration'

sections:
  - sectionType: text-only
    containerTag: article
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Maps'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A maps component that supports Leaflet and OpenLayers providers with clean separation between UI configuration and map data. Uses external JSON files for map content, making it ideal for complex maps with many markers while keeping page frontmatter minimal.'

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Leaflet'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        **Choose Leaflet when you need:**
        - Smaller file size (lighter weight at ~145KB)
        - Simpler API for basic mapping needs
        - Faster initial load time
        - Large plugin ecosystem
        - Mobile-first design with touch interactions
        - Better performance on older devices

  - sectionType: maps
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Leaflet Example'
      title: 'Interactive London Landmarks'
      titleTag: 'h2'
      subTitle: 'Discover famous locations across the city'
      prose: This Leaflet-powered map showcases London's most iconic landmarks with interactive markers. Each location features detailed popup information and external links for further exploration. The lightweight Leaflet library provides smooth navigation and responsive touch controls, making it perfect for mobile-first experiences.
    ctas:
      - url: 'https://leafletjs.com'
        label: 'Learn More About Leaflet'
        isButton: true
        buttonStyle: 'primary'
    mapProvider: 'leaflet'
    mapData: 'london-landmarks'
    height: '300px'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'OpenLayers'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        **Choose OpenLayers when you need:**
        - Advanced vector capabilities and data visualization
        - Support for various data formats (GeoJSON, KML, GPX, WMS)
        - Custom map projections and coordinate systems
        - Complex interactions and custom controls
        - Better performance with large datasets
        - Enterprise-grade mapping features

  - sectionType: maps
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'OpenLayers Example'
      title: 'Exploring Parisian Monuments'
      titleTag: 'h2'
      subTitle: 'Advanced mapping with powerful vector capabilities'
      prose: This OpenLayers-powered map demonstrates the library's robust feature set with detailed Parisian landmarks. OpenLayers excels at handling complex data visualizations and provides enterprise-grade mapping capabilities. The powerful vector rendering engine ensures smooth performance even with large datasets and complex geographic features.
    ctas:
      - url: 'https://openlayers.org'
        label: 'Learn More About OpenLayers'
        isButton: true
        buttonStyle: 'secondary'
    mapProvider: 'openlayers'
    mapData: 'paris-monuments'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Marker Configuration'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        Each marker in the JSON data file's markers array includes:

        ```json
        {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "title": "Location Name",
          "icon": "star",
          "content": {
            "title": "Popup Heading",
            "body": "Description text for the popup",
            "link": "https://example.com"
          }
        }
        ```

        **Marker Properties:**
        - `latitude`/`longitude`: Marker position coordinates (required)
        - `title`: Tooltip text displayed on hover
        - `icon`: Optional icon name from the built-in icon registry
        - `content`: Popup content object
          - `title`: Popup heading text
          - `body`: Description or details
          - `link`: Optional external URL for "Read more" functionality

        ### Available Icons for Markers

        The maps component includes a built-in icon registry with commonly used marker icons:
        - `map-pin`: Default location marker
        - `home`: House/residence marker
        - `camera`: Photo location marker
        - `coffee`: Cafe/restaurant marker
        - `briefcase`: Business/office marker
        - `shopping-bag`: Shopping/retail marker
        - `star`: Featured/important location
        - `heart`: Favorite/loved location
        - `calendar`: Event location marker
        - `clock`: Time-sensitive location
        - `music`: Entertainment venue marker
        - `phone`: Contact/service location

        If no icon is specified, the default red location pin marker is used.

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Performance & Implementation'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        **JSON Data Architecture**: Map content is stored in external JSON files in `/lib/data/maps/`, keeping page frontmatter clean while supporting complex datasets with many markers.

        **Dynamic Loading**: The component loads the appropriate mapping library (Leaflet v1.9.4 or OpenLayers v10.3.0) from CDN only when needed. This keeps your initial bundle size small.

        **Provider Switching**: You can easily switch between Leaflet and OpenLayers by changing just the `mapProvider` field. The same JSON data file works with both providers.

        **Data Reusability**: The same JSON data file can be referenced by multiple pages, making it easy to maintain consistent map content across your site.

        **Build-time Icon Registry**: Icons are automatically scanned from JSON files and included in the build only when used, optimizing bundle size.

        **Multiple Maps**: You can have multiple maps on the same page using different providers and different JSON data files. Each map maintains its own state and configuration.

        **Consistent SVG Markers**: Both providers use the same custom SVG marker design for visual consistency across all maps.

        **Responsive Design**: Maps automatically adapt to their container width and include mobile-optimized touch interactions.

        **Accessibility**: Markers include proper title attributes for screen readers, and all external links include appropriate security attributes.

  - sectionType: maps
    containerTag: section
    classes: ''
    id: 'clustering-demo'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Advanced Feature'
      title: 'Marker Clustering'
      titleTag: 'h2'
      subTitle: 'Handle Large Datasets'
      prose: 'When displaying many markers, clustering groups nearby markers together to improve performance and visual clarity. Click clusters to zoom in and expand them.'
      isCentered: false
    mapProvider: 'openlayers'
    mapData: 'nyc-clustering-demo'
    ctas:
      - url: 'https://leafletjs.com/reference.html'
        label: 'Learn About Clustering'
        isButton: true
        buttonStyle: 'secondary'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Clustering Configuration'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        For maps with many markers, clustering groups nearby markers together to improve performance and reduce visual clutter. Clustering works with both Leaflet and OpenLayers providers.

        **Clustering Properties:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `enabled` | boolean | false | Enable/disable clustering |
        | `maxZoom` | number | 15 | Zoom level beyond which clustering is disabled |
        | `radius` | number | 50 | Cluster radius in pixels for grouping markers |
        | `minClusterSize` | number | 2 | Minimum markers required to form a cluster |
        | `style.backgroundColor` | string | '#4285f4' | Cluster background color |
        | `style.textColor` | string | '#ffffff' | Text color for marker count |
        | `style.borderColor` | string | '#1976d2' | Cluster border color |
        | `style.borderWidth` | number | 2 | Border width in pixels |

        **Clustering Code Example:**

        Page frontmatter:
        ```yaml
        - sectionType: maps
          mapProvider: 'openlayers'
          mapData: 'nyc-clustering-demo'
        ```

        JSON data file (`lib/data/maps/nyc-clustering-demo.json`):
        ```json
        {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "zoom": 8,
          "clustering": {
            "enabled": true,
            "maxZoom": 15,
            "radius": 60,
            "minClusterSize": 2,
            "style": {
              "backgroundColor": "#e74c3c",
              "textColor": "#ffffff",
              "borderColor": "#c0392b",
              "borderWidth": 2
            }
          },
          "markers": [
            {
              "latitude": 40.7128,
              "longitude": -74.0060,
              "title": "Manhattan",
              "icon": "star",
              "content": {
                "title": "Manhattan",
                "body": "The heart of New York City"
              }
            }
          ]
        }
        ```

        When clustering is enabled, markers within the specified radius are grouped together and displayed as numbered cluster markers. Clicking a cluster will zoom in to reveal individual markers, or expand the cluster if at maximum zoom level.

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: maps
          containerTag: section

          mapProvider: 'leaflet' # 'leaflet' or 'openlayers'
          mapData: 'london-landmarks' # references lib/data/maps/london-landmarks.json
          height: '500px' # optional custom height (defaults to 400px)

          text:
            leadIn: 'Interactive Mapping'
            title: Explore London Landmarks
            titleTag: 'h2'
            subTitle: 'Discover famous locations across the city'
            prose: Interactive maps provide engaging ways to showcase locations, whether for business directories, travel guides, or event venues...
          ctas:
            - url: 'https://leafletjs.com'
              label: 'Learn More'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Notes

        - Dynamic library loading, custom SVG markers, interactive popups, marker clustering
        - Responsive design across all devices with accessibility features for screen readers
        - Multiple maps per page with independent configurations and provider selection
        - All text fields and CTAs are optional
        - Maps automatically adapt to container dimensions

        **Page Frontmatter (UI Configuration):**

        | Property | Type | Description |
        |----------|------|-------------|
        | `mapProvider` | string | Map library to use ('leaflet' or 'openlayers') |
        | `mapData` | string | Reference to JSON file in lib/data/maps/ (e.g., 'london-landmarks') |
        | `height` | string | Optional custom map height (e.g., '500px', '50vh') - defaults to 400px |
        | `text` | object | Standard text block with leadIn, title, subtitle, and prose |
        | `ctas` | array | Array of call-to-action buttons or links |

        **JSON Data File (Map Content):**

        | Property | Type | Description |
        |----------|------|-------------|
        | `latitude`/`longitude` | number | Map center coordinates |
        | `zoom` | number | Initial zoom level |
        | `clustering` | object | Optional clustering configuration object |
        | `markers` | array | Array of marker objects with coordinates and popup content |

        ### JSON Data Structure

        Map data is stored in `/lib/data/maps/{mapData}.json` files with the following structure:

        ```json
        {
          "latitude": 51.509865,
          "longitude": -0.118092,
          "zoom": 10,
          "clustering": {
            "enabled": true,
            "maxZoom": 15,
            "radius": 50,
            "minClusterSize": 2,
            "style": {
              "backgroundColor": "#4285f4",
              "textColor": "#ffffff",
              "borderColor": "#1976d2",
              "borderWidth": 2
            }
          },
          "markers": [
            {
              "latitude": 51.509865,
              "longitude": -0.118092,
              "title": "London",
              "icon": "star",
              "content": {
                "title": "London",
                "body": "Description text...",
                "link": "https://example.com"
              }
            }
          ]
        }
        ```

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'maps'
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Download Maps Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete maps component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/maps.zip'
        label: 'Download Maps Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
