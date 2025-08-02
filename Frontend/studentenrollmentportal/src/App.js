
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentRegistrationPage from './Components/StudentRegistrationPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentRegistrationPage />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
