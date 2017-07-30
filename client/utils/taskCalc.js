// get tasks that starts after startTime
let getTasksStartsAfterStartTime = (startTimeHours, startTimeMinutes, tasks) => {
	let tasksStartsAfterStartTime = [];
	for(let i = 0; i < tasks.length; ++i) {
		if(tasks[i].startTimeHours === startTimeHours) {
			if(tasks[i].startTimeMinutes > startTimeMinutes) {
				tasksStartsAfterStartTime.push(tasks[i]);
			}
        }
		else if(tasks[i].startTimeHours > startTimeHours) {
			tasksStartsAfterStartTime.push(tasks[i]);	
		}
	}
	return tasksStartsAfterStartTime;
}

let getMinTask = (tasks) => {
	// get minimum task from tasksStartsAfterStartTime
	min = 0;
	for(let i = 1; i < tasks.length; ++i) {
		if(tasks[min].startTimeHours === tasks[i].startTimeHours) {
			if(tasks[min].startTimeMinutes > tasks[i].startTimeMinutes) {
				min = i;
			}
		}
		if(tasks[min].startTimeHours > tasks[i].startTimeHours) {
			console.log(tasks[min].startTimeHours,' > ', tasks[i].startTimeHours);
			min = i;
		}
		else {
			console.log(tasks[min].startTimeHours,' < ', tasks[i].startTimeHours);
		} 
	}
	return tasks[min]; 
}
