# Video Component

Multi-provider video component supporting YouTube, Vimeo, and Cloudinary videos with inline and modal display options.

## Features

- **Multiple Providers**: YouTube, Vimeo, and Cloudinary support
- **Display Modes**: Inline playback or modal overlay
- **Responsive Design**: Automatic sizing across all devices
- **Lazy Loading**: Videos and APIs load only when needed
- **Time Controls**: Start and end time support for YouTube
- **Accessibility**: Full keyboard navigation and screen reader support
- **Modular Architecture**: Provider-specific modules for extensibility

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
  inline: true                    # true for inline, false for modal
  src: "youtube"                 # 'youtube', 'vimeo', or 'cloudinary'
  id: "dQw4w9WgXcQ"             # Video ID or public ID
  cloudname: "my-cloud"         # Required for Cloudinary
  tn: "/assets/images/thumb.jpg" # Thumbnail for modal display
  start: 30                     # Start time in seconds (YouTube only)
  end: 120                      # End time in seconds (YouTube only)
```

## Properties

- `inline`: Display video inline (true) or in modal overlay (false)
- `src`: Video provider ('youtube', 'vimeo', 'cloudinary'). Defaults to 'youtube' for backward compatibility
- `id`: Video identifier (YouTube video ID, Vimeo ID, or Cloudinary public ID)
- `cloudname`: Cloudinary cloud name (required for Cloudinary videos)
- `tn`: Thumbnail image path (used for modal display)
- `start`: Optional start time in seconds (YouTube only)
- `end`: Optional end time in seconds (YouTube only)

## Usage Examples

### YouTube Videos

**Basic YouTube Modal:**
```yaml
video:
  inline: false
  src: youtube
  id: "dQw4w9WgXcQ"
  tn: "/assets/images/youtube-thumb.jpg"
```

**YouTube Inline with Time Controls:**
```yaml
video:
  inline: true
  src: youtube
  id: "dQw4w9WgXcQ"
  start: 30
  end: 120
```

**Backward Compatible (defaults to YouTube):**
```yaml
video:
  inline: false
  id: "dQw4w9WgXcQ"
  tn: "/assets/images/thumb.jpg"
```

### Vimeo Videos

**Vimeo Modal:**
```yaml
video:
  inline: false
  src: vimeo
  id: "123456789"
  tn: "/assets/images/vimeo-thumb.jpg"
```

**Vimeo Inline:**
```yaml
video:
  inline: true
  src: vimeo
  id: "123456789"
```

### Cloudinary Videos

**Cloudinary Modal:**
```yaml
video:
  inline: false
  src: cloudinary
  id: "my-video-public-id"
  cloudname: "my-cloud-name"
  tn: "/assets/images/cloudinary-thumb.jpg"
```

**Cloudinary Inline:**
```yaml
video:
  inline: true
  src: cloudinary
  id: "my-video-public-id"
  cloudname: "my-cloud-name"
```

## HTML Structure

### Inline Video
```html
<div class="video media inline">
  <div class="inline-video-wrapper js-inline-video-wrapper">
    <div class="js-inline-video" 
         data-videoid="dQw4w9WgXcQ"
         data-videosrc="youtube"
         data-starttime="30"
         data-endtime="120">
    </div>
  </div>
  <button class="video-trigger">
    <div class="play-button"></div>
    <img src="/assets/images/thumb.jpg" alt="Video thumbnail">
  </button>
</div>
```

### Modal Video
```html
<div class="video media">
  <button class="js-modal-video" 
          data-videoid="dQw4w9WgXcQ"
          data-videosrc="youtube"
          data-starttime="30"
          data-endtime="120">
    <div class="play-button"></div>
    <img src="/assets/images/thumb.jpg" alt="Video thumbnail">
  </button>
</div>
```

## Architecture

### Module Structure
```
modules/
├── helpers/
│   ├── dom.js              # DOM manipulation utilities
│   ├── modal.js            # Modal control functions
│   ├── load-script.js      # Dynamic script loading
│   ├── load-styles.js      # Dynamic stylesheet loading
│   └── load-youtube-api.js # YouTube API loader
├── providers/
│   ├── youtube.js          # YouTube player implementation
│   ├── vimeo.js           # Vimeo player implementation
│   └── cloudinary.js      # Cloudinary player implementation
├── inline-video.js        # Inline video controller
└── modal-video.js         # Modal video controller
```

### Provider Interface
Each provider implements:
- `providerModalPlayer(index, videoId, cloudName, options)` - Creates modal player
- `providerInlinePlayer(element, index, cloudName, options)` - Creates inline player

## Provider-Specific Features

### YouTube Integration
- **YouTube IFrame API**: Automatic loading and initialization
- **Player States**: Full state management (playing, paused, ended)
- **Time Controls**: Start and end time parameters
- **Player Variables**: Configurable player options

```javascript
const playerVars = {
  autoplay: 0,              // Manual start
  controls: 1,              // Show controls
  enablejsapi: 1,          // Enable API
  rel: 0,                  // No related videos
  start: startTime,        // Start time
  end: endTime            // End time
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

### Dynamic Loading
- **Provider APIs**: Loaded only when needed
- **Script Deduplication**: Prevents multiple API loads
- **Style Loading**: CSS loaded for Cloudinary only when used

### Resource Management
```javascript
// APIs are loaded on demand
loadYouTubeAPI().then(() => {
  // Initialize YouTube player
});

loadScript('https://player.vimeo.com/api/player.js').then(() => {
  // Initialize Vimeo player
});
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all providers
- **Screen Readers**: Proper ARIA labeling
- **Focus Management**: Logical focus flow in modals
- **High Contrast**: Compatible with high contrast modes

## Browser Support

- **Modern Browsers**: Full support in Chrome, Firefox, Safari, Edge
- **Mobile**: Excellent support on iOS and Android
- **Provider APIs**: Dependent on provider browser support
- **Fallbacks**: Graceful degradation for unsupported features

## Best Practices

1. **Provider Selection**: Choose the right provider for your needs
2. **Thumbnail Quality**: Use high-quality thumbnails for modal videos
3. **Cloudinary Setup**: Ensure proper cloud name configuration
4. **Performance**: Test loading times with multiple videos
5. **Accessibility**: Always provide descriptive alt text for thumbnails

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
// Check API loading
window.videoAPIReady?.then(() => {
  console.log('YouTube API ready');
});

// Provider error handling
console.warn(`Unsupported video provider: ${providerId}`);
```

## Extending with New Providers

To add a new provider:

1. Create provider module in `modules/providers/`
2. Implement modal and inline player functions
3. Add to provider maps in `modal-video.js` and `inline-video.js`
4. Update template to handle new provider data attributes
5. Document provider-specific options