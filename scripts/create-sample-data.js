import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output file paths
const CATALOG_FILE = path.join(__dirname, '../data/input/catalog-courses.xlsx');
const REGISTRAR_FILE = path.join(__dirname, '../data/input/registrar-courses.xlsx');

/**
 * Create sample catalog course data
 */
function createSampleCatalogData() {
  const catalogData = [
    {
      'Term': 'Spring 2025',
      'Part of Term': 'Full Term',
      'Term Start Date': '2025-01-15',
      'Term End Date': '2025-05-15',
      'College': 'School of Computing and Informatics',
      'Department': 'Computer Science',
      'CRN': '10001',
      'Subject': 'CMPS',
      'Course #': '257',
      'Section #': '001',
      'Course Title': 'Advanced Web Development',
      'Course Status': 'Active',
      'Instructional Method': 'Face-to-Face',
      'Schedule Attribute': 'Regular',
      'Special Approval': '',
      'Schedule Type': 'Lecture',
      'Credit Hours': 3,
      'Actual Enrollment': 28,
      'Max Enrollment': 30,
      'Waitlist Enrollment': 2,
      'Waitlist Capacity': 5,
      'Instructor Name': 'Dr. Smith',
      'Meeting Day 1': 'MWF',
      'Day 1 Begin Time': '10:00 AM',
      'Day 1 End Time': '10:50 AM',
      'Day 1 Location': 'ENGR 101',
      'Meeting Day 2': '',
      'Day 2 Begin Time': '',
      'Day 2 End Time': '',
      'Day 2 Location': '',
      'Course Notes (SSATEXT)': ''
    },
    {
      'Term': 'Spring 2025',
      'Part of Term': 'Full Term',
      'Term Start Date': '2025-01-15',
      'Term End Date': '2025-05-15',
      'College': 'School of Computing and Informatics',
      'Department': 'Computer Science',
      'CRN': '10002',
      'Subject': 'CMPS',
      'Course #': '280',
      'Section #': '001',
      'Course Title': 'Data Structures',
      'Course Status': 'Active',
      'Instructional Method': 'Face-to-Face',
      'Schedule Attribute': 'Regular',
      'Special Approval': '',
      'Schedule Type': 'Lecture',
      'Credit Hours': 3,
      'Actual Enrollment': 35,
      'Max Enrollment': 35,
      'Waitlist Enrollment': 5,
      'Waitlist Capacity': 10,
      'Instructor Name': 'Dr. Johnson',
      'Meeting Day 1': 'TR',
      'Day 1 Begin Time': '2:00 PM',
      'Day 1 End Time': '3:15 PM',
      'Day 1 Location': 'ENGR 203',
      'Meeting Day 2': '',
      'Day 2 Begin Time': '',
      'Day 2 End Time': '',
      'Day 2 Location': '',
      'Course Notes (SSATEXT)': 'Lab component required'
    },
    {
      'Term': 'Spring 2025',
      'Part of Term': 'Full Term',
      'Term Start Date': '2025-01-15',
      'Term End Date': '2025-05-15',
      'College': 'School of Computing and Informatics',
      'Department': 'Computer Science',
      'CRN': '10003',
      'Subject': 'CMPS',
      'Course #': '280',
      'Section #': '002',
      'Course Title': 'Data Structures',
      'Course Status': 'Active',
      'Instructional Method': 'Face-to-Face',
      'Schedule Attribute': 'Regular',
      'Special Approval': '',
      'Schedule Type': 'Lecture',
      'Credit Hours': 3,
      'Actual Enrollment': 32,
      'Max Enrollment': 35,
      'Waitlist Enrollment': 0,
      'Waitlist Capacity': 10,
      'Instructor Name': 'Dr. Williams',
      'Meeting Day 1': 'MWF',
      'Day 1 Begin Time': '11:00 AM',
      'Day 1 End Time': '11:50 AM',
      'Day 1 Location': 'ENGR 204',
      'Meeting Day 2': '',
      'Day 2 Begin Time': '',
      'Day 2 End Time': '',
      'Day 2 Location': '',
      'Course Notes (SSATEXT)': 'Lab component required'
    },
    {
      'Term': 'Spring 2025',
      'Part of Term': 'Full Term',
      'Term Start Date': '2025-01-15',
      'Term End Date': '2025-05-15',
      'College': 'School of Computing and Informatics',
      'Department': 'Computer Science',
      'CRN': '10004',
      'Subject': 'CMPS',
      'Course #': '357',
      'Section #': '001',
      'Course Title': 'Internet Programming',
      'Course Status': 'Active',
      'Instructional Method': 'Face-to-Face',
      'Schedule Attribute': 'Regular',
      'Special Approval': '',
      'Schedule Type': 'Lecture',
      'Credit Hours': 3,
      'Actual Enrollment': 25,
      'Max Enrollment': 30,
      'Waitlist Enrollment': 0,
      'Waitlist Capacity': 5,
      'Instructor Name': 'Dr. Brown',
      'Meeting Day 1': 'TR',
      'Day 1 Begin Time': '3:30 PM',
      'Day 1 End Time': '4:45 PM',
      'Day 1 Location': 'ENGR 105',
      'Meeting Day 2': '',
      'Day 2 Begin Time': '',
      'Day 2 End Time': '',
      'Day 2 Location': '',
      'Course Notes (SSATEXT)': 'Project-based course'
    },
    {
      'Term': 'Spring 2025',
      'Part of Term': 'Full Term',
      'Term Start Date': '2025-01-15',
      'Term End Date': '2025-05-15',
      'College': 'School of Computing and Informatics',
      'Department': 'Information Systems',
      'CRN': '10005',
      'Subject': 'INFS',
      'Course #': '210',
      'Section #': '001',
      'Course Title': 'Business Information Systems',
      'Course Status': 'Active',
      'Instructional Method': 'Face-to-Face',
      'Schedule Attribute': 'Regular',
      'Special Approval': '',
      'Schedule Type': 'Lecture',
      'Credit Hours': 3,
      'Actual Enrollment': 22,
      'Max Enrollment': 25,
      'Waitlist Enrollment': 1,
      'Waitlist Capacity': 5,
      'Instructor Name': 'Dr. Davis',
      'Meeting Day 1': 'MWF',
      'Day 1 Begin Time': '1:00 PM',
      'Day 1 End Time': '1:50 PM',
      'Day 1 Location': 'ENGR 301',
      'Meeting Day 2': '',
      'Day 2 Begin Time': '',
      'Day 2 End Time': '',
      'Day 2 Location': '',
      'Course Notes (SSATEXT)': ''
    }
  ];
  
  return catalogData;
}

