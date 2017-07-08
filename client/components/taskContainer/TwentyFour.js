import React from 'react';

import HalfAnHour from './HalfAnHour';

class TwentyFour extends React.Component {
    render() {
        let time = [];
        let min = 0;
        let hour = 0;
        let index=0;
        for(hour=0; hour<24; ++hour) {
            for(let min=0; min<60; min+=30) {
                let pushedMin = String(min);
                let pushedHour = String(hour);
                if(pushedMin == 0) {
                    pushedMin = '00';
                }
                time.push(
                    <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                );
                index++;
            }
            if(min === 60) {
                min = 0;
            };
        }
        return (
            <div className="container">
               {time}
            </div>
        );
    }
}

export default TwentyFour;