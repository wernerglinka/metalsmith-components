/**
 * Audio Playlist Component
 * Handles internal audio playback and external source embeds via video modal system
 */

// Import video modal utilities and providers
import { createVideoOverlay, closeModal } from '../video/modules/helpers/video-utils.js';
import { createYouTubeModal } from '../video/modules/providers/youtube.js';

// Import podcast providers
import { createApplePodcastModal } from './modules/providers/apple-podcasts.js';
import { createSpotifyModal } from './modules/providers/spotify.js';
import { createSoundCloudModal } from './modules/providers/soundcloud.js';

class AudioPlaylist {
  constructor(container) {
    this.container = container;
    this.playlistName = container.dataset.playlist;
    this.currentTrack = null;
    this.audioElement = container.querySelector('[data-audio-element]');
    this.isPlaying = false;

    // UI elements
    this.currentTrackDisplay = container.querySelector('[data-current-track]');
    this.audioPlayer = container.querySelector('[data-audio-player]');
    this.externalSources = container.querySelector('[data-external-sources]');
    this.trackButtons = container.querySelectorAll('[data-track-button]');

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupAudioEvents();
  }

  bindEvents() {
    // Use event delegation to avoid duplicate listeners
    this.container.addEventListener('click', (e) => {
      const trackButton = e.target.closest('[data-track-button]');
      const listenButton = e.target.closest('.listen-now-button');
      
      if (trackButton) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Track button clicked via delegation:', trackButton.closest('.track-item').dataset.trackId);
        this.selectTrack(trackButton.closest('.track-item'));
      } else if (listenButton) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Listen now button clicked');
        this.openPodcastInModal();
      }
    });
  }

  openPodcastInModal() {
    const podcastData = this.getPodcastData();
    if (!podcastData || !podcastData.platform || !podcastData.podcastUrl) {
      console.error('Missing podcast data for modal');
      return;
    }

    const { platform, podcastUrl } = podcastData;
    
    console.log('Opening podcast in modal:', platform, podcastUrl);
    
    // Check if platform supports embedding
    if (this.canEmbed(platform, podcastUrl)) {
      this.showEmbeddedPlayer(platform, podcastUrl);
    } else {
      // Fallback to opening in new tab
      window.open(podcastUrl, '_blank', 'noopener,noreferrer');
    }
  }

  setupAudioEvents() {
    if (!this.audioElement) {return;}

    this.audioElement.addEventListener('ended', () => {
      this.playNext();
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayingState();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayingState();
    });
  }

  selectTrack(trackItem) {
    // Remove active state from all tracks
    this.container.querySelectorAll('.track-item').forEach(item => {
      item.classList.remove('active');
    });

    // Add active state to selected track
    trackItem.classList.add('active');

    // Get track data
    const trackDataScript = trackItem.querySelector('[data-track-data]');
    if (!trackDataScript) {return;}

    try {
      this.currentTrack = JSON.parse(trackDataScript.textContent);
      this.displayCurrentTrack();
      this.playTrack();
    } catch (error) {
      console.error('Error parsing track data:', error);
    }
  }

  playTrack() {
    if (!this.currentTrack) {return;}

    // Hide both players initially
    this.audioPlayer.style.display = 'none';
    this.externalSources.style.display = 'none';

    // Check if it's an internal podcast with audio file
    if (this.currentTrack.audioFile) {
      this.setupInternalPlayback();
      return;
    }

    // External podcast - use podcast-level URL with platform
    this.playExternalPodcast();
  }

  playExternalPodcast() {
    // Get podcast data from container
    const podcastData = this.getPodcastData();
    if (!podcastData || !podcastData.platform || !podcastData.podcastUrl) {
      console.error('Missing podcast data or platform info');
      return;
    }

    const { platform, podcastUrl } = podcastData;
    
    console.log('Opening external podcast:', platform, podcastUrl);
    
    // Check if platform supports embedding
    if (this.canEmbed(platform, podcastUrl)) {
      this.showEmbeddedPlayer(platform, podcastUrl);
    } else {
      // Fallback to opening in new tab
      window.open(podcastUrl, '_blank', 'noopener,noreferrer');
      this.showExternalPlayback(platform, podcastUrl);
    }
  }

  getPodcastData() {
    // Extract podcast metadata from the playlist header or container
    const playlistHeader = this.container.querySelector('.playlist-header');
    if (!playlistHeader) {return null;}
    
    // For now, we'll need to pass this data through the template
    // This is a temporary solution until we restructure the data flow
    return {
      platform: this.container.dataset.platform,
      podcastUrl: this.container.dataset.podcastUrl
    };
  }

  playBestExternalSource(sources) {
    // Priority order for external platforms - prioritize embeddable sources
    const platformPriority = ['youtube', 'apple', 'spotify', 'soundcloud', 'google', 'rss'];
    
    let bestSource = null;
    let bestPlatform = null;

    // Find the highest priority platform available
    for (const platform of platformPriority) {
      if (sources[platform]) {
        bestSource = sources[platform];
        bestPlatform = platform;
        break;
      }
    }

    if (bestSource) {
      console.log('Opening external source in modal:', bestPlatform, bestSource);
      console.log('Available sources:', sources);
      
      // Check if source can be embedded
      if (this.canEmbed(bestPlatform, bestSource)) {
        this.showEmbeddedPlayer(bestPlatform, bestSource);
      } else {
        // Fallback to opening in new tab
        this.showExternalPlayback(bestPlatform, bestSource);
        window.open(bestSource, '_blank', 'noopener,noreferrer');
      }
    }
  }

  canEmbed(platform, url) {
    // Define which platforms support embedding
    const embeddablePlatforms = {
      youtube: (url) => url.includes('youtube.com/watch') || url.includes('youtu.be/'),
      spotify: (url) => url.includes('open.spotify.com/'),
      soundcloud: (url) => url.includes('soundcloud.com/'),
      apple: (url) => url.includes('podcasts.apple.com/')
    };

    return embeddablePlatforms[platform] && embeddablePlatforms[platform](url);
  }

  showEmbeddedPlayer(platform, url) {
    // Create modal using video utilities
    const { overlay, container, closeButton } = createVideoOverlay();
    
    // Add class for audio content
    overlay.classList.add('audio-modal');
    
    closeButton.onclick = () => {
      closeModal();
    };

    // Create target element for the player
    const targetId = `${platform}-player-${Date.now()}`;
    const target = document.createElement('div');
    target.id = targetId;
    container.appendChild(target);

    // Handle different platforms with dedicated providers
    this.createPlatformPlayer(platform, url, targetId);

    // Show modal
    document.body.classList.add('modal-active');
    overlay.classList.add('is-open');
    
    // Show status in playlist
    this.showModalStatus(platform);
  }

  async createPlatformPlayer(platform, url, targetId) {
    try {
      switch (platform) {
        case 'youtube':
          const videoId = this.extractYouTubeId(url);
          if (videoId) {
            await createYouTubeModal(videoId, targetId, {});
          }
          break;
        case 'apple':
          createApplePodcastModal(url, targetId);
          break;
        case 'spotify':
          createSpotifyModal(url, targetId);
          break;
        case 'soundcloud':
          createSoundCloudModal(url, targetId);
          break;
        default:
          console.warn(`Unsupported platform: ${platform}`);
          // Fallback to iframe
          this.createIframePlayer(document.getElementById(targetId).parentElement, platform, url);
      }
    } catch (error) {
      console.error(`Error creating ${platform} player:`, error);
      // Fallback to opening in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  async createYouTubePlayer(container, url) {
    const videoId = this.extractYouTubeId(url);
    if (!videoId) {return;}

    // Create a div for the YouTube player
    const playerDiv = document.createElement('div');
    playerDiv.id = `youtube-player-${Date.now()}`;
    container.appendChild(playerDiv);

    try {
      // Use the same YouTube API as video component
      await createYouTubeModal(videoId, playerDiv.id, {});
    } catch (error) {
      console.error('Error creating YouTube player:', error);
      // Fallback to iframe
      this.createIframePlayer(container, 'youtube', url);
    }
  }

  createIframePlayer(container, platform, url) {
    const embedUrl = this.getEmbedUrl(platform, url);
    if (embedUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.width = '100%';
      iframe.height = '400';
      iframe.frameBorder = '0';
      iframe.allow = 'encrypted-media';
      iframe.title = `${this.currentTrack.title} - ${this.currentTrack.artist}`;
      
      container.appendChild(iframe);
    }
  }

  getEmbedUrl(platform, url) {
    const embedUrls = {
      youtube: (url) => {
        const videoId = this.extractYouTubeId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
      },
      spotify: (url) => {
        return url.replace('open.spotify.com', 'open.spotify.com/embed');
      },
      soundcloud: (url) => {
        return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
      }
    };

    return embedUrls[platform] ? embedUrls[platform](url) : null;
  }

  extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }

  showModalStatus(platform) {
    const platformNames = {
      youtube: 'YouTube',
      spotify: 'Spotify', 
      soundcloud: 'SoundCloud',
      apple: 'Apple Podcasts'
    };

    const sourceLinksContainer = this.externalSources.querySelector('[data-source-links]');
    sourceLinksContainer.innerHTML = `
      <div class="modal-opened">
        <p>Playing in ${platformNames[platform] || platform} player</p>
      </div>
    `;
    
    this.externalSources.style.display = 'block';
  }

  showExternalPlayback(platform, url) {
    const platformNames = {
      youtube: 'YouTube',
      spotify: 'Spotify', 
      soundcloud: 'SoundCloud',
      apple: 'Apple Podcasts',
      google: 'Google Podcasts',
      rss: 'RSS Feed'
    };

    const sourceLinksContainer = this.externalSources.querySelector('[data-source-links]');
    sourceLinksContainer.innerHTML = `
      <div class="auto-opened">
        <p>Opening in ${platformNames[platform] || platform}...</p>
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          Click if it didn't open automatically
        </a>
      </div>
    `;
    
    this.externalSources.style.display = 'block';
  }

  displayCurrentTrack() {
    if (!this.currentTrack) {return;}

    // Update current track display
    const thumbnail = this.currentTrackDisplay.querySelector('[data-current-thumbnail]');
    const title = this.currentTrackDisplay.querySelector('[data-current-title]');
    const artist = this.currentTrackDisplay.querySelector('[data-current-artist]');
    const description = this.currentTrackDisplay.querySelector('[data-current-description]');

    if (thumbnail) {
      thumbnail.src = this.currentTrack.thumbnail || '';
      thumbnail.alt = this.currentTrack.title || '';
    }
    if (title) {title.textContent = this.currentTrack.title || '';}
    if (artist) {artist.textContent = this.currentTrack.artist || '';}
    if (description) {description.textContent = this.currentTrack.description || '';}
  }

  setupInternalPlayback() {
    if (!this.currentTrack.audioFile) {return;}
    
    // Update audio sources - for now just use the single audio file for both
    const oggSource = this.audioPlayer.querySelector('[data-audio-ogg]');
    const mp3Source = this.audioPlayer.querySelector('[data-audio-mp3]');

    // Clear OGG source since we only have one file
    if (oggSource) {
      oggSource.src = '';
    }
    
    if (mp3Source) {
      mp3Source.src = this.currentTrack.audioFile;
    }

    // Load the new sources
    if (this.audioElement) {
      this.audioElement.load();
    }

    // Show audio player
    this.audioPlayer.style.display = 'block';
  }


  playNext() {
    const currentItem = this.container.querySelector('.track-item.active');
    if (!currentItem) {return;}

    const nextItem = currentItem.nextElementSibling;
    if (nextItem && nextItem.classList.contains('track-item')) {
      this.selectTrack(nextItem);
      
      // Auto-play if it's an internal track
      if (this.currentTrack && this.currentTrack.type === 'internal' && this.audioElement) {
        setTimeout(() => {
          this.audioElement.play().catch(console.error);
        }, 100);
      }
    }
  }

  updatePlayingState() {
    this.container.classList.toggle('playing', this.isPlaying);
  }
}

/**
 * Initialize all audio playlists on the page
 */
function initAudioPlaylists() {
  // Only initialize playlists that don't already have an instance
  document.querySelectorAll('.audio-playlist:not(.initialized)').forEach(playlist => {
    playlist.classList.add('initialized');
    console.log('Initializing playlist:', playlist.dataset.playlist);
    new AudioPlaylist(playlist);
  });
}

// Single initialization with immediate check
(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioPlaylists);
  } else {
    initAudioPlaylists();
  }
})();

export { AudioPlaylist, initAudioPlaylists };