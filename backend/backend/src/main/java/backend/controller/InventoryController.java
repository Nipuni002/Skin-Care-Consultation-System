package backend.controller;

import backend.model.InventoryModel;
import backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping("/inventory")
    public InventoryModel newInventoryModel(@RequestBody InventoryModel newInventoryModel) {
        return inventoryRepository.save(newInventoryModel);
    }

    @PostMapping("/inventory/itemImg")
    public String itemImage(@RequestParam("file") MultipartFile file) {
        String folder = "src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            file.transferTo(Paths.get(folder + itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + itemImage;
        }

        return itemImage;
    }

    @GetMapping("/inventory")
    public List<InventoryModel> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @PutMapping("/inventory/{id}")
    public InventoryModel updateInventoryItem(@PathVariable Long id, @RequestBody InventoryModel updatedItem) {
        return inventoryRepository.findById(id)
                .map(item -> {
                    item.setItemName(updatedItem.getItemName());
                    item.setItemCategory(updatedItem.getItemCategory());
                    item.setItemDescription(updatedItem.getItemDescription());

                    // Retain existing image if no new image is provided
                    if (updatedItem.getItemImage() != null && !updatedItem.getItemImage().isEmpty()) {
                        item.setItemImage(updatedItem.getItemImage());
                    }

                    item.setItemDelete(updatedItem.getItemDelete());
                    return inventoryRepository.save(item);
                })
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
    }


    @DeleteMapping("/inventory/{id}")
    public String deleteInventoryItem(@PathVariable Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new RuntimeException("Item not found with id: " + id);
        }
        inventoryRepository.deleteById(id);
        return "Item with id " + id + " has been deleted successfully.";
    }
}