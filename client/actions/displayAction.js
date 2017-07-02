// fire this function after sidebar element slots were clicked
export const displaySlots = () => {
    return {
        type: 'DISPLAY_SLOTS'
    }
} 

// fire this function after sidebar element settings were clicked
export const displaySettings = () => {
    return {
        type: 'DISPLAY_SETTINGS'
    }
}

export const displayNothing = () => {
    return {
        type: 'DISPLAY_NOTHING'
    }
} 

