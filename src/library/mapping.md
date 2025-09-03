---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Mapping'
  navIndex: 4

seo:
  title: Mapping Component - Interactive Maps with Leaflet and OpenLayers for Metalsmith
  description: 'Mapping component supporting Leaflet and OpenLayers providers with dynamic library loading, custom SVG markers, and popup interactions for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith mapping, leaflet maps, openlayers maps, interactive maps, custom markers, mapping component, map integration'

sections:
  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
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
      title: 'Mapping'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A mapping component that supports Leaflet and OpenLayers providers via the `mapProvider` property. Dynamically loads the appropriate mapping library only when needed, maintaining optimal performance. Features custom SVG markers, interactive popups, and responsive design across all devices.

        The component handles multiple maps per page, each with independent configurations and provider selection. All text fields (leadIn, title, subtitle, prose) and CTAs are optional. The maps automatically adapt to container dimensions and include accessibility features for screen readers.

        ```yaml
        - sectionType: mapping
          containerTag: section
          
          mapProvider: 'leaflet' # 'leaflet' or 'openlayers'
          latitude: 51.509865
          longitude: -0.118092
          zoom: 10
          # more settings

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
          markers:
            - latitude: 51.509865
              longitude: -0.118092
              title: 'London'
              content:
                title: 'London'
                body: 'London is a political, historical, cultural center...'
                link: 'https://en.wikipedia.org/wiki/London'
        ```

        ### Core Properties

        - `mapProvider`: Map library to use ('leaflet' or 'openlayers')
        - `latitude`/`longitude`: Map center coordinates (required)
        - `zoom`: Initial zoom level (default: 10)
        - `markers`: Array of marker objects with coordinates and popup content
        - `text`: Standard text block with leadIn, title, subtitle, and prose
        - `ctas`: Array of call-to-action buttons or links

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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Leaflet Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        **Choose Leaflet when you need:**
        - Smaller file size (lighter weight at ~145KB)
        - Simpler API for basic mapping needs
        - Faster initial load time
        - Large plugin ecosystem
        - Mobile-first design with touch interactions
        - Better performance on older devices

  - sectionType: mapping
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
    latitude: 51.509865
    longitude: -0.118092
    zoom: 10
    markers:
      - latitude: 51.509865
        longitude: -0.118092
        title: 'London'
        content:
          title: 'London'
          body: 'London is a political, historical, cultural, and tourist center of the United Kingdom, an important city and commercial spot in Western Europe.'
          link: 'https://en.wikipedia.org/wiki/London'
      - latitude: 51.483334
        longitude: -0.604167
        title: 'Windsor Castle'
        content:
          title: 'Windsor Castle'
          body: 'Windsor Castle is one of the most known buildings and a royal residence in the county of Berkshire.'
          link: 'https://en.wikipedia.org/wiki/Windsor_Castle'
      - latitude: 51.5055
        longitude: -0.0754
        title: 'Tower Bridge'
        content:
          title: 'Tower Bridge'
          body: 'Tower Bridge is a combined bascule and suspension bridge in London, built between 1886 and 1894.'
          link: 'https://en.wikipedia.org/wiki/Tower_Bridge'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
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
      leadIn: ''
      title: 'OpenLayers Properties'
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

  - sectionType: mapping
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: false
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
    latitude: 48.8566
    longitude: 2.3522
    zoom: 11
    markers:
      - latitude: 48.8584
        longitude: 2.2945
        title: 'Eiffel Tower'
        content:
          title: 'Eiffel Tower'
          body: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France.'
          link: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
      - latitude: 48.8606
        longitude: 2.3376
        title: 'Louvre Museum'
        content:
          title: 'Louvre Museum'
          body: "The Louvre is the world's most-visited museum, and a historic landmark in Paris."
          link: 'https://en.wikipedia.org/wiki/Louvre'
      - latitude: 48.8738
        longitude: 2.2950
        title: 'Arc de Triomphe'
        content:
          title: 'Arc de Triomphe'
          body: 'The Arc de Triomphe is one of the most famous monuments in Paris.'
          link: 'https://en.wikipedia.org/wiki/Arc_de_Triomphe'

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
        Each marker in the markers array includes:
        - `latitude`/`longitude`: Marker position coordinates (required)
        - `title`: Tooltip text displayed on hover
        - `content`: Popup content object
          - `title`: Popup heading text
          - `body`: Description or details
          - `link`: Optional external URL for "Read more" functionality

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
    containerFields:
      inContainer: true
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
      leadIn: ''
      title: 'Performance & Implementation'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        **Dynamic Loading**: The component loads the appropriate mapping library (Leaflet v1.9.4 or OpenLayers v10.3.0) from CDN only when needed. This keeps your initial bundle size small.

        **Provider Switching**: You can easily switch between Leaflet and OpenLayers by changing just the `mapProvider` field. All other configuration remains identical.

        **Multiple Maps**: You can have multiple maps on the same page using different providers. Each map maintains its own state and configuration.

        **Consistent SVG Markers**: Both providers use the same custom SVG marker design for visual consistency across all maps.

        **Responsive Design**: Maps automatically adapt to their container width and include mobile-optimized touch interactions.

        **Accessibility**: Markers include proper title attributes for screen readers, and all external links include appropriate security attributes.
---
