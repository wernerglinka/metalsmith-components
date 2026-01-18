# @metalsmith/collections v2.0 Migration Guide

This guide documents the breaking changes in `@metalsmith/collections` v2.0 and how to fix them in Metalsmith projects.

## Breaking Changes Summary

### 1. Sort Configuration Changed

**Before (v1.x):**
```javascript
collections({
  'blog': {
    pattern: 'blog/*.md',
    sortBy: 'date',
    reverse: true
  }
})
```

**After (v2.0):**
```javascript
collections({
  'blog': {
    pattern: 'blog/*.md',
    sort: 'date:desc'
  }
})
```

The `sortBy` and `reverse` options are replaced by a single `sort` option using the format `'<key>:<asc|desc>'`. When order is omitted, `desc` is the default.

**Nested keypaths are supported:**
```javascript
sort: 'card.date:desc'
sort: 'metadata.publishDate:asc'
```

### 2. Previous/Next References Restructured

**Before (v1.x):**
References were stored directly on the file object:
```javascript
file.previous  // single file object or undefined
file.next      // single file object or undefined
```

**After (v2.0):**
References are stored as arrays under `file.collection['collection-name']`:
```javascript
file.collection['blog'].previous  // array of file objects
file.collection['blog'].next      // array of file objects
file.collection['blog'].first     // single file object
file.collection['blog'].last      // single file object
```

To get the immediate previous/next (equivalent to v1.x behavior):
```javascript
file.collection['blog'].previous[0]  // immediate previous
file.collection['blog'].next[0]      // immediate next
```

### 3. Path Property Changed

**Before (v1.x):**
Files in collection references might have had `urlPath` set by other plugins.

**After (v2.0):**
Collection references capture file state at collection processing time, so only `permalink` is reliably available (if using @metalsmith/permalinks). The `urlPath` property (if set by other plugins later in the pipeline) won't be on collection references.

Use `permalink` instead:
```javascript
// Before
file.previous.urlPath  // e.g., "/blog/my-post/"

// After
file.collection['blog'].previous[0].permalink  // e.g., "blog/my-post"
// Note: permalink doesn't have leading/trailing slashes
```

---

## Template Migration (Nunjucks)

### Accessing Previous/Next in Templates

**Before (v1.x):**
```nunjucks
{% if previous %}
  <a href="{{ previous.urlPath }}">{{ previous.title }}</a>
{% endif %}
{% if next %}
  <a href="{{ next.urlPath }}">{{ next.title }}</a>
{% endif %}
```

**After (v2.0):**
```nunjucks
{% set prev = collection['blog'].previous[0] if collection and collection['blog'] and collection['blog'].previous.length %}
{% set nxt = collection['blog'].next[0] if collection and collection['blog'] and collection['blog'].next.length %}

{% if prev %}
  <a href="/{{ prev.permalink }}/">{{ prev.title }}</a>
{% endif %}
{% if nxt %}
  <a href="/{{ nxt.permalink }}/">{{ nxt.title }}</a>
{% endif %}
```

**Important:** Add leading `/` and trailing `/` to the permalink to create a proper URL path.

### Template Context Issue

If your section/component templates don't have access to `collection`, you may need to pass it through your template rendering chain.

**Example fix for Metalsmith component-based architectures:**

1. Update your render macro to accept `collection`:
```nunjucks
{% macro renderSection(section, data, collections, previous, next, urlPath, collection) %}
  {% include "sections/" + section.sectionType + ".njk" ignore missing %}
{% endmacro %}
```

2. Pass `collection` when calling the macro:
```nunjucks
{{ renderSection(section, data, collections, previous, next, urlPath, collection) }}
```

---

## Quick Reference: Option Mapping

| v1.x Option | v2.0 Equivalent |
|-------------|-----------------|
| `sortBy: 'date'` | `sort: 'date:desc'` |
| `sortBy: 'date', reverse: true` | `sort: 'date:desc'` |
| `sortBy: 'date', reverse: false` | `sort: 'date:asc'` |
| `sortBy: 'title'` | `sort: 'title:desc'` |
| `sortBy: 'nested.key'` | `sort: 'nested.key:desc'` |

## Quick Reference: Property Access

| v1.x Access | v2.0 Equivalent |
|-------------|-----------------|
| `file.previous` | `file.collection['name'].previous[0]` |
| `file.next` | `file.collection['name'].next[0]` |
| `file.previous.urlPath` | `/` + `file.collection['name'].previous[0].permalink` + `/` |
| `file.next.title` | `file.collection['name'].next[0].title` |

---

## Checklist for Migration

1. [ ] Update `metalsmith.js` (or equivalent build file):
   - [ ] Replace `sortBy` + `reverse` with `sort: 'key:asc|desc'`

2. [ ] Update navigation templates that use `previous`/`next`:
   - [ ] Change access pattern to `collection['name'].previous[0]`
   - [ ] Use `permalink` instead of `urlPath` (add leading/trailing slashes)
   - [ ] Add null checks for `collection` and array length

3. [ ] If using component architecture with macros:
   - [ ] Pass `collection` through your render chain
   - [ ] Update macro signatures to accept `collection` parameter

4. [ ] Test all collection-based navigation:
   - [ ] First item should have `next` but no `previous`
   - [ ] Last item should have `previous` but no `next`
   - [ ] Middle items should have both

---

## Example: Complete Blog Navigation Component

```nunjucks
{#
  Blog navigation - shows previous/next post links
  Compatible with @metalsmith/collections v2.0
#}

{% set collectionName = 'blog' %}
{% set prev = collection[collectionName].previous[0] if collection and collection[collectionName] and collection[collectionName].previous.length %}
{% set nxt = collection[collectionName].next[0] if collection and collection[collectionName] and collection[collectionName].next.length %}

{% if prev or nxt %}
  <nav class="post-navigation" aria-label="Post navigation">
    {% if nxt %}
      <a href="/{{ nxt.permalink }}/" class="nav-next">
        <span>← Newer</span>
        <span>{{ nxt.title }}</span>
      </a>
    {% endif %}
    {% if prev %}
      <a href="/{{ prev.permalink }}/" class="nav-prev">
        <span>Older →</span>
        <span>{{ prev.title }}</span>
      </a>
    {% endif %}
  </nav>
{% endif %}
```

---

## Resources

- [@metalsmith/collections GitHub](https://github.com/metalsmith/collections)
- [Metalsmith Documentation](https://metalsmith.io/)
