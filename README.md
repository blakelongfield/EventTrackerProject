## Event Tracker Project

## Overview

This project simulates a tracking program similar to programs like myFitnessPal, however, this program tracks workouts for the user. This project implements each of the CRUD operations. All methods in the controller are functional and can be tested with the Postman app.

The index method: A list of all the workouts in the database will be shown.
Route: api/workouts

The findById method: When an id of a specific workout is passed in by the user, that workout will be shown.
Route: api/workouts/{id}

The create method: Creates a new workout when the user passes in the necessary information.
Route: api/workouts

The replace method: The user can pass in a workout id and replace this workout with a new one passed in by the user.
Route: api/workouts/{id}  

The update method: The user can pass in the updated information for a specific workout and it will all be stored in the database.
Route: api/workouts/{id}  

The delete method: The user can pass in a workout id and it will delete the workout from the database.
Route: api/workouts/{id}  

Http status responses have been implemented to show that the information has been correctly passed in by the user.

## Technologies Used
* Spring Boot
* JPA
* MySQL Workbench
* Gradle
* REST
* Postman
* Junit Testing
* Servers
* Repositories
