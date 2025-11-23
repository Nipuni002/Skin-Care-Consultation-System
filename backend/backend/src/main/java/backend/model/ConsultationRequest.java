package backend.model;

public class ConsultationRequest {
    private String skinType;
    private String issue;
    private String routine;

    // Default constructor (VERY IMPORTANT)
    public ConsultationRequest() {}

    public String getSkinType() {
        return skinType;
    }

    public void setSkinType(String skinType) {
        this.skinType = skinType;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public String getRoutine() {
        return routine;
    }

    public void setRoutine(String routine) {
        this.routine = routine;
    }
}
