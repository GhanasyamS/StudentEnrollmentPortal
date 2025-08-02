package com.assessment.studentenrollmentservice.Domain;

public enum Course
{
    BTECH(8),
    BSC(6),
    MBA(4),
    BCOM(6);

    private final int totalSemesters;

    Course(int totalSemesters)
    {
        this.totalSemesters = totalSemesters;
    }

    public int getTotalSemesters() {
        return totalSemesters;
    }
}
