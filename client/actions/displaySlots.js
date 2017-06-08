// fire this function after sidebar element were clicked
// e.g setting or slots
function displaySlots() {
    console.log('Sidebar were clicked');
    return {
        type: 'DISPLAY_SLOTS'
    }
}  

export default displaySlots; 