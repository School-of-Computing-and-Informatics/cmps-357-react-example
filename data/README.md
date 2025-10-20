# Course Data Directory

This directory contains the input XLSX files and generated JSON output for course data processing.

## Directory Structure

```
data/
├── input/          # Input XLSX files (not committed to git)
│   ├── catalog-2024-2025.xlsx
│   └── cmps-offerings-spring-2025.xlsx
└── output/         # Generated JSON files (committed to git)
    └── courses.json
```

## Input Files

### 1. catalog-2024-2025.xlsx
This file should contain the 2024-2025 Academic Catalog course data with the following columns:

- Catalog Name
- School/College Name
- Department Name
- Entity Type
- Entity OID
- Entity Name
- Course OID
- Course Type
- Effective Term Banner:
- Effective Year Banner:
- Prefix
- Code
- Name
- Credit Hours:
- Lecture Contact Hours:
- Lab Contact Hours:
- Description (Rendered no HTML)
- Course Notes: (Rendered no HTML)
- Repeatable Course:
- Prerequisite(s): (Rendered no HTML)
- Corequisite(s): (Rendered no HTML)
- Pre/Corequisite(s): (Rendered no HTML)
- Restriction(s): (Rendered no HTML)
- MAX number of credit hours applicable to degree:
- Is Course Repeatable for Credit?
- If yes, max number of times this course may be repeated is:
- Course Level:
- Is Active

### 2. cmps-offerings-spring-2025.xlsx
This file should contain the Spring 2025 CMPS course offerings with the following columns:

- Term
- Part of Term
- Term Start Date
- Term End Date
- College
- Department
- CRN
- Subject
- Course #
- Section #
- Course Title
- Course Status
- Instructional Method
- Schedule Attribute
- Special Approval
- Schedule Type
- Credit Hours
- Actual Enrollment
- Max Enrollment
- Waitlist Enrollment
- Waitlist Capacity
- Instructor Name
- Meeting Day 1
- Day 1 Begin Time
- Day 1 End Time
- Day 1 Location
- Meeting Day 2
- Day 2 Begin Time
- Day 2 End Time
- Day 2 Location
- Course Notes (SSATEXT)

## Processing

To process the XLSX files and generate the JSON output:

```bash
npm run preprocess
```

This will:
1. Read both XLSX files from `data/input/`
2. Parse and merge the data
3. Extract prerequisites recursively
4. Generate `data/output/courses.json` with comprehensive course information

## Output Format

The generated `courses.json` contains:

```json
{
  "metadata": {
    "generatedAt": "ISO timestamp",
    "catalogFile": "catalog-2024-2025.xlsx",
    "offeringsFile": "cmps-offerings-spring-2025.xlsx",
    "totalCourses": 0,
    "totalSections": 0
  },
  "courses": [
    {
      "courseKey": "CMPS-160",
      "subject": "CMPS",
      "courseNumber": "160",
      "name": "Introduction to Computer Science",
      "creditHours": "3",
      "description": "Course description...",
      "totalActualEnrollment": 45,
      "totalMaxEnrollment": 50,
      "availableSeats": 5,
      "enrollmentPercentage": "90.00",
      "prerequisites": ["MATH-140"],
      "prerequisiteDetails": [
        {
          "courseKey": "MATH-140",
          "name": "College Algebra",
          "description": "Description...",
          "creditHours": "3",
          "prerequisites": []
        }
      ],
      "sections": [...]
    }
  ]
}
```

## Usage

Place your XLSX files in the `data/input/` directory with the exact filenames specified above, then run:

```bash
npm run preprocess
```

The API server will automatically serve the generated `courses.json` file through the `/api/courses` endpoints.
