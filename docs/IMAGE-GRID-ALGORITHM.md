# Image Grid Algorithm

This document explains the justified image grid layout algorithm used in the `image-grid` component, how it works, and how it differs from the original Justified Image Grid (JIG) WordPress plugin.

## Overview

The image grid creates a justified gallery layout where images in each row share the same height but have varying widths based on their aspect ratios. Each row fills 100% of the container width, similar to how text justification works in a word processor.

## Algorithm Steps

### 1. Image Loading and Aspect Ratio Calculation

Before layout can begin, all images must be loaded to determine their natural dimensions. The algorithm:

- Waits for all images to load using Promise.all
- Calculates each image's aspect ratio (width / height)
- Caches aspect ratios in a Map to avoid recalculation on resize

### 2. Row Building (Greedy Packing)

The algorithm builds rows using a greedy approach based on target row height:

```
For each image:
  1. Add image to current row
  2. Calculate cumulative aspect ratio sum for row
  3. Calculate resulting row height if row were justified:
     rowHeight = (containerWidth - gaps) / aspectRatioSum
  4. If rowHeight <= targetRowHeight:
     - Finalize this row
     - Start a new row
  5. If this is the last image:
     - Finalize the row (may be partial)
```

This approach naturally produces rows where the height is close to (but not exceeding) the target height. Rows with more landscape images will be shorter; rows with portrait images will be taller.

### 3. Width Calculation

For each row, image widths are calculated proportionally based on their aspect ratios:

```
availableWidth = containerWidth - totalGapWidth
width[i] = round((aspectRatio[i] / rowAspectSum) * availableWidth)
```

### 4. Pixel Distribution

Due to rounding, the sum of calculated widths may not exactly equal the available width. The algorithm distributes remaining pixels one at a time:

```javascript
function distributeRemainingPixels(widths, remaining) {
  const adjustment = remaining > 0 ? 1 : -1;
  let index = 0;

  while (remaining !== 0) {
    widths[index] += adjustment;
    remaining -= adjustment;
    index = (index + 1) % widths.length;
  }
}
```

This ensures integer pixel widths that sum exactly to the available space, avoiding subpixel rendering issues.

### 5. Last Row Handling

The last row receives special treatment because it may not have enough images to fill naturally. The algorithm uses a threshold:

- If the calculated row height would be <= 2x the target height, fill the row normally
- If the row would be too tall (e.g., only 1-2 images), use the target height and don't justify

This prevents awkwardly stretched images on the final row.

### 6. Subpixel Absorption

Modern browsers can report container widths with fractional pixels (e.g., 1678.43px). Even with integer math, this can cause small gaps. The solution:

The last item in each row uses `flex-grow: 1` with a `max-width` constraint:

```javascript
if (fillRow && isLastInRow) {
  item.style.flex = `1 0 ${width}px`;
  item.style.maxWidth = `${width + 1}px`;
} else {
  item.style.flex = '0 0 auto';
}
```

This allows the last item to grow by up to 1px to absorb any fractional remainder, eliminating gaps without visibly distorting the image.

## Comparison with JIG (Justified Image Grid)

### Similarities

Both algorithms share the same fundamental approach:

1. **Greedy row packing** based on target height
2. **Proportional width calculation** using aspect ratio sums
3. **Integer pixel distribution** to avoid subpixel issues
4. **Last row special handling** to prevent over-stretching

### Differences

| Aspect | JIG (Original) | Our Implementation |
|--------|---------------|-------------------|
| Layout method | Float-based with clearfix | Flexbox with wrap |
| Dependencies | jQuery required | Vanilla JavaScript |
| Configuration | heightDeviation parameter | maxLastRowHeight threshold |
| Subpixel handling | Integer math only | flex-grow absorption on last item |
| Resize handling | Window resize event | ResizeObserver with debounce |
| Image loading | imagesLoaded plugin | Native Promise-based loading |

### Why Flexbox Over Floats

The original JIG used float-based layout, which was standard practice when it was created. Our implementation uses flexbox because:

1. **No clearfix needed** - Flexbox naturally contains its children
2. **Simpler alignment** - `align-items: flex-start` handles vertical alignment
3. **Gap absorption** - The last item's `flex-grow` elegantly handles fractional pixels
4. **Better browser support** - Flexbox is now universally supported

### The Subpixel Problem

The original JIG worked well in an era when container widths were always integers. Modern responsive layouts with percentage-based widths, viewport units, and high-DPI displays often produce fractional container widths.

Our key innovation is using `flex-grow: 1` on the last item of each row. This allows CSS to handle the fractional remainder rather than trying to solve it purely with JavaScript math. The `max-width` constraint ensures the growth is imperceptible (at most 1px).

## Configuration Options

The component accepts two configuration parameters via data attributes:

- `data-gap`: Pixel gap between images (default: 6)
- `data-target-row-height`: Target height for rows in pixels (default: 200)

## Performance Considerations

1. **Aspect ratio caching** - Calculated once per image, reused on resize
2. **ResizeObserver** - More efficient than window resize events
3. **Debouncing** - 50ms debounce prevents excessive recalculation during resize
4. **No layout thrashing** - All reads happen before writes

## No-JavaScript Fallback

If JavaScript fails to load or execute, the CSS provides a fallback grid layout:

```css
.image-grid:not(.is-laid-out) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 6px;
}
```

This ensures images remain visible and reasonably arranged even without the justified layout.
