import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useAppState } from '../context/AppContext';

const Container = styled.div`
    display: flex;
`;

const Tile = styled.div`
    width: 100px;
    height: 100px;
`;

const Selector = ({ category }) => {

    const { appState, selectComponentIndex } = useAppState();

    const selectedRace = appState.find(race => race.selected);
    const selectedComponent = selectedRace.components.find(component => component.selected);

    if (selectedComponent) {
        const race = selectedRace.name;
        const component = selectedComponent.name;
    
        return (
            <Container>
                {
                    [...Array(selectedComponent.items)].map((e, i) => 
                        <Tile onClick={() => selectComponentIndex(i)}>
                            <img src={`components/${race}/${component}/${race}${component}${i}.png`} height="100" width="100"/>
                        </Tile>
                    )
                }
            </Container>
        );
    } else {
        return (
            <div>Please select a component</div>
        )
    }

}

export default Selector