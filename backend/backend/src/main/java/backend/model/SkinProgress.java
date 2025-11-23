package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class SkinProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId; // Assuming you have user authentication
    private LocalDate recordDate;
    private int week;
    private int acneLevel;
    private int hydrationLevel;
    private int rednessLevel;
    private String notes;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public int getWeek() { return week; }
    public void setWeek(int week) { this.week = week; }

    public int getAcneLevel() { return acneLevel; }
    public void setAcneLevel(int acneLevel) { this.acneLevel = acneLevel; }

    public int getHydrationLevel() { return hydrationLevel; }
    public void setHydrationLevel(int hydrationLevel) { this.hydrationLevel = hydrationLevel; }

    public int getRednessLevel() { return rednessLevel; }
    public void setRednessLevel(int rednessLevel) { this.rednessLevel = rednessLevel; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}