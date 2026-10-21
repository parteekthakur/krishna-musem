package com.aryan.krishna_museum.controller;

import com.aryan.krishna_museum.model.Event;
import com.aryan.krishna_museum.repository.EventRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepo;

    public EventController(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
    }

    // GET ALL EVENTS
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepo.getAllEvents();
    }

    // GET UPCOMING EVENTS
    @GetMapping("/upcoming")
    public List<Event> getUpcomingEvents() {
        return eventRepo.getUpcomingEvents();
    }

    // GET EVENT BY ID
    @GetMapping("/{eventId}")
    public Event getEventById(@PathVariable int eventId) {
        return eventRepo.getEventById(eventId);
    }

    // GET EVENTS BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Event> getEventsByCategory(@PathVariable String category) {
        return eventRepo.getEventsByCategory(category);
    }

    // ADD EVENT (ADMIN ONLY)
    @PostMapping("/admin/add")
    public Map<String, String> addEvent(@RequestBody Event event, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        String role = (String) session.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            response.put("status", "error");
            response.put("message", "Unauthorized");
            return response;
        }

        try {
            event.setCreatedDate(LocalDateTime.now());
            eventRepo.addEvent(event);
            response.put("status", "success");
            response.put("message", "Event created successfully");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to create event");
        }
        return response;
    }

    // UPDATE EVENT (ADMIN ONLY)
    @PutMapping("/admin/update/{eventId}")
    public Map<String, String> updateEvent(@PathVariable int eventId,
                                           @RequestBody Event event,
                                           HttpSession session) {
        Map<String, String> response = new HashMap<>();
        String role = (String) session.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            response.put("status", "error");
            response.put("message", "Unauthorized");
            return response;
        }

        try {
            event.setEventId(eventId);
            eventRepo.updateEvent(event);
            response.put("status", "success");
            response.put("message", "Event updated successfully");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to update event");
        }
        return response;
    }

    // DELETE EVENT (ADMIN ONLY)
    @DeleteMapping("/admin/delete/{eventId}")
    public Map<String, String> deleteEvent(@PathVariable int eventId, HttpSession session) {
        Map<String, String> response = new HashMap<>();
        String role = (String) session.getAttribute("role");

        if (!"ADMIN".equals(role)) {
            response.put("status", "error");
            response.put("message", "Unauthorized");
            return response;
        }

        try {
            eventRepo.deleteEvent(eventId);
            response.put("status", "success");
            response.put("message", "Event deleted successfully");
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Failed to delete event");
        }
        return response;
    }
}
