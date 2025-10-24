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
      // Only sum lecture (non-lab) sections for bar chart totals
      let lectureActual = 0;
      let lectureMax = 0;
      let labActual = 0;
      if (Array.isArray(c.sections)) {
        c.sections.forEach(section => {
          const schedType = section.scheduleType ? section.scheduleType.trim().toLowerCase() : '';
          if (schedType === 'lecture') {
            lectureActual += Number(section.actualEnrollment) || 0;
            lectureMax += Number(section.maxEnrollment) || 0;
          } else if (schedType === 'lab') {
            labActual += Number(section.actualEnrollment) || 0;
          }
        });
      } else {
        // Fallback to course totals if no sections array
        lectureActual = c.totalActualEnrollment || 0;
        lectureMax = c.totalMaxEnrollment || 0;
      }
      const diff = lectureMax - lectureActual;
      return {
        ...c,
        totalActualEnrollment: lectureActual,
        totalMaxEnrollment: lectureMax,
        labOnlyEnrollment: labActual,
        availableSeats: diff > 0 ? diff : 0,
        excessEnrollment: diff < 0 ? Math.abs(diff) : 0
      };
    })
    .filter(c => c.totalActualEnrollment > 0);
};

// Colors for charts
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
