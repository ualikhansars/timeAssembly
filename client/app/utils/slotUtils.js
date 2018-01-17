export const removeSlotsAfterDueDate = (slots, currentDate) => {
    for(let slot of slots) {
        let processedDate = processDate(slot.dueDate);
        if(currentDate > slot.dueDate) {
            this.props.removeSlot(slot._id);
        }
    }
}

export const processDate = (dateString) => {
    return dateString.substring(0, 10);
}