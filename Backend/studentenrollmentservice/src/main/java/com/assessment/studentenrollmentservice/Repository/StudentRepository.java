package com.assessment.studentenrollmentservice.Repository;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long>
{
 Student findByStudentEmail(String studentEmail);
 List<Student> findByEnrolledCourse(Course course);
}
