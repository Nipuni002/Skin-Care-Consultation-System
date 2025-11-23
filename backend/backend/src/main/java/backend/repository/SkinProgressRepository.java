package backend.repository;

import backend.model.SkinProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkinProgressRepository extends JpaRepository<SkinProgress, Long> {
    List<SkinProgress> findByUserIdOrderByWeekAsc(String userId);
}