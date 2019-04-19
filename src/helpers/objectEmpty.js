///////////////////////////////////////////////
//Function for checking if an object is empty//
export const objectEmpty = (obj) => {
    for (let prop in obj) { 
        return false; 
    } 
    return true; 
}