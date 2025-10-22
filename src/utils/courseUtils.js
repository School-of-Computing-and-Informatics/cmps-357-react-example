// Helper to get last name (handles 'Last, First M.' format)
export const getLastName = (name) => {
  if (!name) return '';
  const commaIdx = name.indexOf(',');
  if (commaIdx > 0) {
    return name.substring(0, commaIdx).trim();
  }
  // fallback: last word
  const parts = name.trim().split(' ');
  return parts[parts.length - 1];
};

// Process courses data for visualization
export const processCourseData = (courses) => {
  return courses
    .map(c => {
      const diff = (c.totalMaxEnrollment || 0) - (c.totalActualEnrollment || 0);
      return {
        ...c,
        availableSeats: diff > 0 ? diff : 0,
        excessEnrollment: diff < 0 ? Math.abs(diff) : 0
      };
    })
    .filter(c => c.totalActualEnrollment > 0);
};

// Colors for charts
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
