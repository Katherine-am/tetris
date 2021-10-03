import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    // Initial state of stage is an empty stage
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => 
            newStage.reduce((accumulator, row) => {
                // Checking if any part of the row contains a '0' which means there's
                // an open cell and the row should not be cleared
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return accumulator;
                }
                accumulator.push(row);
                return accumulator;
            }, []);

        const updateStage = prevStage => {
            // first flush the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                });
            });

            // Then check if we collided
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prevState => updateStage(prevState));
        // Below are the dependencies that are needed for this useEffect
        // They are used inside the useEffect which is why they have to be specified as dependencies
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
}