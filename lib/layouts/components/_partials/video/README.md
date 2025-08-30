# Video Component

Modern multi-provider video component supporting YouTube, Vimeo, and Cloudinary videos with performance-optimized inline and modal display options.

## Features

- **Multiple Providers**: YouTube, Vimeo, and Cloudinary support
- **Display Modes**: Inline playback or modal overlay
- **Responsive Design**: Automatic sizing across all devices
- **Performance Optimized**: Lazy loading, script caching, intersection observer
- **Time Controls**: Start and end time support for YouTube
- **Event-Driven**: Centralized event bus for component communication
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modern Architecture**: Factory pattern, configuration management, error recovery

## Supported Providers

### YouTube

- Full YouTube IFrame API integration
- Player controls and state management
- Start/end time controls
- Autoplay prevention for better UX

### Vimeo

- Vimeo Player API integration
- Responsive embed support
- Event handling for play/pause/end

### Cloudinary

- Cloudinary Video Player support
- Cloud-based video optimization
- Custom player styling and controls

## Data Structure

```yaml
video:
  inline: true # true for inline, false for modal
  src: 'youtube' # 'youtube', 'vimeo', or 'cloudinary'
  id: 'dQw4w9WgXcQ' # Video ID or public ID
  cloudname: 'my-cloud' # Required for Cloudinary
  tn: '/assets/images/thumb.jpg' # Thumbnail for modal display
  start: 30 # Start time in seconds (YouTube only)
  end: 120 # End time in seconds (YouTube only)
  lazy: true # Enable lazy loading (default: true)
```

## Properties

- `inline`: Display video inline (true) or in modal overlay (false)
- `src`: Video provider ('youtube', 'vimeo', 'cloudinary'). Defaults to 'youtube' for backward compatibility
- `id`: Video identifier (YouTube video ID, Vimeo ID, or Cloudinary public ID)
- `cloudname`: Cloudinary cloud name (required for Cloudinary videos)
- `tn`: Thumbnail image path (used for modal display)
- `start`: Optional start time in seconds (YouTube only)
- `end`: Optional end time in seconds (YouTube only)
- `lazy`: Enable lazy loading with Intersection Observer (default: true)

## Usage Examples

### YouTube Videos

**Basic YouTube Modal:**

```yaml
video:
  inline: false
  src: youtube
  id: 'dQw4w9WgXcQ'
  tn: '/assets/images/youtube-thumb.jpg'
```

**YouTube Inline with Time Controls:**

```yaml
video:
  inline: true
  src: youtube
  id: 'dQw4w9WgXcQ'
  start: 30
  end: 120
```

**Backward Compatible (defaults to YouTube):**

```yaml
video:
  inline: false
  id: 'dQw4w9WgXcQ'
  tn: '/assets/images/thumb.jpg'
```

### Vimeo Videos

**Vimeo Modal:**

```yaml
video:
  inline: false
  src: vimeo
  id: '123456789'
  tn: '/assets/images/vimeo-thumb.jpg'
```

**Vimeo Inline:**

```yaml
video:
  inline: true
  src: vimeo
  id: '123456789'
```

### Cloudinary Videos

**Cloudinary Modal:**

```yaml
video:
  inline: false
  src: cloudinary
  id: 'my-video-public-id'
  cloudname: 'my-cloud-name'
  tn: '/assets/images/cloudinary-thumb.jpg'
```

**Cloudinary Inline:**

```yaml
video:
  inline: true
  src: cloudinary
  id: 'my-video-public-id'
  cloudname: 'my-cloud-name'
```

## HTML Structure

### Inline Video

```html
<div class="video media inline">
  <div class="inline-video-wrapper js-inline-video-wrapper">
    <div
      class="js-inline-video"
      data-videoid="dQw4w9WgXcQ"
      data-videosrc="youtube"
      data-starttime="30"
      data-endtime="120"
      data-lazy="true"
    ></div>
  </div>
  <button class="video-trigger">
    <div class="play-button"></div>
    <img src="/assets/images/thumb.jpg" alt="Video thumbnail" />
  </button>
  <button class="close" aria-label="Close video">×</button>
</div>
```

### Modal Video

```html
<div class="video media">
  <button
    class="js-modal-video"
    data-videoid="dQw4w9WgXcQ"
    data-videosrc="youtube"
    data-starttime="30"
    data-endtime="120"
  >
    <div class="play-button"></div>
    <img src="/assets/images/thumb.jpg" alt="Video thumbnail" />
  </button>
</div>
```

## Architecture

### Module Structure

