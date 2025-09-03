---
layout: pages/sections.njk
bodyClasses: 'sections-page'

navigation:
  navLabel: 'OpenLayers Map'
  navIndex: 16

seo:
  title: OpenLayers Map Section Component - Advanced Interactive Maps for Metalsmith
  description: 'Add powerful interactive maps to your Metalsmith site with the OpenLayers component. Features vector capabilities, multiple markers with popups, and extensive customization options.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith openlayers map, interactive map component, vector maps, map with markers, advanced mapping, map popups'

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'Introduction to the OpenLayers Map component'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      isNarrow: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Metalsmith Components Library'
      title: 'OpenLayers Map Component'
      titleTag: 'h1'
      subTitle: 'Advanced interactive maps with powerful features'
      prose: |
        The OpenLayers Map component provides a powerful alternative to Leaflet for adding interactive maps to your Metalsmith site. OpenLayers offers more advanced features including better vector support, custom projections, and extensive API capabilities. Like the Leaflet component, it dynamically loads the library only when needed for optimal performance.

        This component is perfect for complex mapping requirements, data visualization, or when you need advanced features like custom projections, vector tiles, or integration with various geographic data formats.

  - sectionType: openlayers
    containerTag: section
    classes: ''
    id: 'demo-map-paris'
    description: 'Example of an OpenLayers map focused on Paris with multiple markers'
    isDisabled: false
    containerFields:
      inContainer: false
      isAnimated: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: '#f5f5f5'
        image: ''
        imageScreen: 'none'
    openlayers:
      latitude: 48.8566
      longitude: 2.3522
      zoom: 11
      containerId: 'paris-map'
      containerHeight: 600
      markers:
        - title: Eiffel Tower
          latitude: 48.8584
          longitude: 2.2945
          content:
            title: 'Eiffel Tower'
            body: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.'
            link: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
        - title: Louvre Museum
          latitude: 48.8606
          longitude: 2.3376
          content:
            title: 'Louvre Museum'
            body: 'The Louvre is the world''s most-visited museum, and a historic landmark in Paris. It is the home of some of the best-known works of art, including the Mona Lisa.'
            link: 'https://en.wikipedia.org/wiki/Louvre'
        - title: Arc de Triomphe
          latitude: 48.8738
          longitude: 2.2950
          content:
            title: 'Arc de Triomphe'
            body: 'The Arc de Triomphe is one of the most famous monuments in Paris. It honors those who fought and died for France in the French Revolutionary and Napoleonic Wars.'
            link: 'https://en.wikipedia.org/wiki/Arc_de_Triomphe'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Configuration options for the OpenLayers component'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      isNarrow: true
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
      title: 'Configuration Options'
      titleTag: 'h2'
      prose: |
        ### Map Properties
        
        - **latitude** (required): Center point latitude for the map
        - **longitude** (required): Center point longitude for the map
        - **zoom**: Initial zoom level (default: 10)
        - **containerId**: Unique ID for the map container (default: 'map')
        - **containerHeight**: Height in pixels (default: 600)
        
        ### Marker Configuration
        
        Each marker in the markers array can include:
        
        - **title**: Tooltip text shown on hover
        - **latitude** & **longitude**: Marker position (required)
        - **content**: Popup content object
          - **title**: Popup heading
          - **body**: Description text
          - **link**: Optional URL for "Read more" link
        
        ### Advanced Features
        
        OpenLayers provides additional capabilities over basic mapping libraries:
        - Advanced vector data support
        - Custom map projections
        - Support for various data formats (GeoJSON, KML, GPX)
        - Extensive control customization
        - Better performance with large datasets
        - Built-in measuring tools and drawing capabilities

  - sectionType: openlayers
    containerTag: section
    classes: ''
    id: 'demo-map-tokyo'
    description: 'Example of an OpenLayers map showing Tokyo locations'
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
        color: '#ffffff'
        image: ''
        imageScreen: 'none'
    openlayers:
      latitude: 35.6762
      longitude: 139.6503
      zoom: 10
      containerId: 'tokyo-map'
      containerHeight: 500
      markers:
        - title: Tokyo Tower
          latitude: 35.6586
          longitude: 139.7454
          content:
            title: 'Tokyo Tower'
            body: 'Tokyo Tower is a communications and observation tower in the Shiba-koen district of Minato, Tokyo. At 332.9 meters, it is the second-tallest structure in Japan.'
        - title: Senso-ji Temple
          latitude: 35.7148
          longitude: 139.7967
          content:
            title: 'Senso-ji Temple'
            body: 'Senso-ji is an ancient Buddhist temple located in Asakusa, Tokyo. It is Tokyo''s oldest temple and one of its most significant.'
        - title: Tokyo Skytree
          latitude: 35.7101
          longitude: 139.8107
          content:
            title: 'Tokyo Skytree'
            body: 'Tokyo Skytree is a broadcasting and observation tower in Sumida, Tokyo. It became the tallest structure in Japan in 2010.'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Comparison with Leaflet component'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      isNarrow: true
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
    text:
      title: 'OpenLayers vs Leaflet'
      titleTag: 'h2'
      prose: |
        Both OpenLayers and Leaflet components are available in this library, each with their strengths:
        
        **Choose OpenLayers when you need:**
        - Advanced vector capabilities
        - Support for various data formats (GeoJSON, KML, GPX)
        - Custom map projections
        - Complex interactions and controls
        - Better performance with large datasets
        - Built-in measuring and drawing tools
        
        **Choose Leaflet when you need:**
        - Smaller file size (lighter weight)
        - Simpler API for basic mapping needs
        - Faster initial load time
        - Large plugin ecosystem
        - Mobile-first design
        
        Both components follow the same structure and integration pattern, making it easy to switch between them based on your project requirements.
---