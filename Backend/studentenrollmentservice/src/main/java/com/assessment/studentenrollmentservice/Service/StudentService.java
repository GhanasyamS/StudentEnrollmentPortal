package com.assessment.studentenrollmentservice.Service;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import com.assessment.studentenrollmentservice.Exception.InvalidStudentException;
import com.assessment.studentenrollmentservice.Exception.StudentNotFoundException;
import com.assessment.studentenrollmentservice.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

public class StudentService implements IStudentService
{
    private StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) throws InvalidStudentException
    {
        if(validateStudent(student))
        {
            studentRepository.save(student);
        }
        else
         throw new InvalidStudentException("Student is under 18");

        return student;
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
      Student existingStudent = studentRepository.findByStudentID(studentId);
      if(validateStudent(updatedStudent))
      {
          existingStudent.setStudentName(updatedStudent.getStudentName());
          existingStudent.setStudentGender(updatedStudent.getStudentGender());
          existingStudent.setStudentDOB(updatedStudent.getStudentDOB());
          existingStudent.setStudentEmail(updatedStudent.getStudentEmail());
          existingStudent.setStudentMobile(updatedStudent.getStudentMobile());
          existingStudent.setStudentAddress(updatedStudent.getStudentAddress());
          existingStudent.setEnrolledCourse(updatedStudent.getEnrolledCourse());
          existingStudent.setStudentSemester(updatedStudent.getStudentSemester());
          existingStudent.setStudentLastExamPercentage(updatedStudent.getStudentLastExamPercentage());

          return studentRepository.save(existingStudent);
      }
      else throw new InvalidStudentException("Invalid Student Details");
    }

    @Override
    public void deleteStudent(Long id)
    {
        studentRepository.deleteById(id);

    }

    @Override
    public boolean validateStudent(Student student)
    {
        int selectedSemester = student.getStudentSemester();
        int maxSemester = student.getEnrolledCourse().getTotalSemesters();

        if(selectedSemester<1||selectedSemester>maxSemester)
        {
            return false;
        }

        LocalDate today = LocalDate.now();
        int age = Period.between(student.getStudentDOB(), today).getYears();
        if (age < 16)
        {
            return false;
        }
        return true;
    }

    @Override
    public void updateStudentCourse(long studentID,Course course)
    {
        Student currentStudentData = studentRepository.findByStudentID(studentID);
        currentStudentData.setEnrolledCourse(course);
        studentRepository.save(currentStudentData);
    }

    @Override
    public void updateStudentSemester(long studentID,int semester)
    {
        Student currentStudentData = studentRepository.findByStudentID(studentID);
        currentStudentData.setStudentSemester(semester);
        studentRepository.save(currentStudentData);

    }
}
