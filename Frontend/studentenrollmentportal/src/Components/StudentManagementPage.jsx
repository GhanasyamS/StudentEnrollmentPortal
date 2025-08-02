import React, { useEffect, useState } from 'react';
import API from '../Services/API';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Snackbar,
  Alert,
  Box,
  TextField,
  MenuItem,
  Chip,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, School, Phone, Email, FilterList, Clear } from '@mui/icons-material';

const StudentManagementPage = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students when course selection changes
    if (selectedCourse === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.enrolledCourse.toLowerCase() === selectedCourse.toLowerCase()
      );
      setFilteredStudents(filtered);
    }
  }, [selectedCourse, students]);

  const fetchStudents = () => {
    API.get('/student/fetchallstudents')
      .then((response) => {
        setStudents(response.data);
        // Extract unique courses for filter dropdown
        const courses = [...new Set(response.data.map(student => student.enrolledCourse))];
        setAvailableCourses(courses);
      })
      .catch(() => showSnackbar('Failed to fetch students.', 'error'));
  };

  const deleteStudent = (studentID) => {
    API.delete(`/student/deletebyid/${studentID}`)
      .then(() => {
        showSnackbar('Student deleted successfully!', 'success');
        fetchStudents();
      })
      .catch(() => showSnackbar('Failed to delete student.', 'error'));
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCourseFilterChange = (event) => 
    {
    setSelectedCourse(event.target.value);
  };

  const clearFilter = () => {
    setSelectedCourse('');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 2
            }}
          >
            Student Management
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage and organize your student database
          </Typography>
        </Box>

        {/* Filter Section */}
        <Box 
          sx={{ 
            mb: 4, 
            p: 3, 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <FilterList sx={{ color: '#667eea' }} />
            <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 600 }}>
              Filter Students
            </Typography>
            <TextField
              select
              label="Filter by Course"
              value={selectedCourse}
              onChange={handleCourseFilterChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="">All Courses</MenuItem>
              {availableCourses.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </TextField>
            {selectedCourse && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Clear />}
                onClick={clearFilter}
                sx={{ borderRadius: '12px' }}
              >
                Clear Filter
              </Button>
            )}
          </Box>
          
          {/* Results Summary info here */}
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredStudents.length} of {students.length} students
            </Typography>
            {selectedCourse && (
              <Chip 
                label={`Course: ${selectedCourse}`} 
                color="primary" 
                size="small"
                sx={{ borderRadius: '8px' }}
              />
            )}
          </Box>
        </Box>

        {/* Students Grid  */}
        <Grid justifyContent="center" container spacing={3}>
          {filteredStudents.map((student) => (
            <Grid xs={12} sm={6} md={4} key={student.studentID}>
              <Card
                sx={{
                  minWidth:300,
                  minHeightheight: 250,
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Student Avatar and Name here */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: '#667eea', 
                        width: 48, 
                        height: 48, 
                        mr: 2,
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}
                    >
                      {getInitials(student.studentName)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3748' }}>
                        {student.studentName}
                      </Typography>
                      <Chip 
                        label={student.enrolledCourse} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(102, 126, 234, 0.1)', 
                          color: '#667eea',
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                  </Box>

                  {/* Student Details here */}
                  <Box sx={{ space: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email sx={{ fontSize: 16, color: '#718096', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {student.studentEmail}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ fontSize: 16, color: '#718096', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {student.studentMobile}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <School sx={{ fontSize: 16, color: '#718096', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Semester {student.studentSemester}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="contained"
                    onClick={() => navigate(`/edit-student/${student.studentID}`)}
                    sx={{
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      textTransform: 'none',
                      fontWeight: 600,
                      flex: 1,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="small" 
                    variant="outlined"
                    color="error"
                    onClick={() => deleteStudent(student.studentID)}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      flex: 1,
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No student registered in the course then */}
        {filteredStudents.length === 0 && students.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Person sx={{ fontSize: 64, color: '#cbd5e0', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No students found for the selected course
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try selecting a different course or clear the filter
            </Typography>
          </Box>
        )}

        
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ 
              width: '100%',
              borderRadius: '12px'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default StudentManagementPage;