import {development} from '../config/settings';

export const logDev = {
    default: (text) => {
        if(development) {
            console.log(text);
        }
    },
    red: (text) => {
        if(development) {
            console.error(text);
        }
    }
}