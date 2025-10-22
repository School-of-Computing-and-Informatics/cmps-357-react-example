import { useState, useEffect } from 'react';

const useCourseData = () => {
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [allCourses, setAllCourses] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [enrollmentStats, setEnrollmentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course numbers list
  useEffect(() => {
    const fetchCourseNumbers = async () => {
      try {
        const response = await fetch('/api/courses/list');
        if (!response.ok) throw new Error('Failed to fetch course numbers');
        const data = await response.json();
        setCourseNumbers(data);
        if (data.length > 0) {
          setSelectedCourse(data[0]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseNumbers();
  }, []);

  // Fetch all data when component mounts or selectedCourse changes
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all courses
        const coursesResponse = await fetch('/api/courses');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const coursesData = await coursesResponse.json();
        setAllCourses(coursesData);

        // Fetch enrollment stats
        const statsResponse = await fetch('/api/courses/stats/enrollment');
        if (!statsResponse.ok) throw new Error('Failed to fetch enrollment stats');
        const statsData = await statsResponse.json();
        setEnrollmentStats(statsData);

        // Fetch specific course details if a course is selected
        if (selectedCourse) {
          const courseResponse = await fetch(`/api/courses/CMPS-${selectedCourse}`);
          if (!courseResponse.ok) throw new Error('Failed to fetch course details');
          const courseData = await courseResponse.json();
          setCourseDetails(courseData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedCourse]);

  return {
    courseNumbers,
    selectedCourse,
    setSelectedCourse,
    allCourses,
    courseDetails,
    enrollmentStats,
    loading,
    error
  };
};

export default useCourseData;
