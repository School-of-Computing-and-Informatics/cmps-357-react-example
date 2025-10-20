import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock data for 4 time steps (Q1, Q2, Q3, Q4)
const mockData = {
  Q1: {
    barData: [
      { name: 'Product A', sales: 4000, revenue: 2400 },
      { name: 'Product B', sales: 3000, revenue: 1398 },
      { name: 'Product C', sales: 2000, revenue: 9800 },
      { name: 'Product D', sales: 2780, revenue: 3908 },
      { name: 'Product E', sales: 1890, revenue: 4800 },
    ],
    pieData: [
      { name: 'Category A', value: 400 },
      { name: 'Category B', value: 300 },
      { name: 'Category C', value: 300 },
      { name: 'Category D', value: 200 },
    ],
  },
  Q2: {
    barData: [
      { name: 'Product A', sales: 4500, revenue: 2800 },
      { name: 'Product B', sales: 3200, revenue: 1600 },
      { name: 'Product C', sales: 2400, revenue: 10200 },
      { name: 'Product D', sales: 3100, revenue: 4200 },
      { name: 'Product E', sales: 2100, revenue: 5200 },
    ],
    pieData: [
      { name: 'Category A', value: 450 },
      { name: 'Category B', value: 320 },
      { name: 'Category C', value: 350 },
      { name: 'Category D', value: 280 },
    ],
  },
  Q3: {
    barData: [
      { name: 'Product A', sales: 5200, revenue: 3200 },
      { name: 'Product B', sales: 3800, revenue: 1900 },
      { name: 'Product C', sales: 2800, revenue: 11000 },
      { name: 'Product D', sales: 3500, revenue: 4800 },
      { name: 'Product E', sales: 2400, revenue: 5800 },
    ],
    pieData: [
      { name: 'Category A', value: 520 },
      { name: 'Category B', value: 380 },
      { name: 'Category C', value: 400 },
      { name: 'Category D', value: 300 },
    ],
  },
  Q4: {
    barData: [
      { name: 'Product A', sales: 5800, revenue: 3600 },
      { name: 'Product B', sales: 4200, revenue: 2200 },
      { name: 'Product C', sales: 3200, revenue: 12000 },
      { name: 'Product D', sales: 3900, revenue: 5400 },
      { name: 'Product E', sales: 2800, revenue: 6400 },
    ],
    pieData: [
      { name: 'Category A', value: 580 },
      { name: 'Category B', value: 420 },
      { name: 'Category C', value: 450 },
      { name: 'Category D', value: 350 },
    ],
  },
};

// API endpoint to get data for a specific time step
app.get('/api/data/:timeStep', (req, res) => {
  const { timeStep } = req.params;
  const data = mockData[timeStep];
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Time step not found' });
  }
});

// API endpoint to get all available time steps
app.get('/api/timesteps', (req, res) => {
  res.json(Object.keys(mockData));
});

// Load course data from JSON file
function loadCourseData() {
  try {
    const coursesPath = path.join(__dirname, 'data/output/courses.json');
    const data = fs.readFileSync(coursesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading course data:', error.message);
    return { metadata: {}, courses: [] };
  }
}

// API endpoint to get all CMPS courses with enrollment data
app.get('/api/courses', (req, res) => {
  const courseData = loadCourseData();
  
  // Return simplified course list with enrollment summary
  const courseList = courseData.courses.map(course => ({
    courseKey: course.courseKey,
    subject: course.subject,
    courseNumber: course.courseNumber,
    name: course.name,
    creditHours: course.creditHours,
    totalActualEnrollment: course.totalActualEnrollment,
    totalMaxEnrollment: course.totalMaxEnrollment,
    availableSeats: course.availableSeats,
    enrollmentPercentage: course.enrollmentPercentage,
    numberOfSections: course.sections.length,
    prerequisites: course.prerequisites
  }));
  
  res.json({
    metadata: courseData.metadata,
    courses: courseList
  });
});

// API endpoint to get specific course details with prerequisites
app.get('/api/courses/:courseCode', (req, res) => {
  const { courseCode } = req.params;
  const courseData = loadCourseData();
  
  // Find the course (case-insensitive)
  const course = courseData.courses.find(c => 
    c.courseKey.toUpperCase() === courseCode.toUpperCase()
  );
  
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ 
      error: 'Course not found',
      courseCode: courseCode
    });
  }
});

// API endpoint to get enrollment statistics
app.get('/api/courses/stats/enrollment', (req, res) => {
  const courseData = loadCourseData();
  
  const stats = {
    totalCourses: courseData.courses.length,
    totalSections: courseData.courses.reduce((sum, c) => sum + c.sections.length, 0),
    totalEnrollment: courseData.courses.reduce((sum, c) => sum + c.totalActualEnrollment, 0),
    totalCapacity: courseData.courses.reduce((sum, c) => sum + c.totalMaxEnrollment, 0),
    averageUtilization: 0,
    coursesWithHighEnrollment: 0, // > 90%
    coursesWithMediumEnrollment: 0, // 50-90%
    coursesWithLowEnrollment: 0 // < 50%
  };
  
  stats.averageUtilization = stats.totalCapacity > 0
    ? ((stats.totalEnrollment / stats.totalCapacity) * 100).toFixed(2)
    : 0;
  
  courseData.courses.forEach(course => {
    const utilization = parseFloat(course.enrollmentPercentage);
    if (utilization > 90) {
      stats.coursesWithHighEnrollment++;
    } else if (utilization >= 50) {
      stats.coursesWithMediumEnrollment++;
    } else {
      stats.coursesWithLowEnrollment++;
    }
  });
  
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
