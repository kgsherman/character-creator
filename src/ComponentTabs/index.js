import React from 'react';
import styled from 'styled-components';

import { useAppState } from '../context/AppContext';

const Container = styled.div`
    display: flex;
`;

const Tile = styled.button`
    width: 100px;
    height: 100px;
`;

const ComponentTab = () => {

    const { appState, selectComponentTab } = useAppState();

    const selectedRace = appState.find(race => race.selected);


    if (selectedRace) {
        const components = selectedRace.components.sort((a, b) => a.order - b.order);
        return (
            <Container>
                {components.map(component => 
                    <Tile key={component.name} onClick={() => selectComponentTab(component.name)}>{component.name}</Tile>
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