/**
 * Create sample registrar course data
 */
function createSampleRegistrarData() {
  const registrarData = [
    {
      'Catalog Name': '2024-2025 Academic Catalog',
      'School/College Name': 'School of Computing and Informatics',
      'Department Name': 'Computer Science',
      'Entity Type': 'Course',
      'Entity OID': 'CS257',
      'Entity Name': 'Advanced Web Development',
      'Course OID': 'CMPS257',
      'Course Type': 'Lecture',
      'Effective Term Banner:': 'Fall 2024',
      'Effective Year Banner:': '2024',
      'Prefix': 'CMPS',
      'Code': '257',
      'Name': 'Advanced Web Development',
      'Credit Hours:': 3,
      'Lecture Contact Hours:': 3,
      'Lab Contact Hours:': 0,
      'Description (Rendered no HTML)': 'Advanced topics in web development including modern frameworks, APIs, and best practices.',
      'Course Notes: (Rendered no HTML)': '',
      'Repeatable Course:': 'No',
      'Prerequisite(s): (Rendered no HTML)': 'CMPS 161 or consent of instructor',
      'Corequisite(s): (Rendered no HTML)': '',
      'Pre/Corequisite(s): (Rendered no HTML)': '',
      'Restriction(s): (Rendered no HTML)': 'Restricted to CS majors',
      'MAX number of credit hours applicable to degree:': 3,
      'Is Course Repeatable for Credit?': 'No',
      'If yes, max number of times this course may be repeated is:': 0,
      'Course Level:': 'Undergraduate',
      'Is Active': 'Yes'
    },
    {
      'Catalog Name': '2024-2025 Academic Catalog',
      'School/College Name': 'School of Computing and Informatics',
      'Department Name': 'Computer Science',
      'Entity Type': 'Course',
      'Entity OID': 'CS280',
      'Entity Name': 'Data Structures',
      'Course OID': 'CMPS280',
      'Course Type': 'Lecture',
      'Effective Term Banner:': 'Fall 2024',
      'Effective Year Banner:': '2024',
      'Prefix': 'CMPS',
      'Code': '280',
      'Name': 'Data Structures',
      'Credit Hours:': 3,
      'Lecture Contact Hours:': 3,
      'Lab Contact Hours:': 0,
      'Description (Rendered no HTML)': 'Study of data structures and algorithms including arrays, linked lists, stacks, queues, trees, and graphs.',
      'Course Notes: (Rendered no HTML)': 'Lab component required',
      'Repeatable Course:': 'No',
      'Prerequisite(s): (Rendered no HTML)': 'CMPS 161',
      'Corequisite(s): (Rendered no HTML)': '',
      'Pre/Corequisite(s): (Rendered no HTML)': '',
      'Restriction(s): (Rendered no HTML)': '',
      'MAX number of credit hours applicable to degree:': 3,
      'Is Course Repeatable for Credit?': 'No',
      'If yes, max number of times this course may be repeated is:': 0,
      'Course Level:': 'Undergraduate',
      'Is Active': 'Yes'
    },
    {
      'Catalog Name': '2024-2025 Academic Catalog',
      'School/College Name': 'School of Computing and Informatics',
      'Department Name': 'Computer Science',
      'Entity Type': 'Course',
      'Entity OID': 'CS357',
      'Entity Name': 'Internet Programming',
      'Course OID': 'CMPS357',
      'Course Type': 'Lecture',
      'Effective Term Banner:': 'Fall 2024',
      'Effective Year Banner:': '2024',
      'Prefix': 'CMPS',
      'Code': '357',
      'Name': 'Internet Programming',
      'Credit Hours:': 3,
      'Lecture Contact Hours:': 3,
      'Lab Contact Hours:': 0,
      'Description (Rendered no HTML)': 'Server-side and client-side programming for web applications. Topics include HTTP, REST APIs, databases, and modern web frameworks.',
      'Course Notes: (Rendered no HTML)': 'Project-based course',
      'Repeatable Course:': 'No',
      'Prerequisite(s): (Rendered no HTML)': 'CMPS 280',
      'Corequisite(s): (Rendered no HTML)': '',
      'Pre/Corequisite(s): (Rendered no HTML)': '',
      'Restriction(s): (Rendered no HTML)': '',
      'MAX number of credit hours applicable to degree:': 3,
      'Is Course Repeatable for Credit?': 'No',
      'If yes, max number of times this course may be repeated is:': 0,
      'Course Level:': 'Undergraduate',
      'Is Active': 'Yes'
    },
    {
      'Catalog Name': '2024-2025 Academic Catalog',
      'School/College Name': 'School of Computing and Informatics',
      'Department Name': 'Information Systems',
      'Entity Type': 'Course',
      'Entity OID': 'IS210',
      'Entity Name': 'Business Information Systems',
      'Course OID': 'INFS210',
      'Course Type': 'Lecture',
      'Effective Term Banner:': 'Fall 2024',
      'Effective Year Banner:': '2024',
      'Prefix': 'INFS',
      'Code': '210',
      'Name': 'Business Information Systems',
      'Credit Hours:': 3,
      'Lecture Contact Hours:': 3,
      'Lab Contact Hours:': 0,
      'Description (Rendered no HTML)': 'Introduction to information systems in business contexts. Topics include databases, networks, security, and enterprise systems.',
      'Course Notes: (Rendered no HTML)': '',
      'Repeatable Course:': 'No',
      'Prerequisite(s): (Rendered no HTML)': '',
      'Corequisite(s): (Rendered no HTML)': '',
      'Pre/Corequisite(s): (Rendered no HTML)': '',
      'Restriction(s): (Rendered no HTML)': '',
      'MAX number of credit hours applicable to degree:': 3,
      'Is Course Repeatable for Credit?': 'No',
      'If yes, max number of times this course may be repeated is:': 0,
      'Course Level:': 'Undergraduate',
      'Is Active': 'Yes'
    }
  ];
  
  return registrarData;
}

