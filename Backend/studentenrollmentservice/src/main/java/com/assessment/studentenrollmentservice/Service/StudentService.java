package com.assessment.studentenrollmentservice.Service;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import com.assessment.studentenrollmentservice.Exception.InvalidStudentException;
import com.assessment.studentenrollmentservice.Exception.StudentNotFoundException;
import com.assessment.studentenrollmentservice.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class StudentService implements IStudentService
{
    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        validateStudent(student); //exception thrown here
        return studentRepository.save(student);
    }


    @Override
    public List<Student> getAllStudents()
    {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long studentID) {
        return studentRepository.findById(studentID)
                .orElseThrow(()-> new StudentNotFoundException("Student Not Found with Id: "+studentID));
    }

    @Override
    public Student updateStudent(Long studentId, Student updatedStudent) throws InvalidStudentException
    {
        Student existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with Id: " + studentId));

        existingStudent.setStudentName(updatedStudent.getStudentName());
        existingStudent.setStudentGender(updatedStudent.getStudentGender());
        existingStudent.setStudentDOB(updatedStudent.getStudentDOB());
        existingStudent.setStudentEmail(updatedStudent.getStudentEmail());
        existingStudent.setStudentMobile(updatedStudent.getStudentMobile());
        existingStudent.setStudentAddress(updatedStudent.getStudentAddress());
        existingStudent.setEnrolledCourse(updatedStudent.getEnrolledCourse());
        existingStudent.setStudentSemester(updatedStudent.getStudentSemester());
        existingStudent.setStudentLastExamPercentage(updatedStudent.getStudentLastExamPercentage());

        validateStudent(existingStudent);
        return studentRepository.save(existingStudent);

    }

    @Override
    public void deleteStudent(Long id) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with Id: " + id));
        studentRepository.delete(existingStudent);
    }


    @Override
    public Student updateStudentCourse(long studentID, Course course) {
        Student currentStudentData = studentRepository.findById(studentID)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with Id: " + studentID));

        currentStudentData.setEnrolledCourse(course);
        validateStudent(currentStudentData);
        return studentRepository.save(currentStudentData);
    }

    @Override
    public Student updateStudentSemester(long studentID, int semester) {
        Student currentStudentData = studentRepository.findById(studentID)
                .orElseThrow(() -> new StudentNotFoundException("Student Not Found with Id: " + studentID));
        validateStudent(currentStudentData);
        currentStudentData.setStudentSemester(semester);
        return studentRepository.save(currentStudentData);

    }

    @Override
    public List<Student> fetchStudentsInCourse(Course course)
    {
        return studentRepository.findByEnrolledCourse(course);
    }

    @Override
    public Student fetchStudentByEmail(String email) throws StudentNotFoundException
    {
        Student student = studentRepository.findByStudentEmail(email);
        if (student == null) {
            throw new StudentNotFoundException("Student not found with email: " + email);
        }
        return student;
    }
//all validation should go here
    public void validateStudent(Student student) {
        int selectedSemester = student.getStudentSemester();
        int maxSemester = student.getEnrolledCourse().getTotalSemesters();

        if (selectedSemester < 1 || selectedSemester > maxSemester) {
            throw new InvalidStudentException("Semester must be between 1 and " + maxSemester + " for course " + student.getEnrolledCourse());
        }

        LocalDate today = LocalDate.now();
        int age = Period.between(student.getStudentDOB(), today).getYears();
        if (age < 16) {
            throw new InvalidStudentException("Student must be at least 16 years old.");
        }

        if (student.getStudentLastExamPercentage() < 0 || student.getStudentLastExamPercentage() > 100) {
            throw new InvalidStudentException("Percentage must be between 0 and 100.");
        }
    }

}
