window.addEventListener('load', function(e) {
	console.log('document loaded');
	getDataForTable();
	newWorkout();
});

function newWorkout() {
	document.createNewWorkoutForm.submit.addEventListener('click', function(
			event) {
		event.preventDefault();
		let form = event.target.parentElement;
		let workout = {
			type : form.type.value,
			duration : form.duration.value,
			exercise : form.exercise.value,
			caloriesBurned : form.caloriesBurned.value
		};
		createNewWorkout(workout);
	});
}

function getDataForTable() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/workouts');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('success');
				let response = xhr.responseText;
				let workouts = JSON.parse(response);
				tableOfData(workouts);
			} else {
				console.log('denied');
			}
		}
		;
	}
	xhr.send();
}

function deleteWorkoutById(workoutId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/workouts/' + workoutId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 204) {
				let divSingleWorkout = document
						.getElementById('divSingleWorkout');
				getDataForTable();
			} else {
				console.log('denied');
			}
		}
	};
	xhr.send();
}

function createNewWorkout(workout) {
	let xhr = new XMLHttpRequest();
	let workoutJson = JSON.stringify(workout);
	xhr.open('POST', 'api/workouts');
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				let newWorkout = JSON.parse(xhr.responseText);
				getDataForTable();
			}
		}
	};
	xhr.send(workoutJson);
}

function getWorkoutById(workoutId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/workouts/' + workoutId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('success');
				let response = xhr.responseText;
				let workout = JSON.parse(response);
				singleWorkoutDetails(workout);
				console.log(workout);
			} else {
				console.log('denied');
			}
		}
	};
	xhr.send();
}

function updateWorkout(managedWorkout) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/workouts/' + managedWorkout.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 202) {
				console.log('success');
				let response = xhr.responseText;
				let updatedWorkout = JSON.parse(response);
				console.log(updatedWorkout);
			} else {
				console.log('denied');
			}
		}
	};
	xhr.send();
}

function updateWorkoutById(managedWorkout) {
	// let br = document.createElement('br');
	// let divSingleWorkoutUpdate = document.getElementById('divSingleWorkout');
	// let updateForm = document.createElement('form');
	// updateForm.setAttribute('id', 'updateForm');
	// divSingleWorkoutUpdate.appendChild(updateForm);
	//	
	// let h3 = document.createElement('h3');
	// h3.textContent = 'Edit a workout';
	// updateForm.appendChild(h3);
	//	
	// let typeTextField = document.createElement('input');
	// typeTextField.setAttribute('type', 'text');
	// typeTextField.setAttribute('value', '');
	// updateForm.appendChild(typeTextField);
	//	
	// let durationTextField = document.createElement('input');
	// durationTextField.setAttribute('type', 'number');
	// durationTextField.setAttribute('placeholder', 'duration');
	// durationTextField.setAttribute('value', '');
	// updateForm.appendChild(durationTextField);
	//	
	// let exerciseTextField = document.createElement('input');
	// exerciseTextField.setAttribute('type', 'text');
	// exerciseTextField.setAttribute('value', '');
	// updateForm.appendChild(exerciseTextField);
	//
	// let caloriesBurnedTextField = document.createElement('input');
	// caloriesBurnedTextField.setAttribute('type', 'number');
	// caloriesBurnedTextField.setAttribute('value', '');
	// updateForm.appendChild(caloriesBurnedTextField);
	//	
	// let updateSubmitButton = document.createElement('input');
	// updateSubmitButton.setAttribute('type', 'button');
	// updateSubmitButton.setAttribute('value', 'submit');
	// updateForm.appendChild(updateSubmitButton);
	//	
	updateSubmitButton.addEventListener('click', function(e) {
		e.preventDefault();
		var form = document.getElementById('updateForm');
		let managedWorkout = {
			type : form.type.value,
			duration : form.duration.value,
			exercise : form.exercise.value,
			caloriesBurned : form.caloriesBurned.value
		};
		console.log(managedWorkout);
		updateWorkout(managedWorkout.id);
	});
}

function tableOfData(workouts) {
	// finding the div
	let divTable = document.getElementById('divTable');
	divTable.textContent = '';
	// create table
	let table = document.createElement('table');
	table.setAttribute('id', 'workoutTable');
	divTable.appendChild(table);
	// create thead
	let thead = document.createElement('thead');
	thead.setAttribute('id', 'workoutThead');
	table.appendChild(thead);
	// create tr for thead
	let trHead = document.createElement('tr');
	thead.appendChild(trHead);
	// create th for thead
	let thSpace = document.createElement('th');
	thSpace.textContent = 'id';
	trHead.appendChild(thSpace);
	// create Type for thead
	let thType = document.createElement('th');
	thType.textContent = 'Type';
	trHead.appendChild(thType);
	// create Duration for thead
	let thDuration = document.createElement('th');
	thDuration.textContent = 'Duration';
	trHead.appendChild(thDuration);
	// create Exercise for thead
	let thExercise = document.createElement('th');
	thExercise.textContent = 'Exercise';
	trHead.appendChild(thExercise);
	// create CaloriesBurned for thead
	let thCaloriesBurned = document.createElement('th');
	thCaloriesBurned.textContent = 'Calories Burned';
	trHead.appendChild(thCaloriesBurned);
	// create tbody
	let tbody = document.createElement('tbody');
	tbody.setAttribute('id', 'workoutTbody');
	table.appendChild(tbody);

	for (let i = 0; i < workouts.length; i++) {
		let thRows = document.createElement('th');
		thRows.textContent = printToScreen(workouts[i]);
	}
}

