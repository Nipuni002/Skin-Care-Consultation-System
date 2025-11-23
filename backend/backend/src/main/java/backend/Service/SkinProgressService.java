package backend.Service;

import backend.model.SkinProgress;
import backend.repository.SkinProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SkinProgressService {

    @Autowired
    private SkinProgressRepository repository;

    public SkinProgress saveProgress(SkinProgress progress) {
        return repository.save(progress);
    }

    public List<SkinProgress> getUserProgress(String userId) {
        return repository.findByUserIdOrderByWeekAsc(userId);
    }
}