```
video/
├── video.js                # Main simplified component (single-player)
├── modules/
│   ├── config/
│   │   └── video-config.js # Functional configuration management
│   ├── helpers/
│   │   ├── dom.js          # DOM manipulation utilities
│   │   ├── event-bus.js    # Functional event system
│   │   ├── load-script.js  # Script loading utility
│   │   ├── load-styles.js  # CSS loading utility
│   │   ├── load-youtube-api.js # YouTube API loader
│   │   ├── modal.js        # Modal control functions
│   │   └── player-manager.js # Single active player management
│   └── providers/
│       ├── youtube.js      # Simplified YouTube provider
│       ├── vimeo.js        # Simplified Vimeo provider
│       └── cloudinary.js   # Simplified Cloudinary provider
```

### Provider Interface

Each provider implements:

- `createProviderModalPlayer(videoId, targetId, cloudName, options)` - Creates modal player
- `createProviderInlinePlayer(element, videoId, cloudName, options)` - Creates inline player
- **Single-player architecture** - automatically stops other players when starting
- **Event-driven state management** - emits standardized events
- **Error handling with recovery** - proper error reporting via events
- **Resource cleanup** - automatic player cleanup and memory management

## Provider-Specific Features

### YouTube Integration

- **YouTube IFrame API**: Automatic loading and initialization
- **Player States**: Full state management (playing, paused, ended)
- **Time Controls**: Start and end time parameters
- **Player Variables**: Configurable player options

```javascript
const playerVars = {
  autoplay: 0, // Manual start
  controls: 1, // Show controls
  enablejsapi: 1, // Enable API
  rel: 0, // No related videos
  start: startTime, // Start time
  end: endTime // End time
};
```

### Vimeo Integration

- **Vimeo Player API**: Dynamic loading of player script
- **Event Handling**: Play, pause, and end events
- **Responsive Sizing**: Automatic aspect ratio handling

### Cloudinary Integration

- **Video Player SDK**: Cloudinary's video player library
- **CSS Loading**: Dynamic stylesheet loading
- **Cloud Optimization**: Automatic video optimization
- **Percent Events**: Playback completion tracking

## Modal Functionality

### Modal Features

- **Backdrop Click**: Click outside to close
- **ESC Key**: Keyboard close functionality
- **Scroll Lock**: Prevents background scrolling
- **Focus Management**: Proper focus handling
- **Provider Cleanup**: Automatic player cleanup on close

### Modal Overlay Structure

```html
<div id="video-overlay" class="js-video-overlay">
  <span class="close">[Close]</span>
  <div class="responsive-wrapper">
    <div class="video-container">
      <!-- Provider-specific player inserted here -->
    </div>
  </div>
</div>
```

## CSS Classes

- `.video`: Main video container
- `.media`: Media wrapper class
- `.inline`: Inline display mode
- `.js-inline-video`: JavaScript hook for inline videos
- `.js-modal-video`: JavaScript hook for modal videos
- `.js-inline-video-wrapper`: Wrapper for inline video containers
- `.video-playing`: Applied during video playback
- `.video-trigger`: Play button for inline videos
- `.play-button`: Play button styling

## Performance Optimization

### Optimized Script Loading

- **Simple and reliable**: Basic script loading with duplicate prevention
- **Promise-based**: Clean async/await patterns
- **Error handling**: Proper error recovery and reporting
- **CSS support**: Dynamic stylesheet loading for Cloudinary

```javascript
// Simple script and style loading
import loadScript from './modules/helpers/load-script.js';
import loadStyles from './modules/helpers/load-styles.js';

// Load provider assets
await loadScript('https://www.youtube.com/iframe_api');
await loadStyles('https://unpkg.com/cloudinary-video-player@latest/dist/cld-video-player.min.css');
```

### Lazy Loading with Intersection Observer

- **Viewport Detection**: Videos initialize only when entering viewport
- **Configurable Thresholds**: Customizable distance from viewport
- **Performance Monitoring**: Built-in timing measurements
- **Graceful Fallback**: Works without IntersectionObserver support

```javascript
// Lazy loading configuration
const config = {
  lazyLoad: true,
  intersectionThreshold: 0.1,
  preloadDistance: '200px'
};
```

### Single-Player Management

- **Active Player Tracking**: Only one video plays at a time
- **Automatic Switching**: Starting a new video stops the current one
- **Memory Efficiency**: Single player state instead of complex registries
- **Clean Transitions**: Proper cleanup when switching between videos

## Modern Features

### Event-Driven Architecture

- **Centralized Event Bus**: Component communication via custom events
- **Custom Event Hooks**: Extensible event system for third-party integration

