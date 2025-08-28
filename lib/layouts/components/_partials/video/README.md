# Video Component

Flexible video component supporting YouTube, Vimeo, and self-hosted videos with inline and modal display options.

## Features

- **Multiple Sources**: YouTube, Vimeo, and self-hosted video support
- **Display Modes**: Inline playback or modal overlay
- **Responsive Design**: Automatic sizing across all devices
- **Lazy Loading**: Videos load only when needed for performance
- **Custom Controls**: Enhanced player controls and functionality
- **Accessibility**: Full keyboard navigation and screen reader support

## Data Structure

```yaml
video:
  inline: true               # true for inline, false for modal
  src: "youtube"            # 'youtube', 'vimeo', or file path
  id: "dQw4w9WgXcQ"        # Video ID for YouTube/Vimeo
  tn: "/assets/images/video-thumbnail.jpg"  # Thumbnail for modal
  startTime: 0              # Start time in seconds (optional)
  endTime: null            # End time in seconds (optional)
```

## Properties

- `inline`: Display video inline (true) or in modal overlay (false)
- `src`: Video source type ('youtube', 'vimeo', or direct file path)
- `id`: Video identifier for YouTube/Vimeo
- `tn`: Thumbnail image path (used for modal display)
- `startTime`: Optional start time in seconds
- `endTime`: Optional end time in seconds

## HTML Structure

### Inline Video
```html
<div class="video media inline">
  <div class="js-inline-video-wrapper">
    <div class="js-inline-video" 
         data-videoid="dQw4w9WgXcQ"
         data-starttime="0"
         data-endtime="">
    </div>
  </div>
  <button class="video-play-button" aria-label="Play video">
    <span class="play-icon">▶</span>
  </button>
</div>
```

### Modal Video
```html
<div class="video media modal">
  <button class="js-modal-video" 
          data-videoid="dQw4w9WgXcQ"
          data-startTime="0"
          data-endTime=""
          aria-label="Open video in modal">
    <img src="/assets/images/video-thumbnail.jpg" alt="Video thumbnail">
    <span class="video-play-overlay">
      <span class="play-icon">▶</span>
    </span>
  </button>
</div>
```

## Usage Examples

### YouTube Inline Video
```yaml
video:
  inline: true
  src: youtube
  id: "dQw4w9WgXcQ"
```

### YouTube Modal Video
```yaml
video:
  inline: false
  src: youtube
  id: "dQw4w9WgXcQ"
  tn: "/assets/images/video-preview.jpg"
```

### Vimeo Video
```yaml
video:
  inline: true
  src: vimeo
  id: "123456789"
```

### Self-Hosted Video
```yaml
video:
  inline: true
  src: "/assets/videos/demo.mp4"
```

### Video with Time Controls
```yaml
video:
  inline: false
  src: youtube
  id: "dQw4w9WgXcQ"
  startTime: 30
  endTime: 120
  tn: "/assets/images/tutorial-preview.jpg"
```

## YouTube Integration

The component automatically loads the YouTube IFrame API and provides:

- **Player Controls**: Play, pause, seek functionality
- **State Management**: Tracking of play, pause, end states
- **Quality Selection**: Automatic quality based on connection
- **Fullscreen Support**: Native fullscreen capabilities

### Player Parameters
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

## Modal Functionality

### Modal Features
- **Backdrop Click**: Click outside to close
- **ESC Key**: Keyboard close functionality  
- **Scroll Lock**: Prevents background scrolling
- **Focus Management**: Proper focus handling
- **Volume Fade**: Smooth audio fade on close

### Modal Structure
```html
<div id="video-overlay" class="video-modal">
  <span class="close">[Close]</span>
  <div class="responsive-wrapper">
    <div class="video-container">
      <div id="ytvideo"></div>
    </div>
  </div>
</div>
```

## CSS Classes

- `.video`: Main video container
- `.media`: Media wrapper class
- `.inline`: Inline display mode
- `.modal`: Modal display mode
- `.js-inline-video`: JavaScript hook for inline videos
- `.js-modal-video`: JavaScript hook for modal videos
- `.video-playing`: Applied during video playback
- `.video-play-button`: Play button styling
- `.video-play-overlay`: Modal thumbnail overlay

## Responsive Design

```css
.video {
  position: relative;
  width: 100%;
}

.video.inline {
  aspect-ratio: 16 / 9;
  background: #000;
}

.video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .video {
    aspect-ratio: 16 / 9;
  }
}
```

## JavaScript API

### Video Control Methods
```javascript
// Play video
player.playVideo();

// Pause video
player.pauseVideo();

// Stop video
player.stopVideo();

// Set volume (0-100)
player.setVolume(50);

// Mute/Unmute
player.mute();
player.unMute();

// Seek to time
player.seekTo(seconds, allowSeekAhead);
```

### Event Handling
```javascript
// Player state changes
function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      console.log('Video is playing');
      break;
    case YT.PlayerState.PAUSED:
      console.log('Video is paused');
      break;
    case YT.PlayerState.ENDED:
      console.log('Video ended');
      break;
  }
}
```

## Performance Optimization

### Lazy Loading
- Videos load only when triggered
- Thumbnails used for modal videos
- API loaded asynchronously

### Resource Management
```javascript
// Clean up players when done
function destroyPlayer(player) {
  if (player && typeof player.destroy === 'function') {
    player.destroy();
  }
}
```

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper labeling and descriptions
- **Focus Management**: Logical focus flow
- **ARIA Labels**: Descriptive button labels
- **High Contrast**: Works with high contrast modes

## Browser Support

- **YouTube API**: Supported in all modern browsers
- **HTML5 Video**: Native support for self-hosted videos  
- **Mobile**: Excellent support on iOS and Android
- **Fullscreen**: Native fullscreen API support

## Best Practices

1. **Thumbnail Quality**: Use high-quality thumbnails for modal videos
2. **Loading Performance**: Lazy load videos for better page speed
3. **Accessibility**: Always provide descriptive labels
4. **Mobile Experience**: Test video playback on actual devices
5. **Fallbacks**: Provide fallback content for unsupported browsers

## Troubleshooting

### Common Issues
- **API Loading**: Ensure YouTube API loads before initialization
- **HTTPS Required**: YouTube embeds require HTTPS in production
- **Autoplay Policies**: Modern browsers restrict autoplay
- **Mobile Limitations**: iOS requires user interaction for playback

### Debug Methods
```javascript
// Check if API is ready
if (window.YT && window.YT.Player) {
  console.log('YouTube API is loaded');
}

// Player ready callback
function onPlayerReady(event) {
  console.log('Player is ready');
}
```