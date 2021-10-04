// This is not a react component so react does not need to be imported
import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
    // With ES6, we can use destructuring to grab two values 
    // Destructuring is a JavaScript expression that makes it possible to 
    // unpack values from arrays, or properties from objects, into distinct
    // variables.
    // That is, we can extract data from arrays and objects and assign them
    // to variables.
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        // shape is random
        tetromino: TETROMINOS[0].shape,
        // no way the shape has collided into anything yet
        collided: false,
    });

    function rotate(matrix, dir) {
        // Make the rows to become columns (transpose)
        const rotatedTetro = matrix.map((_, index) => 
            matrix.map(col => col[index])
        );
        // Reverse each row to get a rotated matrix
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    function playerRotate(stage, dir) {
        // DO NOT MUTATE STATE, make a deep clone of the player
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x ), y: (prev.pos.y += y )},
            collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer, playerRotate];
};