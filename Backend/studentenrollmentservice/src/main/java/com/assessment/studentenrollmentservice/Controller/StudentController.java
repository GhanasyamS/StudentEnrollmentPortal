package com.assessment.studentenrollmentservice.Controller;

import com.assessment.studentenrollmentservice.Domain.Course;
import com.assessment.studentenrollmentservice.Domain.Student;
import com.assessment.studentenrollmentservice.Service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController
{

    private final IStudentService studentService;

    @Autowired
    public StudentController(IStudentService studentService)
    {
        this.studentService = studentService;
    }


    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody Student student)
    {
        Student createdStudent = studentService.createStudent(student);
        return ResponseEntity.ok(createdStudent);
    }


    @GetMapping("fetchallstudents")
    public ResponseEntity<List<Student>> getAllStudents()
    {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }


    @GetMapping("fetchbyid/{studentID}")
    public ResponseEntity<Student> getStudentById(@PathVariable("studentID") Long id)
    {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }


    @PutMapping("updatebyid/{studentID}")
    public ResponseEntity<Student> updateStudent(@PathVariable("studentID") Long id, @RequestBody Student student)
    {
        Student updatedStudent = studentService.updateStudent(id, student);
        return ResponseEntity.ok(updatedStudent);
    }


    @DeleteMapping("deletebyid/{studentID}")
    public ResponseEntity<String> deleteStudent(@PathVariable("studentID") Long id)
    {
        studentService.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully.");
    }


    @PutMapping("updatecoursebyid/{studentID}/course")
    public ResponseEntity<Student> updateStudentCourse(@PathVariable("studentID") Long id, @RequestBody Course course) {
        Student updatedStudent = studentService.updateStudentCourse(id, course);
        return ResponseEntity.ok(updatedStudent);
    }


    @PutMapping("updatesemesterbyid/{studentID}/semester/{semester}")
    public ResponseEntity<Student> updateStudentSemester(@PathVariable("studentID") Long id, @PathVariable int semester) {
        Student updatedStudent = studentService.updateStudentSemester(id, semester);
        return ResponseEntity.ok(updatedStudent);
    }


    @GetMapping("fetchbycourse/course/{course}")
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable Course course) {
        List<Student> students = studentService.fetchStudentsInCourse(course);
        return ResponseEntity.ok(students);
    }


    @GetMapping("fetchbyemail/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable("email") String email) {
        Student student = studentService.fetchStudentByEmail(email);
        return ResponseEntity.ok(student);
    }

}
