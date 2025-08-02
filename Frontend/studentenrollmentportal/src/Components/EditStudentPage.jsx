import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditStudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // data fetching here
  useEffect(() => {
    API.get(`/student/fetchbyid/${id}`)
      .then((response) => {
        reset(response.data);
      })
      .catch(() => {
        showSnackbar('Failed to fetch student data.', 'error');
      });
  }, [id, reset]);

  const showSnackbar = (message, severity) => 
    {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => 
    {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = (data) => {
    API.put(`/student/updatebyid/${id}`, data)
      .then(() => {
        showSnackbar('Student updated successfully!', 'success');
        setTimeout(() => navigate('/manage'), 1500);
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
        Edit Student
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>

          <FormControl margin="normal">
            <TextField
              label="Student Name"
              {...register("studentName", { required: "Student name is required" })}
              error={!!errors.studentName}
              helperText={errors.studentName?.message}
              fullWidth
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="date"
              label="Date of Birth"
              {...register("studentDOB", { required: "Date of Birth is required" })}
              error={!!errors.studentDOB}
              helperText={errors.studentDOB?.message}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              {...register("studentGender", { required: "Gender is required" })}
              value={watch("studentGender") || ""}
              onChange={(e) => setValue("studentGender", e.target.value)}
              error={!!errors.studentGender}
            >
              <MenuItem value="" disabled>Select Gender</MenuItem>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
            {errors.studentGender && <Typography color="error" variant="caption">{errors.studentGender.message}</Typography>}
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="email"
              label="Email"
              {...register("studentEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
              error={!!errors.studentEmail}
              helperText={errors.studentEmail?.message}
              fullWidth
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              label="Mobile Number"
              {...register("studentMobile", {
                required: "Mobile number is required",
                pattern: { value: /^\d{10}$/, message: "Mobile number must be exactly 10 digits" }
              })}
              error={!!errors.studentMobile}
              helperText={errors.studentMobile?.message}
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
          </FormControl>

          <FormControl margin="normal">
            <TextField
              label="Address"
              {...register("studentAddress", { required: "Address is required" })}
              error={!!errors.studentAddress}
              helperText={errors.studentAddress?.message}
              multiline
              rows={3}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select
              {...register("enrolledCourse", { required: "Course selection is required" })}
              value={watch("enrolledCourse") || ""}
              onChange={(e) => setValue("enrolledCourse", e.target.value)}
              error={!!errors.enrolledCourse}
            >
              <MenuItem value="" disabled>Select Course</MenuItem>
              <MenuItem value="BTECH">B.Tech</MenuItem>
              <MenuItem value="BSC">B.Sc</MenuItem>
              <MenuItem value="MBA">MBA</MenuItem>
              <MenuItem value="BCOM">B.Com</MenuItem>
            </Select>
            {errors.enrolledCourse && <Typography color="error" variant="caption">{errors.enrolledCourse.message}</Typography>}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Semester</InputLabel>
            <Select
              {...register("studentSemester", { required: "Semester is required" })}
              value={watch("studentSemester") || ""}
              onChange={(e) => setValue("studentSemester", e.target.value)}
              error={!!errors.studentSemester}
            >
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
            {errors.studentSemester && <Typography color="error" variant="caption">{errors.studentSemester.message}</Typography>}
          </FormControl>

          <FormControl margin="normal">
            <TextField
              type="number"
              label="Last Exam Percentage"
              {...register("studentLastExamPercentage", {
                required: "Percentage is required",
                min: { value: 0, message: "Percentage cannot be less than 0" },
                max: { value: 100, message: "Percentage cannot be more than 100" }
              })}
              error={!!errors.studentLastExamPercentage}
              helperText={errors.studentLastExamPercentage?.message}
              fullWidth
            />
          </FormControl>

          <FormControl margin="normal">
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Update Student
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => reset()}
              fullWidth
              sx={{ mt: 1 }}
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

export default EditStudentPage;
