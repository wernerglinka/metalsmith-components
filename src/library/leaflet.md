---
layout: pages/sections.njk
bodyClasses: 'sections-page'

navigation:
  navLabel: 'Leaflet Map'
  navIndex: 15

seo:
  title: Leaflet Map Section Component - Interactive Maps for Metalsmith
  description: 'Add interactive maps to your Metalsmith site with the Leaflet component. Features multiple markers with popups, custom content, and dynamic library loading.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith leaflet map, interactive map component, map with markers, openstreetmap integration, dynamic map loading, map popups'

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'Introduction to the Leaflet Map component'
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
      title: 'Leaflet Map Component'
      titleTag: 'h1'
      subTitle: 'Interactive maps with markers and popups'
      prose: |
        The Leaflet Map component provides an easy way to add interactive maps to your Metalsmith site. It dynamically loads the Leaflet library only when needed, ensuring optimal performance. Features include custom markers with popup content, configurable zoom levels, and responsive map containers.

        This component is perfect for displaying locations, offices, events, or any geographic data. The map uses OpenStreetMap tiles and includes proper attribution. Each marker can have its own popup with title, description, and optional link.

  - sectionType: leaflet
    containerTag: section
    classes: ''
    id: 'demo-map-london'
    description: 'Example of a Leaflet map focused on London with multiple markers'
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
    leaflet:
      latitute: 51.509865
      longitude: -0.118092
      zoom: 10
      containerId: 'london-map'
      containerHeight: 600
      markers:
        - title: London
          latitute: 51.509865
          longitude: -0.118092
          content:
            title: 'London'
            body: 'London is a political, historical, cultural, and tourist center of the United Kingdom, an important city and commercial spot in Western Europe. It is among the largest metropolitan areas in Europe.'
            link: 'https://en.wikipedia.org/wiki/London'
        - title: Windsor Castle
          latitute: 51.483334
          longitude: -0.604167
          content:
            title: 'Windsor Castle'
            body: 'Windsor Castle is one of the most known buildings and a royal residence in the county of Berkshire. It is strongly associated with the English and British royal families.'
            link: 'https://en.wikipedia.org/wiki/Windsor_Castle'
        - title: Tower Bridge
          latitute: 51.5055
          longitude: -0.0754
          content:
            title: 'Tower Bridge'
            body: 'Tower Bridge is a combined bascule and suspension bridge in London, built between 1886 and 1894. The bridge crosses the River Thames close to the Tower of London.'
            link: 'https://en.wikipedia.org/wiki/Tower_Bridge'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Configuration options for the Leaflet component'
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

        - **latitute** (required): Center point latitude for the map
        - **longitude** (required): Center point longitude for the map
        - **zoom**: Initial zoom level (default: 10)
        - **containerId**: Unique ID for the map container (default: 'map')
        - **containerHeight**: Height in pixels (default: 600)

        ### Marker Configuration

        Each marker in the markers array can include:

        - **title**: Tooltip text shown on hover
        - **latitute** & **longitude**: Marker position (required)
        - **content**: Popup content object
          - **title**: Popup heading
          - **body**: Description text
          - **link**: Optional URL for "Read more" link

        ### Performance Notes

        The component automatically:
        - Loads Leaflet CSS and JS from CDN only when component is used
        - Prevents duplicate loading if multiple maps are present
        - Uses OpenStreetMap tiles with proper attribution
        - Supports multiple maps on the same page with unique container IDs

  - sectionType: leaflet
    containerTag: section
    classes: ''
    id: 'demo-map-usa'
    description: 'Example of a Leaflet map showing US locations'
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
    leaflet:
      latitute: 40.7128
      longitude: -74.0060
      zoom: 4
      containerId: 'usa-map'
      containerHeight: 500
      markers:
        - title: New York City
          latitute: 40.7128
          longitude: -74.0060
          content:
            title: 'New York City'
            body: 'The most populous city in the United States, known for its iconic skyline, cultural diversity, and as a global hub for business, arts, and entertainment.'
        - title: San Francisco
          latitute: 37.7749
          longitude: -122.4194
          content:
            title: 'San Francisco'
            body: 'A cultural, commercial, and financial center in Northern California, famous for the Golden Gate Bridge, cable cars, and tech innovation.'
        - title: Chicago
          latitute: 41.8781
          longitude: -87.6298
          content:
            title: 'Chicago'
            body: 'The third-largest city in the US, known for its impressive architecture, deep-dish pizza, and location on the shores of Lake Michigan.'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Implementation details'
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
      title: 'Implementation Details'
      titleTag: 'h2'
      prose: |
        The Leaflet component is designed for optimal performance and ease of use:

        **Dynamic Loading**: The component loads the Leaflet library (v1.9.4) from unpkg CDN only when a map is present on the page. This keeps your initial bundle size small.

        **Multiple Maps**: You can have multiple maps on the same page by using unique container IDs. Each map maintains its own state and configuration.

        **Responsive Design**: Maps automatically adapt to their container width. Height is configurable via the containerHeight property.

        **Accessibility**: Markers include proper title attributes for screen readers, and all external links include appropriate security attributes.

        **Customization**: While the component uses OpenStreetMap tiles by default, the implementation can be extended to support different tile providers or custom styling.
---
