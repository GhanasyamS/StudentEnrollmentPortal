package com.assessment.studentenrollmentservice.Domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name="students")
public class Student
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentRollNo", nullable = false)
    private Long studentID;

    @NotBlank(message = "Student name is required")
    @Column(nullable = false)
    private String studentName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender studentGender;

    @NotNull(message = "Date of Birth is required")
    @Column(nullable = false)
    private LocalDate studentDOB;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email format")
    @Column(nullable = false, unique = true)
    private String studentEmail;

    @NotNull(message = "Mobile number is required")
    @Digits(integer = 10, fraction = 0, message = "Mobile number must be 10 digits")
    @Column(nullable = false, unique = true)
    private Long studentMobile;

    @NotBlank(message = "Address is required")
    @Column(nullable = false, length = 500)
    private String studentAddress;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Course selection is required")
    @Column(nullable = false)
    private Course enrolledCourse;

    @Min(value = 1, message = "Semester must be at least 1")
    @Max(value = 8, message = "Semester cannot exceed 8")
    @Column(nullable = false)
    private Integer studentSemester;

    @Min(value = 0, message = "Percentage cannot be less than 0")
    @Max(value = 100, message = "Percentage cannot be more than 100")
    @Column(nullable = false)
    private Integer studentLastExamPercentage;

    public Student() {
    }

    public Student(Long studentID, String studentName, Gender studentGender, LocalDate studentDOB, String studentEmail,
                   Long studentMobile, String studentAddress, Course enrolledCourse, Integer studentSemester, Integer studentLastExamPercentage)
    {
        this.studentID = studentID;
        this.studentName = studentName;
        this.studentGender = studentGender;
        this.studentDOB = studentDOB;
        this.studentEmail = studentEmail;
        this.studentMobile = studentMobile;
        this.studentAddress = studentAddress;
        this.enrolledCourse = enrolledCourse;
        this.studentSemester = studentSemester;
        this.studentLastExamPercentage = studentLastExamPercentage;
    }

    public Long getStudentID() {
        return studentID;
    }

    public void setStudentID(Long studentID) {
        this.studentID = studentID;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public Gender getStudentGender() {
        return studentGender;
    }

    public void setStudentGender(Gender studentGender) {
        this.studentGender = studentGender;
    }

    public LocalDate getStudentDOB() {
        return studentDOB;
    }

    public void setStudentDOB(LocalDate studentDOB) {
        this.studentDOB = studentDOB;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Long getStudentMobile() {
        return studentMobile;
    }

    public void setStudentMobile(Long studentMobile) {
        this.studentMobile = studentMobile;
    }

    public String getStudentAddress() {
        return studentAddress;
    }

    public void setStudentAddress(String studentAddress) {
        this.studentAddress = studentAddress;
    }

    public Course getEnrolledCourse() {
        return enrolledCourse;
    }

    public void setEnrolledCourse(Course enrolledCourse) {
        this.enrolledCourse = enrolledCourse;
    }

    public Integer getStudentSemester() {
        return studentSemester;
    }

    public void setStudentSemester(Integer studentSemester) {
        this.studentSemester = studentSemester;
    }

    public Integer getStudentLastExamPercentage() {
        return studentLastExamPercentage;
    }

    public void setStudentLastExamPercentage(Integer studentLastExamPercentage) {
        this.studentLastExamPercentage = studentLastExamPercentage;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentID=" + studentID +
                ", studentName='" + studentName + '\'' +
                ", studentGender=" + studentGender +
                ", studentDOB=" + studentDOB +
                ", studentEmail='" + studentEmail + '\'' +
                ", studentMobile=" + studentMobile +
                ", studentAddress='" + studentAddress + '\'' +
                ", enrolledCourse=" + enrolledCourse +
                ", studentSemester=" + studentSemester +
                ", studentLastExamPercentage=" + studentLastExamPercentage +
                '}';
    }
}
