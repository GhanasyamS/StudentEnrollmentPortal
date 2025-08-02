
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRegistrationPage from './Components/StudentRegistrationPage';
import StudentManagementPage from './Components/StudentManagementPage';
import EditStudentPage from './Components/EditStudentPage';
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
    <Router>
      <Header/>
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<StudentRegistrationPage />} />
          <Route path="/manage" element={<StudentManagementPage />} />
          <Route path="/edit-student/:id" element={<EditStudentPage />} />
        </Routes>
      </Box>
      <Footer/>
    </Router>
    </Box>
  );
}

export default App;
