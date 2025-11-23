package backend.controller;

import backend.model.SkinProgress;
import backend.Service.SkinProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skin-progress")
@CrossOrigin(origins = "http://localhost:3000")
public class SkinProgressController {

    @Autowired
    private SkinProgressService service;

    @PostMapping
    public SkinProgress saveProgress(@RequestBody SkinProgress progress) {
        return service.saveProgress(progress);
    }

    @GetMapping("/{userId}")
    public List<SkinProgress> getUserProgress(@PathVariable String userId) {
        return service.getUserProgress(userId);
    }
}