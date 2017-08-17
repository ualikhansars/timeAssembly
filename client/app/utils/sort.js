const swap = (arr, a, b) => {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
} 

// selection sort for tasks
// sorting tasks by startTime
export const tasksSelectionSort = (tasks) => {
	for(let i = 0; i < tasks.length - 1; ++i) {
		let min = i;
		for(let j = i + 1; j < tasks.length; ++j) {
			if(tasks[j].startTimeHours === tasks[min].startTimeHours) {
				if(tasks[j].startTimeMinutes < tasks[min].startTimeMinutes) {
					min = j
				}
			}
			if(tasks[j].startTimeHours < tasks[min].startTimeHours) {
				min = j
			}
		}
		if(min !== i) {
			swap(tasks, min, i);
		}
	}
    return tasks;
};