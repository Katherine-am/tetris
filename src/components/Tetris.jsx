import React from 'react';

//components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

//helper functions
import {creatStage, createStage} from '../gameHelpers';

function Tetris() {

    return(
        <div>
            <Stage stage={createStage()} />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                <StartButton />
            </aside>
        </div>
    )
}

export default Tetris;