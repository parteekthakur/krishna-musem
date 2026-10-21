package com.aryan.krishna_museum.repository;

import com.aryan.krishna_museum.model.Artefact;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArtefactRepository {

    private final JdbcTemplate jdbcTemplate;

    public ArtefactRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 🔹 GET ALL ARTEFACTS
    public List<Artefact> getAllArtefacts() {
        String sql = "SELECT * FROM artefact";
        return jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Artefact.class));
    }

    // 🔹 SEARCH (IMPORTANT 🔥)
    public List<Artefact> search(String keyword) {

        String sql = "SELECT * FROM artefact WHERE " +
                "LOWER(name) LIKE LOWER(?) OR " +
                "LOWER(type) LIKE LOWER(?) OR " +
                "LOWER(material) LIKE LOWER(?) OR " +
                "LOWER(dynasty) LIKE LOWER(?) OR " +
                "LOWER(region) LIKE LOWER(?) OR " +
                "LOWER(deity) LIKE LOWER(?) OR " +
                "LOWER(description) LIKE LOWER(?)";

        String k = "%" + keyword + "%";

        return jdbcTemplate.query(sql,
                new Object[]{k, k, k, k, k, k, k},
                new BeanPropertyRowMapper<>(Artefact.class));
    }

    // 🔹 FILTER BY FLOOR
    public List<Artefact> getByFloor(int floor) {
        String sql = "SELECT * FROM artefact WHERE floor=?";
        return jdbcTemplate.query(sql,
                new Object[]{floor},
                new BeanPropertyRowMapper<>(Artefact.class));
    }

    // 🔹 GET BY ID (DETAIL PAGE)
    public Artefact getById(int id) {
        String sql = "SELECT * FROM artefact WHERE artefact_id=?";
        return jdbcTemplate.queryForObject(sql,
                new Object[]{id},
                new BeanPropertyRowMapper<>(Artefact.class));
    }

    // 🔹 RELATED ARTEFACTS
    public List<Artefact> getRelated(String dynasty) {
        String sql = "SELECT * FROM artefact WHERE dynasty=?";
        return jdbcTemplate.query(sql,
                new Object[]{dynasty},
                new BeanPropertyRowMapper<>(Artefact.class));
    }

    // 🔹 ADD ARTEFACT (ADMIN)
    public void addArtefact(Artefact a) {
        String sql = "INSERT INTO artefact " +
                "(code,name,type,material,dynasty,region,deity,museum,description,image_url,floor) " +
                "VALUES (?,?,?,?,?,?,?,?,?,?,?)";

        jdbcTemplate.update(sql,
                a.getCode(), a.getName(), a.getType(), a.getMaterial(),
                a.getDynasty(), a.getRegion(), a.getDeity(),
                a.getMuseum(), a.getDescription(),
                a.getImageUrl(), a.getFloor());
    }
}