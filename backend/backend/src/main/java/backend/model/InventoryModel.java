package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class InventoryModel {
    @Id
    @GeneratedValue
    private Long id;

    private String itemName;
    private String itemImage;
    private String itemCategory;
    private String itemDescription;
    private String itemDelete;

    public InventoryModel() {
    }

    public InventoryModel(Long id, String itemName, String itemImage, String itemCategory,
                          String itemDescription, String itemDelete) {
        this.id = id;
        this.itemName = itemName;
        this.itemImage = itemImage;
        this.itemCategory = itemCategory;
        this.itemDescription = itemDescription;
        this.itemDelete = itemDelete;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getItemDelete() {
        return itemDelete;
    }

    public void setItemDelete(String itemDelete) {
        this.itemDelete = itemDelete;
    }
}