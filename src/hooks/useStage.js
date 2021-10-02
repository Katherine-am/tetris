import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    // Initial state of stage is an empty stage
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
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

            return newStage;
        };

        setStage(prevState => updateStage(prevState));
        // Below are the dependencies that are needed for this useEffect
        // They are used inside the useEffect which is why they have to be specified as dependencies
    }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

    return [stage, setStage];
}