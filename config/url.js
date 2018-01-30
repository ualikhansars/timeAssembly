import {development} from './settings';
export let url = 'https://timeassembly.com/';
if(development) {
    url = 'http://localhost:5000';
}
