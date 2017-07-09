// get startHour and startMinutes and duration
//  and return finishHour and finish Minites 

export const timeCalc = (startHour, startMin, duration=0) => {
        let finishHour = startHour;
        let finishMin = startMin;
        if(duration < 0) {
            duration = 0;
        }
        if(duration < 60) {
            let addition = startMin + duration; // 80 or 30
            if(addition === 60) {
                finishHour++;
                finishMin = 0;
            }
            if(addition < 60) { // 30
                finishMin = startMin + duration;
            }  
            if(addition > 60) { // 80
               let balance = startMin - duration;
               finishHour++;
               finishMin = balance;
            }
        } else { // duration > 60
            let parameter = Math.floor(duration / 60); // 200 / 60 === 3
            let balance = duration % 60;
            finishHour = startHour + parameter;
            finishMin = startMin + balance;
        }
        return {
            finishHour,
            finishMin
        }
}