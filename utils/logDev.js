export const logDev = {
    default: (text) => {
        if(process.env.NODE_ENV === 'development') {
            console.log(text);
        }
    },
    red: (text) => {
        if(process.env.NODE_ENV === 'development') {
            console.error(text);
        }
    }
}