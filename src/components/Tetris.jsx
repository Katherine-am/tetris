import React from 'react';

//components
import Stage from './Stage';
import StartButton from './StartButton';
import Display from './Display';

//helper functions
import {createStage} from '../gameHelpers';

//styles
import { StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';

function Tetris() {

    return(
        <StyledTetrisWrapper>
            <StyledTetris>
            <Stage stage={createStage()} />
            <aside>
                <div>
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                </div>
                <StartButton />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;