---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Working with Data in Metalsmith Components'
  description: 'Learn how to structure, load, and use JSON data files in Metalsmith components. Master data-driven components with real-world examples from maps, logos, and collections.'
  date: '2025-09-30'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample24.jpg'

seo:
  title: Working with Data in Metalsmith Components
  description: 'Complete guide to using JSON data files in Metalsmith components. Learn data structuring, template access patterns, and data-driven component development.'
  socialImage: '/assets/images/sample24.jpg'
  canonicalURL: ''
  keywords: 'metalsmith data, json data files, data-driven components, metalsmith templates, nunjucks data, component data patterns, metalsmith collections'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    isFullScreen: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample24.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Data Management'
      title: Working with Data in Metalsmith
      titleTag: 'h1'
      subTitle: 'Separate content from configuration'
      prose: 'Learn how to structure and use JSON data files to create flexible, maintainable, data-driven components. Keep your page configurations clean while managing complex datasets separately.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Why Separate Data from Configuration?'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Page frontmatter is perfect for configuration (layout, styles, component settings), but it becomes unwieldy when you need to manage large datasets. Imagine a maps component with 50 markers - your frontmatter would be massive and hard to maintain.

        The solution: **store data in JSON files**, reference them from components.

        **Benefits:**
        - **Clean separation**: Configuration in frontmatter, content in JSON
        - **Reusability**: Same data across multiple pages
        - **Maintainability**: Update data without touching page files
        - **Scalability**: Handle large datasets without cluttering pages
        - **Version control**: Track data changes separately

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Data Directory Structure'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Data files live in `lib/data/` and are automatically loaded into Metalsmith's metadata during the build:

        ```
        lib/data/
        ├── site.json              # Site-wide settings
        ├── author.json            # Author information
        ├── socialLinks.json       # Social media links
        ├── awards.json            # Awards list data
        ├── artMuseums.json        # Museum data
        ├── maps/                  # Subdirectory for maps data
        │   ├── london-landmarks.json
        │   ├── paris-monuments.json
        │   └── nyc-clustering-demo.json
        ├── podcasts/              # Subdirectory for podcast data
        │   ├── podcast-1.json
        │   └── podcast-2.json
        └── blurbs/                # Subdirectory for content blurbs
            └── feature-blurbs.json
        ```

        **Directory organization:**
        - **Top level**: Global, site-wide data
        - **Subdirectories**: Component-specific or categorized data
        - **Naming**: Use descriptive names that reflect content

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'How Data Loading Works'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        During the build, Metalsmith reads all JSON files from `lib/data/` and makes them available in templates via the `data` object.

        **The loading function** (from `metalsmith.js`):

        ```javascript
        const getGlobalMetadata = () => {
          const dataDir = path.join(thisDirectory, 'lib', 'data');

          const processDirectory = (dirPath, relativePath = '') => {
            const files = fs.readdirSync(dirPath);
            const result = {};

            files.forEach(file => {
              const filePath = path.join(dirPath, file);
              const stat = fs.statSync(filePath);

              if (stat.isDirectory()) {
                // Recursively process subdirectories
                result[file] = processDirectory(filePath);
              } else if (file.endsWith('.json')) {
                // Load JSON file
                const fileName = file.replace('.json', '');
                const fileContents = fs.readFileSync(filePath, 'utf8');
                result[fileName] = JSON.parse(fileContents);
              }
            });

            return result;
          };

          return processDirectory(dataDir);
        };
        ```

        This recursively loads all JSON files and creates a nested object structure that mirrors your directory structure.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Accessing Data in Templates'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        All data files are accessible via the `data` object in templates. The path matches the file structure:

        **Top-level files:**
        ```liquid
        {# Access lib/data/site.json #}
        {{ data.site.title }}

        {# Access lib/data/author.json #}
        {{ data.author.name }}
        ```

        **Subdirectory files:**
        ```liquid
        {# Access lib/data/maps/london-landmarks.json #}
        {{ data.maps['london-landmarks'].latitude }}

        {# Access lib/data/podcasts/podcast-1.json #}
        {{ data.podcasts['podcast-1'].title }}
        ```

        **Important**: Use bracket notation with quotes for filenames containing hyphens.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Real Example: Maps Component'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The maps component demonstrates data-driven architecture perfectly. Map markers are stored in JSON files, while the page only references which data to use.

        **Data file** (`lib/data/maps/london-landmarks.json`):
        ```json
        {
          "latitude": 51.509865,
          "longitude": -0.118092,
          "zoom": 10,
          "markers": [
            {
              "latitude": 51.509865,
              "longitude": -0.118092,
              "title": "London",
              "icon": "award",
              "content": {
                "title": "London",
                "body": "Political and cultural center...",
                "link": "https://en.wikipedia.org/wiki/London"
              }
            },
            {
              "latitude": 51.483334,
              "longitude": -0.604167,
              "title": "Windsor Castle",
              "icon": "home",
              "content": {
                "title": "Windsor Castle",
                "body": "Royal residence in Berkshire...",
                "link": "https://en.wikipedia.org/wiki/Windsor_Castle"
              }
            }
          ]
        }
        ```

        **Page frontmatter** (just references the data):
        ```yaml
        sections:
          - sectionType: maps
            mapProvider: leaflet
            mapData: london-landmarks
            height: 600px
        ```

        The maps component loads `data.maps['london-landmarks']` and renders all markers automatically.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Loading Data in Components'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Components access data through the page configuration. Here's the pattern used in the logos-list component:

        **Page configuration:**
        ```yaml
        sections:
          - sectionType: logos-list
            logos:
              source: awards        # Data file name
              scope: all           # Load all items
              logoWidth: 120
        ```

        **Component template** (`logos-list.njk`):
        ```liquid
        {# Load all items from data source #}
        {% if section.logos.scope === "all" %}
          {% set logosList = data[section.logos.source] %}
        {% endif %}

        {# Render the logos #}
        {% for item in logosList %}
          <li style="width: {{ section.logos.logoWidth }}px;">
            {{ image(item) }}
          </li>
        {% endfor %}
        ```

        The component:
        1. Reads `section.logos.source` to get the data file name
        2. Loads data using `data[section.logos.source]`
        3. Iterates over the data to render items

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Filtering Data with getSelections()'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Sometimes you want to show only selected items from a data file. The `getSelections()` filter handles this.

        **Data file** (`lib/data/awards.json`):
        ```json
        [
          {
            "id": "award-1",
            "src": "/assets/images/awards/award-1.png",
            "alt": "Best Design Award"
          },
          {
            "id": "award-2",
            "src": "/assets/images/awards/award-2.png",
            "alt": "Innovation Award"
          },
          {
            "id": "award-3",
            "src": "/assets/images/awards/award-3.png",
            "alt": "Excellence Award"
          }
        ]
        ```

        **Page configuration** (select specific items):
        ```yaml
        sections:
          - sectionType: logos-list
            logos:
              source: awards
              scope: selections     # Load only selected items
              selections:           # Array of IDs to include
                - award-1
                - award-3
              logoWidth: 120
        ```

        **Component template:**
        ```liquid
        {# Filter data by selection IDs #}
        {% if section.logos.scope === "selections" %}
          {% set logosList = data[section.logos.source] |
                             getSelections(section.logos.selections) %}
        {% endif %}
        ```

        This renders only the items with IDs "award-1" and "award-3", skipping "award-2".

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Data Structure Best Practices'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Follow these patterns for maintainable data files:

        **1. Include IDs for filterable lists:**
        ```json
        [
          {
            "id": "item-1",
            "title": "First Item",
            "content": "..."
          }
        ]
        ```

        **2. Group related data:**
        ```json
        {
          "settings": {
            "zoom": 10,
            "center": [51.5, -0.1]
          },
          "markers": [...]
        }
        ```

        **3. Keep metadata with content:**
        ```json
        {
          "title": "London Landmarks",
          "description": "Famous locations in London",
          "lastUpdated": "2025-09-20",
          "markers": [...]
        }
        ```

        **4. Use consistent naming:**
        - Arrays: plural names (`markers`, `items`, `logos`)
        - Objects: singular names (`config`, `settings`, `metadata`)
        - Booleans: is/has prefix (`isActive`, `hasIcon`)

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Creating Data-Driven Components'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When building components that use external data, follow this pattern:

        **1. Define the data interface in frontmatter:**
        ```yaml
        sections:
          - sectionType: your-component
            items:
              source: dataFileName   # Which data file
              scope: all            # Or "selections"
              selections: []        # Optional: IDs to include
        ```

        **2. Load data in the component:**
        ```liquid
        {% if section.items.scope === "all" %}
          {% set itemsList = data[section.items.source] %}
        {% endif %}

        {% if section.items.scope === "selections" %}
          {% set itemsList = data[section.items.source] |
                             getSelections(section.items.selections) %}
        {% endif %}
        ```

        **3. Render the data:**
        ```liquid
        {% for item in itemsList %}
          {# Render item #}
        {% endfor %}
        ```

        This pattern provides flexibility - users can show all items or a curated selection.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Working with Nested Data'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Data files can have nested structures. Access them using dot notation or brackets:

        **Complex data file** (`lib/data/podcasts/show-1.json`):
        ```json
        {
          "metadata": {
            "title": "Tech Talk",
            "host": "Jane Developer"
          },
          "episodes": [
            {
              "number": 1,
              "title": "Getting Started",
              "guests": [
                {"name": "John", "role": "Expert"}
              ]
            }
          ]
        }
        ```

        **Template access:**
        ```liquid
        {# Top-level properties #}
        {{ data.podcasts['show-1'].metadata.title }}

        {# Array iteration #}
        {% for episode in data.podcasts['show-1'].episodes %}
          Episode {{ episode.number }}: {{ episode.title }}

          {# Nested arrays #}
          {% for guest in episode.guests %}
            Guest: {{ guest.name }} ({{ guest.role }})
          {% endfor %}
        {% endfor %}
        ```

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Data vs Collections'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Understanding when to use data files vs. Metalsmith collections:

        **Use data files when:**
        - Content doesn't need its own page (logos, awards, markers)
        - Data is reused across multiple pages
        - Content is structured lists or configuration
        - You need to filter/select subsets

        **Use collections when:**
        - Each item needs its own page (blog posts)
        - Content has frontmatter and body content
        - You need pagination
        - Items should appear in navigation/sitemap

        **Example combinations:**
        - Blog posts: Collection (each post is a page)
        - Author info: Data file (reused across posts)
        - Tags: Data file (list of valid tags)
        - Comments: Data file (associated with posts)

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Debugging Data Loading'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When data doesn't appear as expected, use these debugging techniques:

        **1. Check the data object structure:**
        ```liquid
        {# Add to your template temporarily #}
        <pre>{{ data | dump }}</pre>
        ```

        **2. Verify file loading:**
        ```liquid
        {# Check if specific data exists #}
        {% if data.maps %}
          Maps data loaded: {{ data.maps | keys }}
        {% else %}
          Maps data not found
        {% endif %}
        ```

        **3. Inspect array contents:**
        ```liquid
        {# Show what's in an array #}
        Data count: {{ data.awards | length }}
        First item: {{ data.awards[0] | dump }}
        ```

        **4. Common issues:**
        - **Hyphens in filenames**: Use brackets - `data['file-name']` not `data.file-name`
        - **Case sensitivity**: Filenames are case-sensitive
        - **JSON errors**: Invalid JSON won't load (check with a validator)
        - **Wrong path**: Verify subdirectory structure matches access pattern

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      title: 'Summary'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Data files provide a clean, maintainable way to manage content in Metalsmith components:

        - **Store data** in `lib/data/` as JSON files
        - **Access globally** via the `data` object in templates
        - **Use subdirectories** to organize related data
        - **Filter with getSelections()** to show subsets
        - **Follow patterns** from existing components (maps, logos-list)
        - **Separate concerns** - configuration in frontmatter, content in data files

        This architecture scales beautifully from small sites to complex applications while keeping your page files clean and your data manageable.

  - sectionType: blog-navigation
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
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
---