```javascript
// Listen for video events
import eventBus, { VIDEO_EVENTS } from './modules/helpers/event-bus.js';

eventBus.on(VIDEO_EVENTS.PLAY, (detail) => {
  console.log('Video started:', detail.provider);
});

eventBus.on(VIDEO_EVENTS.ENDED, (detail) => {
  console.log('Video ended:', detail.videoId);
});
```

### Configuration Management

- **Centralized Settings**: Single source of configuration truth
- **Runtime Configuration**: Dynamic settings via data attributes
- **Provider-Specific Options**: Customizable per-provider settings
- **Validation**: Built-in configuration validation

```javascript
// Configure video component
import { videoConfig } from './modules/config/video-config.js';

videoConfig.set({
  performance: {
    lazyLoad: true,
    maxConcurrentLoads: 3
  },
  providers: {
    youtube: {
      defaultPlayerVars: {
        modestbranding: 1,
        playsinline: 1
      }
    }
  }
});
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all providers
- **Screen Readers**: Proper ARIA labeling and announcements
- **Focus Management**: Logical focus flow in modals with focus trapping
- **High Contrast**: Compatible with high contrast modes
- **State Announcements**: Screen reader feedback for video state changes

## Browser Support

- **Modern Browsers**: Full support in Chrome, Firefox, Safari, Edge
- **Mobile**: Excellent support on iOS and Android
- **Provider APIs**: Dependent on provider browser support
- **Fallbacks**: Graceful degradation for unsupported features

## Best Practices

1. **Provider Selection**: Choose the right provider for your needs
2. **Thumbnail Quality**: Use high-quality thumbnails for modal videos
3. **Lazy Loading**: Enable lazy loading for videos below the fold
4. **Configuration**: Use centralized configuration for consistent behavior
5. **Performance**: Monitor loading times with built-in performance tracking
6. **Events**: Leverage the event system for custom behavior
7. **Accessibility**: Always provide descriptive alt text and ARIA labels
8. **Error Handling**: Implement proper error recovery for failed video loads

## Troubleshooting

### Common Issues

**API Loading:**

- Ensure providers' APIs can load (check network/CORS)
- YouTube requires HTTPS in production

**Cloudinary:**

- Verify cloud name is correct
- Check video public ID exists
- Ensure video is set to public

**Vimeo:**

- Verify video ID is correct
- Check video privacy settings

### Debug Methods

```javascript
// Enable debug mode
import { videoConfig } from './modules/config/video-config.js';
videoConfig.set('debug', true);

// Listen for error events
import eventBus, { VIDEO_EVENTS } from './modules/helpers/event-bus.js';
eventBus.on(VIDEO_EVENTS.PLAYER_ERROR, (detail) => {
  console.error('Video error:', detail);
});

// Check script loading status
import { isScriptLoaded } from './modules/helpers/script-loader.js';
console.log('YouTube API loaded:', isScriptLoaded('https://www.youtube.com/iframe_api'));

// Performance monitoring
performance
  .getEntriesByType('measure')
  .filter((entry) => entry.name.includes('video'))
  .forEach((entry) => console.log(`${entry.name}: ${entry.duration}ms`));
```

## Migration Guide

### From Current Implementation

The enhanced implementation maintains full backward compatibility while adding new features:

1. **Existing code continues to work** - no breaking changes
2. **Lazy loading** - add `data-lazy="true"` to enable
3. **Enhanced error handling** - automatic with improved modules
4. **Performance gains** - automatic with enhanced script loading

### Upgrade Path

```javascript
// Replace current imports
import modalVideo from './modules/modal-video.js';
import inlineVideo from './modules/inline-video.js';

// With simplified single-player version
import videoComponent from './video.js';

// Initialize with modern features
videoComponent.init();
```

## Extending with New Providers

To add a new provider using functional patterns:

1. Create provider module in `modules/providers/` using factory pattern
2. Implement modal and inline player factory functions
3. Export provider configuration and utilities
4. Add to provider maps in main modules
5. Update templates with new provider data attributes

```javascript
// Example provider implementation
export const createNewProviderModalPlayer = async (videoId, targetId, options) => {
  // Load provider assets
  await loadScript('https://provider.com/api.js');
  
  // Create player
  const player = new ProviderAPI.Player(targetId, { videoId, ...options });
  
  // Register with player manager
  setActivePlayer(player, 'newprovider', videoId);
  
  // Setup events
  player.on('play', () => eventBus.emit(VIDEO_EVENTS.PLAY, { provider: 'newprovider', videoId }));
  player.on('ended', () => eventBus.emit(VIDEO_EVENTS.ENDED, { provider: 'newprovider', videoId }));
  
  return player;
};

export const createNewProviderInlinePlayer = async (element, videoId, options) => {
  // Similar pattern for inline players
  // Include trigger/close button setup
  // Integrate with single-player management
};
```
