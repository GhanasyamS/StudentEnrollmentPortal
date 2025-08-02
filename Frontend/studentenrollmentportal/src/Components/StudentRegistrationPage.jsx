import { useState } from 'react';
import API from '../Services/API';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Snackbar,
  Alert,
  FormGroup
} from '@mui/material';

const StudentRegistrationPage = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentDOB: '',
    studentGender: '',
    studentEmail: '',
    studentMobile: '',
    studentAddress: '',
    enrolledCourse: '',
    studentSemester: '',
    studentLastExamPercentage: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentMobile') {
      const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { studentName, studentDOB, studentGender, studentEmail,
      studentMobile, enrolledCourse, studentSemester, studentLastExamPercentage } = formData;

    if (!studentName || !studentDOB || !studentGender || !studentEmail ||
      !studentMobile || !enrolledCourse || !studentSemester || studentLastExamPercentage === '') {
      showSnackbar('Please fill all fields.', 'warning');
      return false;
    }

    if (studentMobile.length !== 10) {
      showSnackbar('Mobile number must be exactly 10 digits.', 'warning');
      return false;
    }

    const dob = new Date(studentDOB);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 16) {
      showSnackbar('Student must be at least 16 years old.', 'warning');
      return false;
    }

    if (studentLastExamPercentage < 0 || studentLastExamPercentage > 100) {
      showSnackbar('Percentage must be between 0 and 100.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    API.post('/student/create', formData)
      .then(() => {
        showSnackbar('Student registered successfully!', 'success');
        setFormData({
          studentName: '',
          studentDOB: '',
          studentGender: '',
          studentEmail: '',
          studentMobile: '',
          studentAddress: '',
          enrolledCourse: '',
          studentSemester: '',
          studentLastExamPercentage: ''
        });
      })
   .catch((error) => {
  let rawMessage = error.response?.data?.message || error.response?.data || error.message || 'Unknown error occurred';

  // Extract meaningful duplicate entry info
  let duplicateMatch = rawMessage.match(/Duplicate entry '(.+?)'/);
  if (duplicateMatch) {
    rawMessage = `Entry ${duplicateMatch[1]} already exists.`;
  }

  showSnackbar(`Error: ${rawMessage}`, 'error');
});

  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl margin="normal">
            <TextField
              label="Student Name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="date"
              label="Date of Birth"
              name="studentDOB"
              value={formData.studentDOB}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="studentGender"
              value={formData.studentGender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="" disabled>Select Gender</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="email"
              label="Email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              fullWidth
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="text"
              label="Mobile Number"
              name="studentMobile"
              value={formData.studentMobile}
              onChange={handleChange}
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              label="Address"
              name="studentAddress"
              value={formData.studentAddress}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              name="enrolledCourse"
              value={formData.enrolledCourse}
              onChange={handleChange}
              label="Course"
            >
              <MenuItem value="" disabled>Select Course</MenuItem>
              <MenuItem value="BTECH">B.Tech</MenuItem>
              <MenuItem value="BSC">B.Sc</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
              <MenuItem value="BCOM">B.Com</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Semester</InputLabel>
            <Select
              name="studentSemester"
              value={formData.studentSemester}
              onChange={handleChange}
              label="Semester"
            >
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="number"
              label="Last Exam Percentage"
              name="studentLastExamPercentage"
              value={formData.studentLastExamPercentage}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
            />
          </FormControl>

          <FormControl margin="normal">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register Student
            </Button>
          </FormControl>
        </FormGroup>
      </form>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StudentRegistrationPage;
