// fire this function after sidebar element were clicked
// e.g setting or slots
export const displaySlots = () => {
    console.log('Slots in sidebar was clicked');
    return {
        type: 'DISPLAY_SLOTS'
    }
} 

export const displaySettings = () => {
    console.log('Settings in sidebar were clicked');
    return {
        type: 'DISPLAY_SETTINGS'
    }
} 

