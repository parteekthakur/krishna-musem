package com.aryan.krishna_museum.repository;

import com.aryan.krishna_museum.model.Event;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EventRepository {

    private final JdbcTemplate jdbcTemplate;

    public EventRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET ALL EVENTS
    public List<Event> getAllEvents() {
        String sql = "SELECT * FROM event ORDER BY event_date DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    // GET UPCOMING EVENTS
    public List<Event> getUpcomingEvents() {
        String sql = "SELECT * FROM event WHERE event_date >= CURDATE() ORDER BY event_date ASC LIMIT 10";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    // GET EVENT BY ID
    public Event getEventById(int eventId) {
        String sql = "SELECT * FROM event WHERE event_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{eventId}, new BeanPropertyRowMapper<>(Event.class));
    }

    // ADD EVENT (ADMIN)
    public void addEvent(Event event) {
        String sql = "INSERT INTO event (title, description, event_date, location, category, image_url, capacity, registered, created_date) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        jdbcTemplate.update(sql, event.getTitle(), event.getDescription(), event.getEventDate(),
                event.getLocation(), event.getCategory(), event.getImageUrl(), event.getCapacity(), event.getRegistered());
    }

    // UPDATE EVENT
    public void updateEvent(Event event) {
        String sql = "UPDATE event SET title = ?, description = ?, event_date = ?, location = ?, category = ?, image_url = ?, capacity = ? WHERE event_id = ?";
        jdbcTemplate.update(sql, event.getTitle(), event.getDescription(), event.getEventDate(),
                event.getLocation(), event.getCategory(), event.getImageUrl(), event.getCapacity(), event.getEventId());
    }

    // DELETE EVENT
    public void deleteEvent(int eventId) {
        String sql = "DELETE FROM event WHERE event_id = ?";
        jdbcTemplate.update(sql, eventId);
    }

    // FILTER BY CATEGORY
    public List<Event> getEventsByCategory(String category) {
        String sql = "SELECT * FROM event WHERE category = ? ORDER BY event_date DESC";
        return jdbcTemplate.query(sql, new Object[]{category}, new BeanPropertyRowMapper<>(Event.class));
    }
}
