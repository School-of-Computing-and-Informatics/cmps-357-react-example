import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const catalogFilePath = path.join(__dirname, '../data/input/catalog-2024-2025.xlsx');
const offeringsFilePath = path.join(__dirname, '../data/input/cmps-offerings-spring-2025.xlsx');
const outputFilePath = path.join(__dirname, '../data/output/courses.json');

/**
 * Read XLSX file and convert to JSON
 */
function readXLSX(filePath, sheetName = null) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet, { defval: '' });
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Parse prerequisites from text
 * Extracts course codes like CMPS-160, CMPS 160, etc.
 */
function parsePrerequisites(prereqText) {
  if (!prereqText || prereqText.trim() === '') {
    return [];
  }
  
  // Match patterns like CMPS-160, CMPS 160, CMPS160
  const coursePattern = /([A-Z]{4})[\s-]?(\d{3})/gi;
  const matches = [...prereqText.matchAll(coursePattern)];
  
  return matches.map(match => {
    const prefix = match[1].toUpperCase();
    const code = match[2];
    return `${prefix}-${code}`;
  }).filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
}

/**
 * Process catalog data
 */
function processCatalog(catalogData) {
  const courseMap = new Map();
  
  catalogData.forEach(row => {
    // Use the exact column names from the header
    const prefix = row['Prefix'] || '';
    const code = row['Code'] || '';
    const courseKey = `${prefix}-${code}`.toUpperCase();
    
    if (!prefix || !code) {
      return;
    }
    
    courseMap.set(courseKey, {
      prefix: prefix,
      code: code,
      name: row['Name'] || '',
      creditHours: row['Credit Hours:'] || '',
      description: row['Description (Rendered no HTML)'] || '',
      courseNotes: row['Course Notes: (Rendered no HTML)'] || '',
      prerequisites: parsePrerequisites(row['Prerequisite(s): (Rendered no HTML)'] || ''),
      corequisites: parsePrerequisites(row['Corequisite(s): (Rendered no HTML)'] || ''),
      restrictions: row['Restriction(s): (Rendered no HTML)'] || '',
      isRepeatable: row['Is Course Repeatable for Credit?'] || '',
      courseLevel: row['Course Level:'] || '',
      isActive: row['Is Active'] || ''
    });
  });
  
  return courseMap;
}

/**
 * Process offerings data
 */
function processOfferings(offeringsData) {
  const offeringsMap = new Map();
  
  offeringsData.forEach(row => {
    const subject = row['Subject'] || '';
    const courseNum = row['Course #'] || '';
    const courseKey = `${subject}-${courseNum}`.toUpperCase();
    
    if (!subject || !courseNum) {
      return;
    }
    
    // If course already exists, add this section to it
    if (offeringsMap.has(courseKey)) {
      const course = offeringsMap.get(courseKey);
      course.sections.push({
        crn: row['CRN'] || '',
        section: row['Section #'] || '',
        courseTitle: row['Course Title'] || '',
        status: row['Course Status'] || '',
        instructionalMethod: row['Instructional Method'] || '',
        scheduleType: row['Schedule Type'] || '',
        creditHours: row['Credit Hours'] || '',
        actualEnrollment: parseInt(row['Actual Enrollment']) || 0,
        maxEnrollment: parseInt(row['Max Enrollment']) || 0,
        waitlistEnrollment: parseInt(row['Waitlist Enrollment']) || 0,
        waitlistCapacity: parseInt(row['Waitlist Capacity']) || 0,
        instructor: row['Instructor Name'] || '',
        meetingDay1: row['Meeting Day 1'] || '',
        day1BeginTime: row['Day 1 Begin Time'] || '',
        day1EndTime: row['Day 1 End Time'] || '',
        day1Location: row['Day 1 Location'] || '',
        meetingDay2: row['Meeting Day 2'] || '',
        day2BeginTime: row['Day 2 Begin Time'] || '',
        day2EndTime: row['Day 2 End Time'] || '',
        day2Location: row['Day 2 Location'] || '',
        courseNotes: row['Course Notes (SSATEXT)'] || ''
      });
    } else {
      offeringsMap.set(courseKey, {
        subject: subject,
        courseNumber: courseNum,
        courseKey: courseKey,
        sections: [{
          crn: row['CRN'] || '',
          section: row['Section #'] || '',
          courseTitle: row['Course Title'] || '',
          status: row['Course Status'] || '',
          instructionalMethod: row['Instructional Method'] || '',
          scheduleType: row['Schedule Type'] || '',
          creditHours: row['Credit Hours'] || '',
          actualEnrollment: parseInt(row['Actual Enrollment']) || 0,
          maxEnrollment: parseInt(row['Max Enrollment']) || 0,
          waitlistEnrollment: parseInt(row['Waitlist Enrollment']) || 0,
          waitlistCapacity: parseInt(row['Waitlist Capacity']) || 0,
          instructor: row['Instructor Name'] || '',
          meetingDay1: row['Meeting Day 1'] || '',
          day1BeginTime: row['Day 1 Begin Time'] || '',
          day1EndTime: row['Day 1 End Time'] || '',
          day1Location: row['Day 1 Location'] || '',
          meetingDay2: row['Meeting Day 2'] || '',
          day2BeginTime: row['Day 2 Begin Time'] || '',
          day2EndTime: row['Day 2 End Time'] || '',
          day2Location: row['Day 2 Location'] || '',
          courseNotes: row['Course Notes (SSATEXT)'] || ''
        }]
      });
    }
  });
  
  return offeringsMap;
}

/**
 * Get prerequisite details recursively
 */
