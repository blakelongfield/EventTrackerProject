package com.skilldistillery.workout.data;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.workout.entities.Workout;
import com.skilldistillery.workout.repositories.WorkoutRepository;

@Service
public class WorkoutOutServiceImpl implements WorkoutService {
	@Autowired
	private WorkoutRepository repo;

	@Override
	public List<Workout> showAll() {
		List <Workout> workouts = repo.findAll();
		return workouts;
	}

	@Override
	public Workout createWorkout(Workout workout) {
		workout = repo.saveAndFlush(workout);
		return workout;
	}

	@Override
	public Workout replaceWorkout(Workout workout, int id) {
		Workout managedWorkout = null;
		Optional<Workout> workoutOpt = repo.findById(id);
		if (workoutOpt.isPresent()) {
			managedWorkout = workoutOpt.get(); 
			managedWorkout.setType(workout.getType());
			managedWorkout.setExercise(workout.getExercise());
			managedWorkout.setDuration(workout.getDuration());
			managedWorkout.setCaloriesBurned(workout.getCaloriesBurned());
			managedWorkout = repo.saveAndFlush(managedWorkout);
		}
		return managedWorkout;
	}

	@Override
	public Boolean deleteWorkout(int id) {
		Boolean isWorkoutDeleted = false;
		Optional<Workout> workoutOpt = repo.findById(id);
		if (workoutOpt.isPresent()) {
			repo.deleteById(id);
			isWorkoutDeleted = true;
		}
		return isWorkoutDeleted;
	}

}
