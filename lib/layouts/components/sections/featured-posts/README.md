# Featured Posts Section

Dynamic section for showcasing highlighted blog posts or articles with flexible layout options and automatic post filtering.

## Features

- **Automatic Filtering**: Displays posts marked as featured
- **Responsive Grid**: Adapts to different screen sizes
- **Post Metadata**: Shows publication date, author, and categories
- **Read More Links**: Direct navigation to full posts
- **SEO Optimized**: Proper structured data and meta information
- **Customizable Count**: Control number of featured posts displayed

## Data Structure

```yaml
- sectionType: featured-posts
  containerTag: section
  containerFields:
    inContainer: true
    isAnimated: true
  text:
    leadIn: "Featured Content"
    title: "Latest Articles"
    titleTag: "h2"
    prose: "Discover our most popular and recent blog posts."
  config:
    count: 3
    showDate: true
    showAuthor: true
    showExcerpt: true
```

## Properties

- `config.count`: Number of featured posts to display (default: 3)
- `config.showDate`: Display publication date (default: true)
- `config.showAuthor`: Display author information (default: true)
- `config.showExcerpt`: Display post excerpt (default: true)
- `config.orderBy`: Sort order ('date', 'title', 'featured_priority')
- `config.category`: Filter by specific category (optional)

## HTML Structure

```html
<section class="featured-posts">
  <div class="container">
    <header class="section-header">
      <p class="lead-in">Featured Content</p>
      <h2>Latest Articles</h2>
      <div class="prose">
        <p>Discover our most popular and recent blog posts.</p>
      </div>
    </header>
    
    <div class="posts-grid">
      <article class="post-card">
        <header class="post-header">
          <img src="/assets/images/post-thumbnail.jpg" alt="Post title">
        </header>
        
        <div class="post-content">
          <div class="post-meta">
            <time datetime="2023-12-01">December 1, 2023</time>
            <span class="post-author">By John Doe</span>
          </div>
          
          <h3 class="post-title">
            <a href="/blog/post-slug">Post Title</a>
          </h3>
          
          <p class="post-excerpt">Post excerpt content...</p>
          
          <footer class="post-footer">
            <a href="/blog/post-slug" class="read-more">Read More</a>
          </footer>
        </div>
      </article>
    </div>
  </div>
</section>
```

## Post Requirements

Posts must have the following frontmatter to be considered featured:

```yaml
---
title: "Post Title"
date: 2023-12-01
author: "John Doe"
featured: true
featuredPriority: 1
excerpt: "Brief description of the post content"
image: "/assets/images/post-thumbnail.jpg"
categories: ["Technology", "Web Development"]
---
```

## Usage Examples

### Basic Featured Posts
```yaml
- sectionType: featured-posts
  text:
    title: "Featured Articles"
    prose: "Check out our most popular content."
  config:
    count: 4
```

### Category-Specific Featured Posts
```yaml
- sectionType: featured-posts
  text:
    title: "Featured Tutorials"
    prose: "Latest tutorials and guides."
  config:
    count: 3
    category: "tutorials"
    showAuthor: false
```

### Minimal Featured Posts
```yaml
- sectionType: featured-posts
  text:
    title: "Recent Posts"
  config:
    count: 2
    showDate: false
    showAuthor: false
    showExcerpt: false
```

## CSS Classes

- `.featured-posts`: Main section container
- `.posts-grid`: Grid container for post cards
- `.post-card`: Individual post card
- `.post-header`: Post thumbnail area
- `.post-content`: Post text content area
- `.post-meta`: Date, author, category information
- `.post-title`: Post title with link
- `.post-excerpt`: Post description/excerpt
- `.post-footer`: Read more link area
- `.read-more`: Read more link styling

## Responsive Grid

```css
.posts-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

## Post Filtering Logic

The component automatically filters posts based on:

1. **Featured Flag**: `featured: true` in frontmatter
2. **Publication Status**: Published posts only
3. **Category Filter**: If specified in config
4. **Sort Order**: By date (newest first) or priority

### Custom Filtering
```yaml
config:
  count: 5
  category: "web-development"
  orderBy: "featured_priority"
  dateRange: "last-30-days"
```

## SEO and Structured Data

The component generates proper structured data for search engines:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2023-12-01",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "image": "/assets/images/post-thumbnail.jpg"
}
```

## Accessibility Features

- **Semantic HTML**: Proper use of `article`, `header`, `footer` elements
- **Heading Hierarchy**: Logical heading structure
- **Alt Text**: Descriptive alt text for post images
- **Link Context**: Clear link purposes and descriptions
- **ARIA Labels**: Enhanced accessibility for screen readers

## Performance Optimization

### Image Loading
```html
<img src="/assets/images/post-thumbnail.jpg" 
     alt="Post title"
     loading="lazy"
     width="400"
     height="225">
```

### Excerpt Generation
- Automatic excerpt from post content if not provided
- Configurable excerpt length
- Strip HTML tags for clean text

## Integration with CMS

### Metalsmith Integration
```javascript
// In metalsmith build process
.use(collections({
  featuredPosts: {
    pattern: 'blog/**/*.md',
    filterBy: (post) => post.featured === true,
    sortBy: 'date',
    reverse: true,
    limit: 10
  }
}))
```

### Frontmatter Processing
```javascript
// Automatic excerpt generation
.use((files, metalsmith, done) => {
  Object.keys(files).forEach(file => {
    if (!files[file].excerpt && files[file].contents) {
      files[file].excerpt = generateExcerpt(files[file].contents, 150);
    }
  });
  done();
})
```

## Customization Options

### Grid Layout Variants
```yaml
config:
  layout: "masonry"     # grid, masonry, list
  columns: 3            # Force specific column count
  cardStyle: "minimal"  # default, minimal, card
```

### Display Options
```yaml
config:
  showThumbnails: true
  showCategories: true
  showReadTime: true
  dateFormat: "MMM d, yyyy"
  excerptLength: 120
```

## Best Practices

1. **Image Optimization**: Use appropriately sized thumbnails
2. **Excerpt Length**: Keep excerpts concise and engaging
3. **Featured Priority**: Use priority numbers for fine-tuned ordering
4. **Mobile Experience**: Ensure cards work well on touch devices
5. **Loading Performance**: Implement lazy loading for images

## Error Handling

### No Featured Posts
```html
<div class="no-posts-message">
  <p>No featured posts available at this time.</p>
  <a href="/blog" class="view-all-posts">View All Posts</a>
</div>
```

### Fallback Content
If no featured posts exist, the component can:
- Show most recent posts instead
- Display a custom message
- Hide the section entirely
- Show placeholder content