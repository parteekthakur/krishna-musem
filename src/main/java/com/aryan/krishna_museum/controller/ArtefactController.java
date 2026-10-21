package com.aryan.krishna_museum.controller;

import com.aryan.krishna_museum.model.Artefact;
import com.aryan.krishna_museum.repository.ArtefactRepository;
import org.springframework.web.bind.annotation.*;
 import jakarta.servlet.http.HttpSession;

import java.util.List;

@RestController
@RequestMapping("/api/artefacts")
public class ArtefactController {

    private final ArtefactRepository repo;

    public ArtefactController(ArtefactRepository repo) {
        this.repo = repo;
    }

    // 🔹 GET ALL
    @GetMapping
    public List<Artefact> getAll() {
        return repo.getAllArtefacts();
    }

    // 🔹 SEARCH 🔥
    @GetMapping("/search")
    public List<Artefact> search(@RequestParam String keyword) {
        return repo.search(keyword);
    }

    // 🔹 FLOOR FILTER
    @GetMapping("/floor/{floor}")
    public List<Artefact> getByFloor(@PathVariable int floor) {
        return repo.getByFloor(floor);
    }

    // 🔹 GET BY ID
    @GetMapping("/{id}")
    public Artefact getById(@PathVariable int id) {
        return repo.getById(id);
    }
  

@PostMapping("/admin/add")
public String addArtefact(@RequestBody Artefact a, HttpSession session) {

    Object user = session.getAttribute("user");

    // 🔐 SECURITY CHECK
    if (user == null) {
        return "Unauthorized";
    }

    repo.addArtefact(a);
    return "Added";
}
}