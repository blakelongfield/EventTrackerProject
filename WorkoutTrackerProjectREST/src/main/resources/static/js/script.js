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

function patchWorkout() {
	document.updateWorkout.update.addEventListener('click', function(es) {
		es.preventDefault();
		let form = event.target.parentElement;
		let workout = {
				type : form.type.value,
				duration : form.duration.value,
				exercise : form.exercise.value,
				caloriesBurned : form.caloriesBurned.value
		};
		updateWorkout(workout);
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

function createNewWorkout(workout) {
	let xhr = new XMLHttpRequest();
	let workoutJson = JSON.stringify(workout);
	xhr.open('POST', 'api/workouts');
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let newWorkout = JSON.parse(xhr.responseText);
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
			}
			else {
				console.log('denied');
			}
		}
	};
	xhr.send();
}

function updateWorkout(workout) {
	let xhr = new XMLHttpRequest();
	let updatedWorkout = JSON.stringify(workout);
	xhr.open('PATCH', 'api/workouts' + workout.id);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let updatedWorkout = JSON.parse(xhr.responseText);
			}
		}
	};
	console.log(updateWorkout);
	xhr.send(workoutJson);
}

function update(workoutId) {
	let divSingleWorkout = document.getElementById('divSingleWorkout');
	divSingleWorkout = "";
	
	let typeTextField = document.createElement('input');
	typeTextField.setAttribute('type', 'text');
	typeTextField.setAttribute('name', 'type');
	divSingleWorkout.appendChild(typeTextField);
	
	let durationTextField = document.createElement('input');
	durationTextField.setAttribute('type', 'text');
	durationTextField.setAttribute('name', 'duration');
	divSingleWorkout.appendChild(durationTextField);
	
	let exerciseTextField = document.createElement('input');
	exerciseTextField.setAttribute('type', 'text');
	exerciseTextField.setAttribute('name', 'exercise');
	divSingleWorkout.appendChild(exerciseTextField);
	
	let caloriesBurnedTextField = document.createElement('input');
	caloriesBurnedTextField.setAttribute('type', 'text');
	caloriesBurnedTextField.setAttribute('name', 'caloriesBurned');
	divSingleWorkout.appendChild(caloriesBurnedTextField);
	
	let submit = document.createElement('input');
	submit.setAttribute('type', 'button');
	submit.setAttribute('id', 'submit');
	submit.setAttribute('value', 'submit');
	submit.setAttribute('onclick', 'updateWorkout('+workoutId+')')
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

	// iterate through the array of objects and send each the print function to
	// be appended to the table
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
	
	//creation of the udpdate button
	let updateButton = document.createElement('input');
	updateButton.setAttribute('type', 'button');
	updateButton.setAttribute('id', 'updateButton');
	updateButton.setAttribute('value', 'update');
	updateButton.setAttribute('onclick', 'update('+workout.id+')');
	ul.appendChild(updateButton);
	
	//creation of the delete button
	let deleteButton = document.createElement('input');
	deleteButton.setAttribute('type', 'button');
	deleteButton.setAttribute('id', 'deleteButton');
	deleteButton.setAttribute('value', 'delete');
	deleteButton.setAttribute('onclick', 'GetTableValues()');
	ul.appendChild(deleteButton);
}
