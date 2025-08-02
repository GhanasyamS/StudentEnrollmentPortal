package com.assessment.studentenrollmentservice.Service;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import com.assessment.studentenrollmentservice.Exception.InvalidStudentException;
import com.assessment.studentenrollmentservice.Exception.StudentNotFoundException;

import java.util.List;

public interface IStudentService
{


    Student createStudent(Student student) throws InvalidStudentException;
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    Student updateStudent(Long id, Student updatedStudent);
    void deleteStudent(Long id);
    void validateStudent(Student student) ;
    Student updateStudentCourse(long studentID,Course course);
    Student updateStudentSemester(long studentID,int semester);
    List<Student> fetchStudentsInCourse(Course course);
    Student fetchStudentByEmail(String email) throws StudentNotFoundException;
//    List<Student> filterStudents(String course, Integer semester, String gender);
}
