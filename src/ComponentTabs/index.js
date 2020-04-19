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

    const { appState, selectComponentTab, selectComponentTint } = useAppState();

    const selectedRace = appState.find(race => race.selected);

    if (selectedRace) {
        const components = selectedRace.components.sort((a, b) => a.order - b.order);
        return (
            <Container>
                {components.map(component =>
                    <div key={component.name}>
                        <Tile onClick={() => selectComponentTab(component.name)}>{component.name}</Tile><br/>
                        {component.tint && <input type="color" onChange={e => selectComponentTint(component.name, e.target.value)}  />}
                    </div>
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