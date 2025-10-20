# Course Data Preprocessing

This document describes the preprocessing pipeline for course catalog data from XLSX files.

## Overview

The preprocessing system processes two XLSX files:
1. **Catalog Course Data** - 2024-2025 Academic Catalog course offerings
2. **Registrar Course Data** - Spring 2025 CMPS course descriptions from the Registrar's Office

It outputs a single JSON file with:
- Subject-level summaries (total offerings, enrollment statistics)
- Course-level details (individual sections, instructors, enrollment data)
- Combined catalog and registrar information

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the `xlsx` library and other dependencies.

### 2. Prepare Input Files

Place your XLSX files in the `data/input/` directory with the following names:
- `catalog-courses.xlsx` - Course catalog data
- `registrar-courses.xlsx` - Registrar course information

#### Expected Headers for Catalog File:
```
Term, Part of Term, Term Start Date, Term End Date, College, Department, CRN, 
Subject, Course #, Section #, Course Title, Course Status, Instructional Method,
Schedule Attribute, Special Approval, Schedule Type, Credit Hours, 
Actual Enrollment, Max Enrollment, Waitlist Enrollment, Waitlist Capacity,
Instructor Name, Meeting Day 1, Day 1 Begin Time, Day 1 End Time, Day 1 Location,
Meeting Day 2, Day 2 Begin Time, Day 2 End Time, Day 2 Location, 
Course Notes (SSATEXT)
```

#### Expected Headers for Registrar File:
```
Catalog Name, School/College Name, Department Name, Entity Type, Entity OID,
Entity Name, Course OID, Course Type, Effective Term Banner:, 
Effective Year Banner:, Prefix, Code, Name, Credit Hours:, 
Lecture Contact Hours:, Lab Contact Hours:, Description (Rendered no HTML),
Course Notes: (Rendered no HTML), Repeatable Course:,
Prerequisite(s): (Rendered no HTML), Corequisite(s): (Rendered no HTML),
Pre/Corequisite(s): (Rendered no HTML), Restriction(s): (Rendered no HTML),
MAX number of credit hours applicable to degree:, Is Course Repeatable for Credit?,
If yes, max number of times this course may be repeated is:, Course Level:,
Is Active
```

### 3. Create Sample Data (Optional for Testing)

If you want to test the system with sample data:

```bash
node scripts/create-sample-data.js
```

This creates sample XLSX files in `data/input/` with example course data.

## Running the Preprocessing Script

```bash
npm run preprocess
```

This will:
1. Read both XLSX files from `data/input/`
2. Process and combine the data
3. Generate `data/output/processed-courses.json`

## Output Format

The generated JSON file has the following structure:

```json
{
  "subjectSummary": [
    {
      "subject": "CMPS",
      "totalOfferings": 4,
      "totalSections": 4,
      "totalActualEnrollment": 120,
      "totalMaxEnrollment": 130,
      "totalWaitlist": 7,
      "courses": [
        {
          "courseNumber": "257",
          "title": "Advanced Web Development",
          "sections": 1,
          "actualEnrollment": 28,
          "maxEnrollment": 30,
          "waitlist": 2
        }
      ]
    }
  ],
  "courseDetails": [
    {
      "term": "Spring 2025",
      "crn": "10001",
      "subject": "CMPS",
      "courseNumber": "257",
      "section": "001",
      "title": "Advanced Web Development",
      "status": "Active",
      "creditHours": 3,
      "actualEnrollment": 28,
      "maxEnrollment": 30,
      "waitlistEnrollment": 2,
      "waitlistCapacity": 5,
      "instructor": "Dr. Smith",
      "department": "Computer Science",
      "college": "School of Computing and Informatics",
      "description": "...",
      "prerequisites": "...",
      "corequisites": "...",
      "restrictions": "...",
      "courseLevel": "Undergraduate"
    }
  ],
  "metadata": {
    "totalSubjects": 2,
    "totalCourses": 5,
    "processedDate": "2025-10-20T12:20:53.010Z"
  }
}
```

## API Endpoints

The backend server (`server.js`) provides the following endpoints to access the processed data:

### Get All Course Data
```
GET /api/courses
```
Returns the complete processed course data (subjects, course details, metadata).

### Get Subject Summaries
```
GET /api/courses/subjects
```
Returns subject-level summaries and metadata only.

**Example Response:**
```json
{
  "subjects": [
    {
      "subject": "CMPS",
      "totalOfferings": 4,
      "totalSections": 4,
      "totalActualEnrollment": 120,
      "totalMaxEnrollment": 130,
      "totalWaitlist": 7,
      "courses": [...]
    }
  ],
  "metadata": {...}
}
```

### Get Specific Subject Details
```
GET /api/courses/subjects/:subject
```
Returns summary and detailed course information for a specific subject.

**Example:**
```bash
curl http://localhost:3001/api/courses/subjects/CMPS
```

### Get Specific Course Details
```
GET /api/courses/:subject/:courseNumber
```
Returns all sections of a specific course.

**Example:**
```bash
curl http://localhost:3001/api/courses/CMPS/280
```

## Running the Server

To start the backend server with course data endpoints:

```bash
npm run server
```

Or run both server and frontend together:

```bash
npm start
```

The server runs on `http://localhost:3001`.

## Data Analysis Features

The preprocessing script provides:

1. **Subject-level Analysis**
   - Total number of course offerings per subject
   - Total actual enrollment vs max enrollment
   - Total waitlist numbers
   - Breakdown by individual courses

2. **Course-level Analysis**
   - Number of sections per course
   - Enrollment statistics per course (aggregated across sections)
   - Waitlist statistics

3. **Section-level Details**
   - Individual section enrollment
   - Instructor information
   - Meeting times and locations
   - Course descriptions and prerequisites

## File Structure

```
cmps-357-react-example/
├── data/
│   ├── input/
│   │   ├── catalog-courses.xlsx     (your catalog data)
│   │   └── registrar-courses.xlsx   (your registrar data)
│   └── output/
│       └── processed-courses.json   (generated output)
├── scripts/
│   ├── preprocess-courses.js        (main preprocessing script)
│   └── create-sample-data.js        (sample data generator)
└── server.js                        (backend with API endpoints)
```

## Notes

- The `data/input/*.xlsx` and `data/output/*.json` files are gitignored to avoid committing large data files
- You need to run `npm run preprocess` after updating input XLSX files
- The server automatically reads from `data/output/processed-courses.json` when API endpoints are called
- If the JSON file doesn't exist, the API endpoints will return a 404 error with instructions
