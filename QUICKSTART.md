# Course Data Processing - Quick Start Guide

## Quick Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Option A: Use sample data for testing**
   ```bash
   node scripts/create-sample-data.js
   ```

   **Option B: Use your own XLSX files**
   - Place your files in `data/input/`:
     - `catalog-courses.xlsx` - Academic catalog course data
     - `registrar-courses.xlsx` - Registrar course information

3. **Run preprocessing**
   ```bash
   npm run preprocess
   ```

4. **Start the server**
   ```bash
   npm run server
   ```

## API Endpoints Quick Reference

Once the server is running at `http://localhost:3001`, you can access:

| Endpoint | Description | Example |
|----------|-------------|---------|
| `GET /api/courses` | Get all course data | `curl http://localhost:3001/api/courses` |
| `GET /api/courses/subjects` | Get subject summaries | `curl http://localhost:3001/api/courses/subjects` |
| `GET /api/courses/subjects/:subject` | Get specific subject details | `curl http://localhost:3001/api/courses/subjects/CMPS` |
| `GET /api/courses/:subject/:courseNumber` | Get specific course sections | `curl http://localhost:3001/api/courses/CMPS/357` |

## What the Data Includes

### Subject Summary
- Total course offerings per subject
- Total actual enrollment vs max enrollment
- Total waitlist numbers
- Breakdown by individual courses

### Course Details
- Number of sections per course
- Enrollment statistics (aggregated across sections)
- Instructor information
- Meeting times and locations
- Course descriptions and prerequisites
- Restrictions and corequisites

## Example Output

Subject summary example:
```json
{
  "subject": "CMPS",
  "totalOfferings": 4,
  "totalSections": 4,
  "totalActualEnrollment": 120,
  "totalMaxEnrollment": 130,
  "totalWaitlist": 7,
  "courses": [
    {
      "courseNumber": "280",
      "title": "Data Structures",
      "sections": 2,
      "actualEnrollment": 67,
      "maxEnrollment": 70,
      "waitlist": 5
    }
  ]
}
```

## For More Information

- Detailed documentation: [PREPROCESSING_README.md](./PREPROCESSING_README.md)
- Server API docs: [SERVER_README.md](./SERVER_README.md)