function printToScreen(workout) {
	let tBody = document.getElementById('workoutTbody');

	let tr = document.createElement('tr');
	tr.addEventListener('click', function(e) {
		getWorkoutById(workout.id);
	});
	tr.textContent = workout.id;
	tBody.appendChild(tr);

	let tdType = document.createElement('td');
	tdType.textContent = workout.type;
	tr.appendChild(tdType);

	let tdDuration = document.createElement('td');
	tdDuration.textContent = workout.duration;
	tr.appendChild(tdDuration);

	let tdExercise = document.createElement('td');
	tdExercise.textContent = workout.exercise;
	tr.appendChild(tdExercise);

	let tdCaloriesBurned = document.createElement('td');
	tdCaloriesBurned.textContent = workout.caloriesBurned;
	tr.appendChild(tdCaloriesBurned);
}

function singleWorkoutDetails(workout) {
	let divSingleWorkout = document.getElementById('divSingleWorkout');
	divSingleWorkout.textContent = "";
	let ul = document.createElement('ul');
	divSingleWorkout.appendChild(ul);
	let liType = document.createElement('li');
	liType.textContent = workout.type;
	ul.appendChild(liType);
	let liDuration = document.createElement('li');
	liDuration.textContent = workout.duration;
	ul.appendChild(liDuration);
	let liExercise = document.createElement('li');
	liExercise.textContent = workout.exercise;
	ul.appendChild(liExercise);
	let liCaloriesBurned = document.createElement('li');
	liCaloriesBurned.textContent = workout.caloriesBurned;
	ul.appendChild(liCaloriesBurned);

	// creation of the udpdate button
	let updateButton = document.createElement('input');
	updateButton.setAttribute('type', 'button');
	updateButton.setAttribute('id', 'updateButton');
	updateButton.setAttribute('value', 'update');
	ul.appendChild(updateButton);

	updateButton.addEventListener('click', function(e) {
		let divSingleWorkoutUpdate = document
				.getElementById('divSingleWorkout');
		let updateForm = document.createElement('form');
		updateForm.setAttribute('id', 'updateForm');
		updateForm.setAttribute('name', 'updateForm');
		divSingleWorkoutUpdate.appendChild(updateForm);

		let h3 = document.createElement('h3');
		h3.textContent = 'EDIT';
		updateForm.appendChild(h3);

		let typeTextField = document.createElement('input');
		typeTextField.setAttribute('type', 'text');
		typeTextField.setAttribute('name', 'type');
		typeTextField.setAttribute('placeholder', 'type');
		typeTextField.setAttribute('value', '');
		updateForm.appendChild(typeTextField);

		let durationTextField = document.createElement('input');
		durationTextField.setAttribute('type', 'number');
		durationTextField.setAttribute('name', 'duration');
		durationTextField.setAttribute('placeholder', 'duration');
		durationTextField.setAttribute('value', '');
		updateForm.appendChild(durationTextField);

		let exerciseTextField = document.createElement('input');
		exerciseTextField.setAttribute('type', 'text');
		exerciseTextField.setAttribute('name', 'exercise');
		exerciseTextField.setAttribute('placeholder', 'exercise');
		exerciseTextField.setAttribute('value', '');
		updateForm.appendChild(exerciseTextField);

		let caloriesBurnedTextField = document.createElement('input');
		caloriesBurnedTextField.setAttribute('type', 'number');
		caloriesBurnedTextField.setAttribute('name', 'caloriesBurned');
		caloriesBurnedTextField.setAttribute('placeholder', 'calories burned');
		caloriesBurnedTextField.setAttribute('value', '');
		updateForm.appendChild(caloriesBurnedTextField);

		let updateSubmitButton = document.createElement('input');
		updateSubmitButton.setAttribute('type', 'button');
		updateSubmitButton.setAttribute('value', 'submit');
		updateForm.appendChild(updateSubmitButton);

		updateSubmitButton.addEventListener('click', function(e) {
			e.preventDefault();
			var form = document.getElementById('updateForm');
			let managedWorkout = {
				type : form.type.value,
				duration : form.duration.value,
				exercise : form.exercise.value,
				caloriesBurned : form.caloriesBurned.value
			};
			managedWorkout.Id = workout.id;
			console.log(managedWorkout.Id);
			updateWorkout(managedWorkout);
		});
	});

	// creation of the delete button
	let deleteButton = document.createElement('input');
	deleteButton.setAttribute('type', 'button');
	deleteButton.setAttribute('id', 'deleteButton');
	deleteButton.setAttribute('value', 'delete');

	deleteButton.addEventListener('click', function(e) {
		deleteWorkoutById(workout.id);
		divSingleWorkout.textContent = '';
	});
	ul.appendChild(deleteButton);
}