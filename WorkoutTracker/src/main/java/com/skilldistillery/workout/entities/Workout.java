package com.skilldistillery.workout.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Workout {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	private String type;

	private Integer duration;

	private String exercise;

	@Column(name="calories_burned")
	private Integer caloriesBurned;

	public Workout() {
		super();
	}

	public Workout(int id, String type, Integer duration, String exercise, Integer caloriesBurned) {
		super();
		this.id = id;
		this.type = type;
		this.duration = duration;
		this.exercise = exercise;
		this.caloriesBurned = caloriesBurned;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getExercise() {
		return exercise;
	}

	public void setExercise(String exercise) {
		this.exercise = exercise;
	}

	public Integer getCaloriesBurned() {
		return caloriesBurned;
	}

	public void setCaloriesBurned(Integer caloriesBurned) {
		this.caloriesBurned = caloriesBurned;
	}

	@Override
	public String toString() {
		return "Workout [id=" + id + ", type=" + type + ", duration=" + duration + ", exercise=" + exercise
				+ ", caloriesBurned=" + caloriesBurned + "]";
	}
}
