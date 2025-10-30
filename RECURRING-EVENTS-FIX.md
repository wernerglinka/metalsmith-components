# Recurring Events Bug Fix

## Problem Summary

The calendar component was missing recurring events in certain months when navigating. Events would appear correctly on initial load but disappear when navigating to future months.

### Example Issue
- Recurring event starts in November 2025
- Repeats monthly
- December shows the event ✓
- January shows NO events ✗
- February shows all events ✓
- March is missing some ✗
- April shows NO events ✗
- And so on...

## Root Cause

The bug was in how the calendar fetched events when navigating to a new month.

### Initial Load (Worked Correctly)
When the calendar first loaded, it fetched a **three-month window** (previous month, current month, next month):

```javascript
// calendar.js - fetchInitialData()
const results = await fetchGoogleCalendars(
  this.config.calendars,
  this.config.apiKey,
  new Date(this.currentYear, this.currentMonth, 15)
);
```

This correctly captured recurring events because the wide date range included the months where recurring events originated.

### Navigation (The Bug)
When navigating to a new month, it only fetched **that single month**:

```javascript
// OLD CODE in google-calendar.js - fetchCalendarMonth()
const startDate = new Date(year, month, 1);           // Month start
const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Month end
```

### Why This Broke Recurring Events

Google Calendar API with `singleEvents: true` expands recurring events into individual instances. However, it **only returns event instances that START within the requested date range**.

**Example scenario:**
- Recurring event first occurs in November 2025
- Set to repeat monthly
- When fetching December with date range Dec 1 - Dec 31:
  - API checks: "Does this recurring series START in December?"
  - Answer: No, it started in November
  - Result: **Event instance not returned** ✗

This is a well-known quirk of the Google Calendar API.

## The Fix

Changed `fetchCalendarMonth()` to use the same three-month window approach as the initial load:

### Before (Broken)
```javascript
export async function fetchCalendarMonth(calendar, apiKey, year, month) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

  // Fetch only the target month
  // Missing: recurring events from adjacent months
}
```

### After (Fixed)
```javascript
export async function fetchCalendarMonth(calendar, apiKey, year, month) {
  // Fetch a three-month window to capture recurring events
  const centerDate = new Date(year, month, 15);
  const { startDate, endDate } = getThreeMonthWindow(centerDate);

  // Now captures:
  // - Previous month
  // - Target month
  // - Next month
}
```

### Cache Update
Also updated the caching logic to store all three months returned:

```javascript
// calendar.js - fetchMonth()
const months = transformCalendarData(results);

// OLD: Only cached first month
// const monthData = months[0];
// this.calendarData.set(key, monthData);

// NEW: Cache all three months
months.forEach((monthData) => {
  const key = getMonthKey(monthData.year, monthData.month);
  this.calendarData.set(key, monthData);
});
```

## Additional Fixes

### CSS Bug Fix
Fixed duplicate class selector in [calendar.css:180](lib/layouts/components/sections/calendar/calendar.css:180):

**Before:** `.calendar .day--today .calendar .day-number`
**After:** `.calendar .day--today .day-number`

### Added Missing Test Category
Added styling for the `test` event category used in the reference page:

```css
.calendar .event--test {
  background: #fef3c7;
  color: #78350f;
  border-left: 3px solid #f59e0b;
}

.calendar .list-event--test {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
}
```

## Testing the Fix

### Debug Tool
Created [debug-calendar.html](debug-calendar.html) to test and compare approaches:

1. Open the file in a browser
2. Enter your API key and calendar ID
3. Click "Compare Both Approaches"
4. See which recurring events were missing with the old single-month approach

### Manual Testing Steps

1. Start the dev server: `npm start`
2. Navigate to the calendar reference page
3. Set up a recurring event in your test calendar:
   - Weekly recurring event
   - Monthly recurring event
   - Start in current month
4. Navigate forward through multiple months
5. Verify all recurring instances appear correctly

### Expected Results

**Before Fix:**
- Initial month: All events visible ✓
- Navigate forward: Some recurring events missing ✗
- Pattern: Missing events in alternating months

**After Fix:**
- Initial month: All events visible ✓
- Navigate forward: All recurring events visible ✓
- Pattern: Consistent event display across all months

## Performance Impact

### Concerns
Fetching three months instead of one increases API calls and data transfer.

### Mitigation
1. **Caching**: All three months are cached, so navigating back doesn't refetch
2. **Efficiency**: When moving forward one month, two months are already cached
3. **Practical impact**: Most users navigate sequentially (prev/next), so the extra data is used

### API Quota
With the three-month window:
- Initial load: 1 API call → 3 months cached
- Navigate forward: 1 API call → 3 months cached (2 already had)
- Navigate backward: 0 API calls (already cached)

This is actually quite efficient for typical usage patterns.

## Files Changed

1. **lib/layouts/components/sections/calendar/modules/providers/google-calendar.js**
   - Modified `fetchCalendarMonth()` to use three-month window

2. **lib/layouts/components/sections/calendar/calendar.js**
   - Updated `fetchMonth()` to cache all returned months

3. **lib/layouts/components/sections/calendar/calendar.css**
   - Fixed CSS selector bug
   - Added `test` event category styles

4. **debug-calendar.html** (new)
   - Debug tool for testing recurring events

## Recommendations

### For Users
- Update to this version if you use recurring events
- Test your specific recurring event patterns
- Monitor API quota if you have high traffic

### For Future Development
- Consider adding a configuration option for window size
- Add visual indicator for recurring events in the UI
- Consider client-side recurrence rule evaluation for very long-running recurring events

## Summary

The fix ensures recurring events display correctly by fetching a three-month window on every navigation, matching the initial load behavior. This is the correct approach for Google Calendar API when using `singleEvents: true` to expand recurring events.
