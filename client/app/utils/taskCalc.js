// get tasks that starts after startTime
export let getTasksStartsAfterStartTime = (startTimeHours, startTimeMinutes, tasks) => {
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

export let getDueTime = (tasks) => {
	// get minimum task from tasksStartsAfterStartTime
	// then calculate hours and mins until previous
	// task should be done
	if(tasks.length > 0) {
		let min = 0;
		for(let i = 1; i < tasks.length; ++i) {
			if(tasks[min].startTimeHours === tasks[i].startTimeHours) {
				if(tasks[min].startTimeMinutes > tasks[i].startTimeMinutes) {
					min = i;
				}
			}
			if(tasks[min].startTimeHours > tasks[i].startTimeHours) {
				min = i;
			}
		}
		return {
			dueHours: tasks[min].startTimeHours,
			dueMins: tasks[min].startTimeMinutes
		}; 
	}
	return {
		dueHours: 24,
		dueMins: 0
	}
}
