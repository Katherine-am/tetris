export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//create multidimensional grid
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () => 
        //for each row we create a new array
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )