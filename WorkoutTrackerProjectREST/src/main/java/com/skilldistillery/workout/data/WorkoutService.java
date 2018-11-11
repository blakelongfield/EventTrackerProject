package com.skilldistillery.workout.data;

import java.util.List;

import com.skilldistillery.workout.entities.Workout;

public interface WorkoutService {
	
	public List<Workout> showAll();
	
	public Workout createWorkout(Workout workout);
		
	public Boolean deleteWorkout(int id);

	public Workout replaceWorkout(Workout workout, int id);
	
	public Workout updateWorkout(Workout workout, int id);
	
}
