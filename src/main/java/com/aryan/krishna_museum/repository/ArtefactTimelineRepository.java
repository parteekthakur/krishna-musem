package com.aryan.krishna_museum.repository;

import com.aryan.krishna_museum.model.ArtefactTimeline;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArtefactTimelineRepository {

    private final JdbcTemplate jdbcTemplate;

    public ArtefactTimelineRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // GET TIMELINE BY ARTEFACT ID
    public ArtefactTimeline getTimelineByArtefactId(int artefactId) {
        String sql = "SELECT * FROM artefact_timeline WHERE artefact_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{artefactId}, new BeanPropertyRowMapper<>(ArtefactTimeline.class));
        } catch (Exception e) {
            return null;
        }
    }

    // GET ALL TIMELINES
    public List<ArtefactTimeline> getAllTimelines() {
        String sql = "SELECT * FROM artefact_timeline ORDER BY start_year DESC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ArtefactTimeline.class));
    }

    // ADD TIMELINE
    public void addTimeline(ArtefactTimeline timeline) {
        String sql = "INSERT INTO artefact_timeline (artefact_id, period, start_year, end_year, historical_context, significance) " +
                "VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, timeline.getArtefactId(), timeline.getPeriod(), timeline.getStartYear(),
                timeline.getEndYear(), timeline.getHistoricalContext(), timeline.getSignificance());
    }

    // GET TIMELINES BY PERIOD
    public List<ArtefactTimeline> getTimelinesByPeriod(String period) {
        String sql = "SELECT * FROM artefact_timeline WHERE period = ? ORDER BY start_year DESC";
        return jdbcTemplate.query(sql, new Object[]{period}, new BeanPropertyRowMapper<>(ArtefactTimeline.class));
    }

    // GET TIMELINES BY YEAR RANGE
    public List<ArtefactTimeline> getTimelinesByYearRange(int startYear, int endYear) {
        String sql = "SELECT * FROM artefact_timeline WHERE start_year >= ? AND end_year <= ? ORDER BY start_year DESC";
        return jdbcTemplate.query(sql, new Object[]{startYear, endYear}, new BeanPropertyRowMapper<>(ArtefactTimeline.class));
    }

    // UPDATE TIMELINE
    public void updateTimeline(ArtefactTimeline timeline) {
        String sql = "UPDATE artefact_timeline SET period = ?, start_year = ?, end_year = ?, historical_context = ?, significance = ? WHERE artefact_id = ?";
        jdbcTemplate.update(sql, timeline.getPeriod(), timeline.getStartYear(), timeline.getEndYear(),
                timeline.getHistoricalContext(), timeline.getSignificance(), timeline.getArtefactId());
    }
}
