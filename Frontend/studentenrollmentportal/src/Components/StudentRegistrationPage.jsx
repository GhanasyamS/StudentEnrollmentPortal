import { useForm } from 'react-hook-form';
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
  FormHelperText,
  FormGroup
} from '@mui/material';
import { useState } from 'react';

const StudentRegistrationPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = (data) => {
    const dob = new Date(data.studentDOB);
    const age = new Date().getFullYear() - dob.getFullYear();

    if (age < 16) {
      showSnackbar('Student must be at least 16 years old.', 'warning');
      return;
    }

    API.post('/student/create', data)
      .then(() => {
        showSnackbar('Student registered successfully!', 'success');
        reset(); // Reset form fields
      })
      .catch((error) => {
        let rawMessage = error.response?.data?.message || error.response?.data || error.message || 'Unknown error occurred';
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormControl margin="normal" error={!!errors.studentName}>
            <TextField
              label="Student Name"
              {...register('studentName', { required: 'Student name is required' })}
              fullWidth
            />
            <FormHelperText>{errors.studentName?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!errors.studentDOB}>
            <TextField
              type="date"
              label="Date of Birth"
              {...register('studentDOB', { required: 'Date of Birth is required' })}
             slotProps={{
             inputLabel: {
             shrink: true
                        }
                        }}
              fullWidth
            />
            <FormHelperText>{errors.studentDOB?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.studentGender}>
            <InputLabel>Gender</InputLabel>
            <Select
              {...register('studentGender', { required: 'Please select gender' })}
              label="Gender"
              defaultValue=""
            >
              <MenuItem value="" disabled>Select Gender</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
            <FormHelperText>{errors.studentGender?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!errors.studentEmail}>
            <TextField
              type="email"
              label="Email"
              {...register('studentEmail', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              fullWidth
            />
            <FormHelperText>{errors.studentEmail?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!errors.studentMobile}>
            <TextField
              type="text"
              label="Mobile Number"
              {...register('studentMobile', {
                required: 'Mobile number is required',
                pattern: { value: /^\d{10}$/, message: 'Mobile number must be exactly 10 digits' }
              })}
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
            <FormHelperText>{errors.studentMobile?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!errors.studentAddress}>
            <TextField
              label="Address"
              {...register('studentAddress', { required: 'Address is required' })}
              multiline
              rows={3}
              fullWidth
            />
            <FormHelperText>{errors.studentAddress?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.enrolledCourse}>
            <InputLabel>Course</InputLabel>
            <Select
              {...register('enrolledCourse', { required: 'Please select a course' })}
              label="Course"
              defaultValue=""
            >
              <MenuItem value="" disabled>Select Course</MenuItem>
              <MenuItem value="BTECH">B.Tech</MenuItem>
              <MenuItem value="BSC">B.Sc</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
              <MenuItem value="BCOM">B.Com</MenuItem>
            </Select>
            <FormHelperText>{errors.enrolledCourse?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.studentSemester}>
            <InputLabel>Semester</InputLabel>
            <Select
              {...register('studentSemester', { required: 'Please select a semester' })}
              label="Semester"
              defaultValue=""
            >
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.studentSemester?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal" error={!!errors.studentLastExamPercentage}>
            <TextField
              type="number"
              label="Last Exam Percentage"
              {...register('studentLastExamPercentage', {
                required: 'Percentage is required',
                min: { value: 0, message: 'Percentage cannot be less than 0' },
                max: { value: 100, message: 'Percentage cannot be more than 100' }
              })}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
            />
            <FormHelperText>{errors.studentLastExamPercentage?.message}</FormHelperText>
          </FormControl>

          <FormControl margin="normal">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register Student
            </Button>
          </FormControl>

          <FormControl margin="normal">
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => reset()}
              fullWidth
            >
              Reset
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
