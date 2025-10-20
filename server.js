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

// Helper function to read course data from JSON file
function getCourseData() {
  const courseDataPath = path.join(__dirname, 'data/output/processed-courses.json');
  
  if (!fs.existsSync(courseDataPath)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(courseDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading course data:', error);
    return null;
  }
}

// API endpoint to get all course data
app.get('/api/courses', (req, res) => {
  const courseData = getCourseData();
  
  if (!courseData) {
    res.status(404).json({ 
      error: 'Course data not found',
      message: 'Please run "npm run preprocess" to generate course data from XLSX files'
    });
    return;
  }
  
  res.json(courseData);
});

// API endpoint to get subject summaries only
app.get('/api/courses/subjects', (req, res) => {
  const courseData = getCourseData();
  
  if (!courseData) {
    res.status(404).json({ 
      error: 'Course data not found',
      message: 'Please run "npm run preprocess" to generate course data from XLSX files'
    });
    return;
  }
  
  res.json({
    subjects: courseData.subjectSummary,
    metadata: courseData.metadata
  });
});

// API endpoint to get details for a specific subject
app.get('/api/courses/subjects/:subject', (req, res) => {
  const { subject } = req.params;
  const courseData = getCourseData();
  
  if (!courseData) {
    res.status(404).json({ 
      error: 'Course data not found',
      message: 'Please run "npm run preprocess" to generate course data from XLSX files'
    });
    return;
  }
  
  const subjectData = courseData.subjectSummary.find(s => s.subject === subject.toUpperCase());
  
  if (!subjectData) {
    res.status(404).json({ error: 'Subject not found' });
    return;
  }
  
  // Get all course details for this subject
  const subjectCourses = courseData.courseDetails.filter(c => c.subject === subject.toUpperCase());
  
  res.json({
    summary: subjectData,
    courses: subjectCourses
  });
});

// API endpoint to get details for a specific course
app.get('/api/courses/:subject/:courseNumber', (req, res) => {
  const { subject, courseNumber } = req.params;
  const courseData = getCourseData();
  
  if (!courseData) {
    res.status(404).json({ 
      error: 'Course data not found',
      message: 'Please run "npm run preprocess" to generate course data from XLSX files'
    });
    return;
  }
  
  const courses = courseData.courseDetails.filter(
    c => c.subject === subject.toUpperCase() && c.courseNumber === courseNumber
  );
  
  if (courses.length === 0) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }
  
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
