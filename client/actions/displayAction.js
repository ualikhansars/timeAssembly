// fire this function after sidebar element slots were clicked
export const displaySlots = () => {
    console.log('Slots in sidebar was clicked');
    return {
        type: 'DISPLAY_SLOTS'
    }
} 

// fire this function after sidebar element settings were clicked
export const displaySettings = () => {
    console.log('Settings in sidebar were clicked');
    return {
        type: 'DISPLAY_SETTINGS'
    }
} 

