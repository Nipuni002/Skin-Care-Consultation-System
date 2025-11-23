package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class DoctorModel {
    @Id
    @GeneratedValue
    private Long id;

    private String Name;
    private String Experience;
    private String Phone;
    private String address;
    private String itemDescription;
    private String image;

    public DoctorModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getExperience() {
        return Experience;
    }

    public void setExperience(String experience) {
        Experience = experience;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public DoctorModel(Long id, String name, String experience, String phone, String address, String itemDescription, String image) {
        this.id = id;
        Name = name;
        Experience = experience;
        Phone = phone;
        this.address = address;
        this.itemDescription = itemDescription;
        this.image = image;
    }
}