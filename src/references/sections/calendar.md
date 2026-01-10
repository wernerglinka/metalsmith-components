---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Calendar

navigation:
  navLabel: 'Calendar'
  navIndex: 8

card:
  title: 'Calendar'
  description: 'Interactive calendar displaying Google Calendar events with monthly navigation, event categorization, and detailed event views.'
  image: '/assets/images/sample20.jpg'
  tags: ['calendar', 'events', 'google-calendar', 'scheduling', 'interactive', 'navigation']

seo:
  title: Calendar Component - Google Calendar Integration for Metalsmith
  description: 'Dynamic calendar component with Google Calendar API integration, monthly navigation, event categorization, and interactive event details for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith calendar, google calendar integration, event calendar, interactive calendar, monthly view, calendar navigation, event scheduling'

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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Calendar Section'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A self-contained calendar component that displays Google Calendar events in a modern monthly grid view. Features client-side data fetching, dynamic month navigation, event categorization, and detailed event viewing.'

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
      title: 'Calendar Section Examples'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        #### Basic calendar with inline configuration:

        ```yml
        - sectionType: calendar
          calendars:
            apiKey: 'YOUR_GOOGLE_CALENDAR_API_KEY'
            calendars:
              - id: 'en.usa#holiday@group.v.calendar.google.com'
                name: 'US Holidays'
                category: 'holiday'
          text:
            title: 'Event Calendar'
            prose: 'View upcoming events and important dates'
        ```

  - sectionType: calendar
    containerTag: section
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
    calendars:
      apiKey: 'AIzaSyCuPRkCrwjjf_cAIlibAZ5apogz8iaTG3M'
      calendars:
        - id: '76961a30394a7092a9c09e2b0e6c075dd7ed95105d01b023e09d55d0d22e6d27@group.calendar.google.com'
          name: 'Test Calendar'
          category: 'test'
        - id: 'en.usa#holiday@group.v.calendar.google.com'
          name: 'US Holidays'
          category: 'holiday'
    text:
      title: 'Event Calendar'
      titleTag: 'h2'
      prose: 'View upcoming events and important dates. Replace **YOUR_GOOGLE_CALENDAR_API_KEY** above with your own API key to see live data.'

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
      title: 'Using external data file (optional)'
      titleTag: 'h4'
      subTitle: ''
      prose: |-
        For reusable configurations, you can use an external data file:

        ```yml
        - sectionType: calendar
          calendars:
            source: 'holidays'  # References lib/data/calendars/holidays.json
        ```

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
      title: 'Calendar with background'
      titleTag: 'h4'
      subTitle: ''
      prose: |-
        ```yml
        - sectionType: calendar
          containerFields:
            inContainer: true
            background:
              color: 'var(--color-background-light)'
          calendars:
            source: 'team-events'
          text:
            title: 'Team Schedule'
        ```

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
        ### Method 1: Inline Configuration (Recommended)

        Define the calendar configuration directly in your page YAML:

        ```yaml
        - sectionType: calendar
          containerTag: section
          calendars:
            apiKey: 'YOUR_GOOGLE_CALENDAR_API_KEY'
            calendars:
              - id: 'en.usa#holiday@group.v.calendar.google.com'
                name: 'US Holidays'
                category: 'holiday'
              - id: 'your-calendar@gmail.com'
                name: 'Personal Events'
                category: 'personal'
          text:
            title: 'Event Calendar'
            prose: 'View upcoming events'
        ```

        ### Method 2: External Data File (Optional)

        For reusable configurations across multiple pages, create a data file in `lib/data/calendars/[name].json`:

        ```json
        {
          "apiKey": "YOUR_GOOGLE_CALENDAR_API_KEY",
          "calendars": [
            {
              "id": "en.usa#holiday@group.v.calendar.google.com",
              "name": "US Holidays",
              "category": "holiday"
            },
            {
              "id": "your-calendar@gmail.com",
              "name": "Personal Events",
              "category": "personal"
            }
          ]
        }
        ```

        Then reference it in your page:

        ```yaml
        - sectionType: calendar
          calendars:
            source: 'holidays'  # Loads lib/data/calendars/holidays.json
        ```

        ### Getting a Google Calendar API Key

        1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
        2. Create a new project or select an existing one
        3. Enable the Google Calendar API
        4. Go to Credentials and create an API key
        5. Restrict the API key to Google Calendar API only
        6. Add the API key to your calendar configuration file

        ### Finding Calendar IDs

        For public calendars:
        1. Open Google Calendar
        2. Click the three dots next to the calendar name
        3. Select "Settings and sharing"
        4. Scroll down to "Integrate calendar"
        5. Copy the Calendar ID

        Common public calendars:
        - US Holidays: `en.usa#holiday@group.v.calendar.google.com`
        - UK Holidays: `en.uk#holiday@group.v.calendar.google.com`
        - Canada Holidays: `en.canadian#holiday@group.v.calendar.google.com`

        ### Event Categories and Styling

        The component includes four built-in category styles:

        - **default**: Blue theme for general events
        - **holiday**: Red theme for holidays and special occasions
        - **personal**: Green theme for personal events
        - **work**: Indigo theme for work-related events

        Custom categories can be added by extending the CSS with additional `.calendar__event--{category}` classes.

        ### Calendar Features

        - **Monthly Grid View** - Standard calendar layout with weekday headers
        - **Navigation** - Previous/next month buttons with smooth transitions
        - **Event Display** - Up to 3 events shown per day, "+X more" indicator for additional events
        - **Event Details Panel** - Slides in from right with full event information
        - **Today Highlighting** - Special styling for current date
        - **All-Day Events** - Visual distinction from timed events
        - **Responsive Design** - Mobile-friendly layout that adapts to screen size
        - **Keyboard Support** - Escape key to close event details panel

        ### Performance Features

        - **Three-Month Window** - Initial fetch includes previous, current, and next month
        - **Dynamic Loading** - Additional months loaded on-demand when navigating
        - **Client-Side Caching** - Events cached to minimize API calls
        - **Graceful Errors** - Shows user-friendly messages if calendar is unavailable

        #### Calendar Configuration

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `calendars.apiKey` | string | Yes* | Google Calendar API key (inline config) |
        | `calendars.calendars` | array | Yes* | Array of calendar objects (inline config) |
        | `calendars.source` | string | Yes* | Name of JSON file in `lib/data/calendars/` (external config) |

        *Either inline (`apiKey` + `calendars`) OR external (`source`) is required

        #### Calendar Object Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `id` | string | Yes | Google Calendar ID |
        | `name` | string | No | Display name for the calendar |
        | `category` | string | No | Category for styling (default, holiday, personal, work) |

        #### Header Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text.title` | string | No | Calendar section title |
        | `text.prose` | string | No | Optional description text |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'calendar'
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
      title: 'Download Calendar Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete calendar component package including template, styles, scripts, modules, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/calendar.zip'
        label: 'Download Calendar Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