function getPrerequisiteDetails(courseKey, catalogMap, visited = new Set()) {
  // Prevent infinite loops
  if (visited.has(courseKey)) {
    return null;
  }
  visited.add(courseKey);
  
  const course = catalogMap.get(courseKey);
  if (!course) {
    return {
      courseKey: courseKey,
      name: 'Not found in catalog',
      description: 'Course not found',
      prerequisites: []
    };
  }
  
  // Recursively get prerequisite details
  const prereqDetails = course.prerequisites.map(prereqKey => 
    getPrerequisiteDetails(prereqKey, catalogMap, new Set(visited))
  ).filter(p => p !== null);
  
  return {
    courseKey: courseKey,
    name: course.name,
    description: course.description,
    creditHours: course.creditHours,
    prerequisites: prereqDetails
  };
}

/**
 * Merge catalog and offerings data
 */
function mergeData(catalogMap, offeringsMap) {
  const courses = [];
  
  offeringsMap.forEach((offering, courseKey) => {
    const catalogInfo = catalogMap.get(courseKey) || {};
    
    // Calculate total enrollments across all sections
    const totalActualEnrollment = offering.sections.reduce((sum, section) => 
      sum + section.actualEnrollment, 0);
    const totalMaxEnrollment = offering.sections.reduce((sum, section) => 
      sum + section.maxEnrollment, 0);
    
    // Get prerequisite details with recursive lookup
    const prerequisiteDetails = (catalogInfo.prerequisites || []).map(prereqKey => 
      getPrerequisiteDetails(prereqKey, catalogMap)
    ).filter(p => p !== null);
    
    courses.push({
      courseKey: courseKey,
      subject: offering.subject,
      courseNumber: offering.courseNumber,
      name: catalogInfo.name || offering.sections[0]?.courseTitle || '',
      creditHours: catalogInfo.creditHours || '',
      description: catalogInfo.description || '',
      courseNotes: catalogInfo.courseNotes || '',
      restrictions: catalogInfo.restrictions || '',
      
      // Enrollment data
      totalActualEnrollment: totalActualEnrollment,
      totalMaxEnrollment: totalMaxEnrollment,
      availableSeats: totalMaxEnrollment - totalActualEnrollment,
      enrollmentPercentage: totalMaxEnrollment > 0 
        ? ((totalActualEnrollment / totalMaxEnrollment) * 100).toFixed(2) 
        : 0,
      
      // Prerequisites with details
      prerequisites: catalogInfo.prerequisites || [],
      prerequisiteDetails: prerequisiteDetails,
      corequisites: catalogInfo.corequisites || [],
      
      // Section details
      sections: offering.sections
    });
  });
  
  // Sort by course key
  courses.sort((a, b) => a.courseKey.localeCompare(b.courseKey));
  
  return courses;
}

/**
 * Main preprocessing function
 */
function preprocessCourses() {
  console.log('Starting course data preprocessing...');
  
  // Check if input files exist
  if (!fs.existsSync(catalogFilePath)) {
    console.error(`Catalog file not found: ${catalogFilePath}`);
    console.log('Please place the catalog XLSX file at: data/input/catalog-2024-2025.xlsx');
    return;
  }
  
  if (!fs.existsSync(offeringsFilePath)) {
    console.error(`Offerings file not found: ${offeringsFilePath}`);
    console.log('Please place the offerings XLSX file at: data/input/cmps-offerings-spring-2025.xlsx');
    return;
  }
  
  // Read data
  console.log('Reading catalog data...');
  const catalogData = readXLSX(catalogFilePath);
  console.log(`Loaded ${catalogData.length} catalog entries`);
  
  console.log('Reading course offerings data...');
  const offeringsData = readXLSX(offeringsFilePath);
  console.log(`Loaded ${offeringsData.length} course offerings`);
  
  // Process data
  console.log('Processing catalog...');
  const catalogMap = processCatalog(catalogData);
  console.log(`Processed ${catalogMap.size} unique courses from catalog`);
  
  console.log('Processing offerings...');
  const offeringsMap = processOfferings(offeringsData);
  console.log(`Processed ${offeringsMap.size} unique courses from offerings`);
  
  // Merge data
  console.log('Merging data...');
  const courses = mergeData(catalogMap, offeringsMap);
  console.log(`Generated ${courses.length} course records`);
  
  // Prepare output
  const output = {
    metadata: {
      generatedAt: new Date().toISOString(),
      catalogFile: 'catalog-2024-2025.xlsx',
      offeringsFile: 'cmps-offerings-spring-2025.xlsx',
      totalCourses: courses.length,
      totalSections: courses.reduce((sum, c) => sum + c.sections.length, 0)
    },
    courses: courses
  };
  
  // Write output
  console.log(`Writing output to ${outputFilePath}...`);
  fs.writeFileSync(outputFilePath, JSON.stringify(output, null, 2));
  console.log('Preprocessing complete!');
  
  // Summary statistics
  const totalEnrollment = courses.reduce((sum, c) => sum + c.totalActualEnrollment, 0);
  const totalCapacity = courses.reduce((sum, c) => sum + c.totalMaxEnrollment, 0);
  console.log('\n=== Summary ===');
  console.log(`Total Courses: ${courses.length}`);
  console.log(`Total Sections: ${output.metadata.totalSections}`);
  console.log(`Total Enrollment: ${totalEnrollment}`);
  console.log(`Total Capacity: ${totalCapacity}`);
  console.log(`Overall Utilization: ${((totalEnrollment / totalCapacity) * 100).toFixed(2)}%`);
}

// Run preprocessing
preprocessCourses();
