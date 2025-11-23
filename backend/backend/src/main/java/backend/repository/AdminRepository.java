package backend.repository;

import backend.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {
    Optional<AdminModel> findByEmailAndPassword(String email, String password);
    Optional<AdminModel> findByEmail(String email);
}
