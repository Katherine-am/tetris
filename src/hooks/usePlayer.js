// This is not a react component so react does not need to be imported
import { useState, useCallback } from 'react';

import { randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
    // With ES6, we can use destructuring to grab two values 
    // Destructuring is a JavaScript expression that makes it possible to 
    // unpack values from arrays, or properties from objects, into distinct
    // variables.
    // That is, we can extract data from arrays and objects and assign them
    // to variables.
    const [player, setPlayer] = useState({
        // setting up initial state for player
        // position is 0, 0
        pos: { x: 0, y: 0},
        // shape is random
        tetromino: randomTetromino().shape,
        // no way the shape has collided into anything yet
        collided: false,
    });

    // Prior to ES6, variables had to be defined line by line
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1];

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prevState => ({
            ...prevState,
            pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y)},
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer];
}