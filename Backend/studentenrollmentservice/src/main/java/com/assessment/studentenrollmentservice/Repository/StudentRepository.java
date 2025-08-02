package com.assessment.studentenrollmentservice.Repository;

import com.assessment.studentenrollmentservice.Domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long>
{
 Student findByStudentEmail(String studentEmail);
 Student findByStudentID(Long studentID);
}
