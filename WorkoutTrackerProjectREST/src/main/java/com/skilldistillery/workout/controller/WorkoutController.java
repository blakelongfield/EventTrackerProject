package com.skilldistillery.workout.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.workout.data.WorkoutService;
import com.skilldistillery.workout.entities.Workout;

@RestController
@RequestMapping("api")
public class WorkoutController {
	@Autowired
	private WorkoutService serv;
	
	// this method shows all workouts that are stored in the database
	@GetMapping(path="workouts")
	public List<Workout> index(HttpServletResponse resp) {
		List<Workout> workouts= serv.showAll();
		if (workouts == null) {
			resp.setStatus(404);
		}
		return workouts;
	}
	
	@GetMapping(path="workouts/{id}")
	public Workout getWorkoutById(@PathVariable("id") int id, HttpServletResponse resp) {
		Workout workout = serv.findWorkoutById(id);
			return workout;
	}
	
	// this method allows the user to create a new workout
	@PostMapping(path="workouts")
	public Workout createWorkout(@RequestBody Workout workout, HttpServletResponse resp) {
		workout = serv.createWorkout(workout);
		if (workout != null) {
			resp.setStatus(201);
		}
		return workout;
	}
	
	// this method allows the user to replace a workout
	@PutMapping(path="workouts/{id}")
	public Workout replaceWorkout(@RequestBody Workout workout, @PathVariable("id") int id, HttpServletResponse resp) {
		workout = serv.replaceWorkout(workout, id);
		return workout;
	}
	
	// this method allows the user to update an already exisiting workout 
	@PatchMapping(path="workouts/{id}")
	public Workout updateWorkout(@RequestBody Workout workout, @PathVariable("id") int id, HttpServletResponse resp) {
		workout = serv.updateWorkout(workout, id);
		return workout;
	}
	
	// this method allows the user to delete a workout by passing in an id
	@DeleteMapping(path="workouts/{id}")
	public void deleteWorkout(@PathVariable("id") int id, HttpServletResponse resp) {	
		if (serv.deleteWorkout(id)) {
			resp.setStatus(204);
		}
		else {
			resp.setStatus(404);
		}
	}
}
