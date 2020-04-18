import React from 'react';
import styled from 'styled-components';

import { useAppState } from '../context/AppContext';

const Container = styled.div`
    display: flex;
`;

const Tile = styled.div`
    width: 100px;
    height: 100px;
`;

const ComponentTab = () => {

    const { appState, selectComponentTab } = useAppState();

    const selectedRace = appState.find(race => race.selected);

    console.log({...appState})

    if (selectedRace) {
        return (
            <Container>
                {selectedRace.components.map(component => 
                    <Tile onClick={() => selectComponentTab(component.name)}>{component.name}</Tile>
                )}
            </Container>
        );
    } else {
        return (
            <div>
                Please select a race
            </div>
        );
    }

}

export default ComponentTab;