package backend.exception;

import backend.repository.InventoryRepository;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("could not find id" + id);

    }
    public UserNotFoundException(String message){
        super(message);
    }
}
