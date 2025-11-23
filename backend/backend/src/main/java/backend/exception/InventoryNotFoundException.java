package backend.exception;

import backend.repository.InventoryRepository;

public class InventoryNotFoundException extends RuntimeException{
    public InventoryNotFoundException(Long id){
        super("could not find id" + id);

    }
    public InventoryNotFoundException(String message){
        super(message);
    }
}
