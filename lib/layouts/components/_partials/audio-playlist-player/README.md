# Audio Playlist Player Partial Component

A sophisticated audio playlist player that supports both internal audio files and external platform links. This partial component provides the core playlist functionality and can be embedded within section components or used independently.

## Features

- **Mixed Content Support** - Combines internal audio files with external platform links
- **Smart Source Selection** - Automatically picks the best available source for playback
- **External Platform Integration** - Supports YouTube, Spotify, SoundCloud, Apple Podcasts, Google Podcasts, and RSS feeds
- **Auto-progression** - Automatically advances to the next internal track
- **Interactive Track List** - Click-to-play interface with visual indicators
- **Responsive Design** - Optimized for all screen sizes
- **Event Delegation** - Efficient event handling prevents duplicate listeners
- **Platform Priority** - Internal files preferred, then YouTube → Spotify → SoundCloud, etc.

## Usage

### Basic Implementation

```njk
{% from "components/_partials/audio-playlist-player/audio-playlist-player.njk" import audioPlaylist %}

{{ audioPlaylist('my-podcast-series', { showTrackList: true }, data.playlists) }}
```

### Parameters

- `playlistName` (string, required): Name of the playlist JSON file in `data/playlists/`
- `options` (object, optional): Configuration options
- `playlistsData` (object, required): Playlist data from `data.playlists`

### Options

- `showTrackList` (boolean, default: true): Display the interactive track list
- `autoplay` (boolean, default: false): Auto-play first track on load

## Data Structure

Create playlist data files in `lib/data/playlists/[name].json`:

```json
{
  "title": "My Podcast Series",
  "description": "Weekly episodes about web development",
  "coverImage": "/assets/images/podcast-cover.jpg",
  "tracks": [
    {
      "id": "track-1",
      "title": "Episode 1: Getting Started",
      "artist": "Host Name",
      "duration": "15:30",
      "type": "internal",
      "sources": {
        "ogg": "/assets/audio/episode-1.ogg",
        "mpeg": "/assets/audio/episode-1.mp3"
      },
      "thumbnail": "/assets/images/episode-1.jpg",
      "description": "Introduction to the series"
    },
    {
      "id": "track-2",
      "title": "Episode 2: External Content",
      "artist": "Host Name", 
      "duration": "22:15",
      "type": "external",
      "sources": {
        "youtube": "https://www.youtube.com/watch?v=example123",
        "spotify": "https://open.spotify.com/episode/example456"
      },
      "thumbnail": "/assets/images/episode-2.jpg",
      "description": "Available on external platforms"
    }
  ]
}
```

## Track Types

### Internal Tracks (`type: "internal"`)
- Audio files hosted on your server
- Supports OGG and MP3 formats for maximum compatibility
- Plays directly in the built-in audio player
- Auto-advances to next track when finished

### External Tracks (`type: "external"`)
- Links to external platforms only
- Auto-opens in the best available platform
- Shows platform selection message
- No local audio playback

### Mixed Tracks (`type: "mixed"`)
- Combination of internal and external sources
- Prioritizes internal audio playback
- Falls back to external platforms if needed

## Platform Support

### Supported External Platforms

- **YouTube** - Video/audio content (highest priority)
- **Spotify** - Music and podcast episodes
- **SoundCloud** - Independent audio tracks
- **Apple Podcasts** - iOS/macOS podcast app links
- **Google Podcasts** - Google's podcast platform
- **RSS Feeds** - Direct podcast feed links

### Platform Priority Order

1. Internal files (ogg/mp3) - always preferred
2. YouTube - most universal platform
3. Spotify - excellent for podcasts and music
4. SoundCloud - good for independent content
5. Apple Podcasts - iOS ecosystem
6. Google Podcasts - Android ecosystem  
7. RSS - fallback for direct feeds

## JavaScript Functionality

The component automatically initializes and provides:

### Core Features
- **Event Delegation** - Efficient click handling prevents duplicate events
- **Smart Source Selection** - Chooses optimal playback method
- **State Management** - Tracks current playing track and playlist state
- **Auto-progression** - Seamlessly moves between internal tracks
- **Platform Detection** - Identifies and opens best external sources

### Event Handling
- **Track Selection** - Click any track to start playback
- **Audio Events** - Handles play, pause, and end events
- **External Link Management** - Opens external platforms in new tabs
- **Progress Tracking** - Maintains playback state across tracks

## Styling

### Component Structure
- `.audio-playlist` - Main container
- `.playlist-header` - Playlist title, description, and cover image
- `.current-track` - Currently selected track display
- `.audio-player` - HTML5 audio controls for internal tracks
- `.external-sources` - External platform links and messages
- `.track-list` - Interactive list of all tracks

### Responsive Features
- Mobile-optimized touch targets
- Flexible layout that adapts to screen size
- Scalable typography and spacing
- Platform-appropriate link styling

### Theme Support
- Light and dark theme variations
- Customizable platform colors
- Consistent with site design system
- CSS custom properties for easy theming

## Browser Compatibility

- **HTML5 Audio** - All modern browsers support built-in audio controls
- **External Links** - Universal browser support for opening new tabs
- **CSS Features** - Uses modern CSS with appropriate fallbacks
- **JavaScript** - ES6+ features with broad compatibility

## Performance

- **Lazy Loading** - External platform data loaded only when needed
- **Event Efficiency** - Single event listener per playlist using delegation
- **Memory Management** - Proper cleanup prevents memory leaks
- **Optimization** - Minimal DOM manipulation for smooth performance

## Accessibility

- **Semantic HTML** - Proper heading hierarchy and list structure
- **ARIA Attributes** - Screen reader support for interactive elements
- **Keyboard Navigation** - Full keyboard accessibility
- **Alt Text** - Descriptive text for all images and icons
- **Focus Management** - Clear visual focus indicators

## Files

- `audio-playlist-player.njk` - Nunjucks template macro
- `audio-playlist-player.css` - Component styles and themes
- `audio-playlist-player.js` - Interactive functionality and state management
- `manifest.json` - Component configuration and validation schema
- `README.md` - This documentation

## Dependencies

- **Image partial** - For thumbnails and cover images
- **Icon partial** - For play buttons and platform indicators
- **Commons** - Shared styling utilities and CSS variables

## Integration

This partial is designed to be used within section components but can also be used independently. It follows the established component architecture patterns and integrates seamlessly with the Metalsmith build system.

### Example Integration in Section Component

```njk
{% from "components/_partials/audio-playlist-player/audio-playlist-player.njk" import audioPlaylist %}

<div class="content container">
  <div class="playlist-wrapper">
    {{ audioPlaylist(section.playlist, section.options or {}, data.playlists) }}
  </div>
</div>
```