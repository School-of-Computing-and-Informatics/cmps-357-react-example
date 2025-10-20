import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input file paths
const CATALOG_FILE = path.join(__dirname, '../data/input/catalog-courses.xlsx');
const REGISTRAR_FILE = path.join(__dirname, '../data/input/registrar-courses.xlsx');
const OUTPUT_FILE = path.join(__dirname, '../data/output/processed-courses.json');

/**
 * Read XLSX file and convert to JSON
 */
function readXLSX(filePath, forceSheetName = null) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  let sheetName;
  if (forceSheetName && workbook.SheetNames.includes(forceSheetName)) {
    sheetName = forceSheetName;
  } else {
    sheetName = workbook.SheetNames[0];
  }
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
}

/**
 * Process catalog course data
 * Extract relevant fields from the catalog
 */
function processRegistrarData(registrarData) {
  // This function was actually processing catalog/offerings data, not registrar descriptions
  // Swap logic: this should process catalogData (offerings/sections)
  const courses = [];
  registrarData.forEach(row => {
    const course = {
      catalogName: row['Catalog Name'] || '',
      schoolCollege: row['School/College Name'] || '',
      department: row['Department Name'] || '',
      prefix: row.Prefix || '',
      code: row.Code || '',
      name: row.Name || '',
      creditHours: row['Credit Hours:'] || 0,
      description: row['Description (Rendered no HTML)'] || '',
      prerequisites: row['Prerequisite(s): (Rendered no HTML)'] || '',
      corequisites: row['Corequisite(s): (Rendered no HTML)'] || '',
      restrictions: row['Restriction(s): (Rendered no HTML)'] || '',
      courseLevel: row['Course Level:'] || '',
      isActive: row['Is Active'] || ''
    };
    courses.push(course);
  });
  return courses;
}

/**
 * Process registrar course data (course catalog/descriptions)
 * This provides detailed course information
 */
function processCatalogData(catalogData) {
  // This function was actually processing registrar data (course info/descriptions)
  // Swap logic: this should process registrarData (sections/offerings)
  const courses = [];
  catalogData.forEach(row => {
    const course = {
      term: row.Term || '',
      crn: row.CRN || '',
      subject: row.Subject || '',
      courseNumber: row['Course #'] || '',
      section: row['Section #'] || '',
      title: row['Course Title'] || '',
      status: row['Course Status'] || '',
      creditHours: row['Credit Hours'] || 0,
      actualEnrollment: row['Actual Enrollment'] || 0,
      maxEnrollment: row['Max Enrollment'] || 0,
      waitlistEnrollment: row['Waitlist Enrollment'] || 0,
      waitlistCapacity: row['Waitlist Capacity'] || 0,
      instructor: row['Instructor Name'] || '',
      department: row.Department || '',
      college: row.College || ''
    };
    courses.push(course);
  });
  return courses;
}

/**
 * Combine catalog and registrar data
 * Group by subject and calculate statistics
 */
function combineAndAnalyze(catalogCourses, registrarInfo) {
  const subjectSummary = {};
  const courseDetails = [];
  
  // Process each catalog course
  catalogCourses.forEach(course => {
    const subject = course.subject;
    const courseNumber = course.courseNumber;
    const courseKey = `${subject}${courseNumber}`;
    
    // Get additional info from registrar data
    const extraInfo = registrarInfo[courseKey] || {};
    
    // Create detailed course entry
    const detailedCourse = {
      ...course,
      description: extraInfo.description || '',
      prerequisites: extraInfo.prerequisites || '',
      corequisites: extraInfo.corequisites || '',
      restrictions: extraInfo.restrictions || '',
      courseLevel: extraInfo.courseLevel || ''
    };
    
    courseDetails.push(detailedCourse);
    
    // Update subject summary
    if (!subjectSummary[subject]) {
      subjectSummary[subject] = {
        subject: subject,
        totalOfferings: 0,
        totalSections: 0,
        totalActualEnrollment: 0,
        totalMaxEnrollment: 0,
        totalWaitlist: 0,
        courses: {}
      };
    }
    
    subjectSummary[subject].totalOfferings += 1;
    subjectSummary[subject].totalSections += 1;
    subjectSummary[subject].totalActualEnrollment += course.actualEnrollment;
    subjectSummary[subject].totalMaxEnrollment += course.maxEnrollment;
    subjectSummary[subject].totalWaitlist += course.waitlistEnrollment;
    
    // Track individual courses within subject
    if (!subjectSummary[subject].courses[courseNumber]) {
      subjectSummary[subject].courses[courseNumber] = {
        courseNumber: courseNumber,
        title: course.title,
        sections: 0,
        actualEnrollment: 0,
        maxEnrollment: 0,
        waitlist: 0
      };
    }
    
    subjectSummary[subject].courses[courseNumber].sections += 1;
    subjectSummary[subject].courses[courseNumber].actualEnrollment += course.actualEnrollment;
    subjectSummary[subject].courses[courseNumber].maxEnrollment += course.maxEnrollment;
    subjectSummary[subject].courses[courseNumber].waitlist += course.waitlistEnrollment;
  });
  
  // Convert courses object to array for easier consumption
  Object.keys(subjectSummary).forEach(subject => {
    subjectSummary[subject].courses = Object.values(subjectSummary[subject].courses);
  });
  
  return {
    subjectSummary: Object.values(subjectSummary),
    courseDetails: courseDetails,
    metadata: {
      totalSubjects: Object.keys(subjectSummary).length,
      totalCourses: courseDetails.length,
      processedDate: new Date().toISOString()
    }
  };
}

/**
 * Main processing function
 */
function main() {
  try {
    console.log('Starting course data preprocessing...');
    
    // Check if input files exist
    if (!fs.existsSync(CATALOG_FILE)) {
      console.error(`Error: Catalog file not found at ${CATALOG_FILE}`);
      console.log('Please place the catalog courses XLSX file at:', CATALOG_FILE);
      process.exit(1);
    }
    
    if (!fs.existsSync(REGISTRAR_FILE)) {
      console.error(`Error: Registrar file not found at ${REGISTRAR_FILE}`);
      console.log('Please place the registrar courses XLSX file at:', REGISTRAR_FILE);
      process.exit(1);
    }
    
  // Read the XLSX files
  console.log('Reading catalog data...');
  const catalogData = readXLSX(CATALOG_FILE, 'Sheet1');
  console.log(`Loaded ${catalogData.length} catalog course records`);

  console.log('Reading registrar data...');
  const registrarData = readXLSX(REGISTRAR_FILE);
  console.log(`Loaded ${registrarData.length} registrar course records`);

  // Process the data (SWAPPED: catalog gets catalogData, registrar gets registrarData)
  console.log('Processing catalog data...');
  const catalogCourses = processCatalogData(registrarData); // should be registrarData

  console.log('Processing registrar data...');
  const registrarInfo = processRegistrarData(catalogData); // should be catalogData

  console.log('Combining and analyzing data...');
  const result = combineAndAnalyze(catalogCourses, registrarInfo);
    
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write output JSON
    console.log(`Writing output to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
    
    console.log('\nProcessing complete!');
    console.log('Summary:');
    console.log(`- Total subjects: ${result.metadata.totalSubjects}`);
    console.log(`- Total course offerings: ${result.metadata.totalCourses}`);
    console.log(`- Output file: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error processing course data:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
