package com.aryan.krishna_museum.repository;

import com.aryan.krishna_museum.model.User;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 🔹 REGISTER
    public void save(User user) {
        String sql = "INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole());
    }

    // 🔹 LOGIN
    public User findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email=?";
        List<User> users = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(User.class),
                email);

        if (users.isEmpty()) {
            return null;
        }

        return users.get(0);
    }

    // 🔹 UPDATE PROFILE
    public void updateProfile(User user, String currentEmail) {
        String sql = "UPDATE users SET name=?, email=?, password=? WHERE email=?";
        jdbcTemplate.update(sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                currentEmail);
    }
}