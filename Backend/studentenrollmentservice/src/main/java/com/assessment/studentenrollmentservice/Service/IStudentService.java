package com.assessment.studentenrollmentservice.Service;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import com.assessment.studentenrollmentservice.Exception.InvalidStudentException;

import java.util.List;

public interface IStudentService
{


    Student createStudent(Student student) throws InvalidStudentException;
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    Student updateStudent(Long id, Student updatedStudent);
    void deleteStudent(Long id);
    boolean validateStudent(Student student) ;
    void updateStudentCourse(long studentID,Course course);
    void updateStudentSemester(long studentID,int semester);
//    List<Student> filterStudents(String course, Integer semester, String gender);
}