/**
 * Main function to create sample data files
 */
function main() {
  console.log('Creating sample course data files...');
  
  // Ensure input directory exists
  const inputDir = path.dirname(CATALOG_FILE);
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }
  
  // Create catalog workbook
  console.log('Creating catalog courses file...');
  const catalogData = createSampleCatalogData();
  const catalogWorkbook = XLSX.utils.book_new();
  const catalogWorksheet = XLSX.utils.json_to_sheet(catalogData);
  XLSX.utils.book_append_sheet(catalogWorkbook, catalogWorksheet, 'Courses');
  XLSX.writeFile(catalogWorkbook, CATALOG_FILE);
  console.log(`Created: ${CATALOG_FILE}`);
  
  // Create registrar workbook
  console.log('Creating registrar courses file...');
  const registrarData = createSampleRegistrarData();
  const registrarWorkbook = XLSX.utils.book_new();
  const registrarWorksheet = XLSX.utils.json_to_sheet(registrarData);
  XLSX.utils.book_append_sheet(registrarWorkbook, registrarWorksheet, 'Courses');
  XLSX.writeFile(registrarWorkbook, REGISTRAR_FILE);
  console.log(`Created: ${REGISTRAR_FILE}`);
  
  console.log('\nSample data files created successfully!');
  console.log('You can now run: npm run preprocess');
}

main();
