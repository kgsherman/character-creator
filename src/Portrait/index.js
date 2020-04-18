import React, { useState, useEffect, useRef } from 'react';

import { useAppState } from '../context/AppContext';

const Portrait = () => {

    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const { appState } = useAppState();

    // on load, set context
    useEffect(() => {
        const canvas = canvasRef.current;
        setCtx(canvas.getContext('2d'));
    }, [])

    // when context props change, draw new components
    useEffect(() => {
        if (!ctx)
            return;

        const selectedRace = appState.find(race => race.selected);

        selectedRace.components.sort((a, b) => a.z - b.z).forEach(component => {
            const imgSrc = `/components/${selectedRace.name}/${component.path}/${selectedRace.name}${component.name}${component.index}.png`;

            let img = new Image();
            img.src = imgSrc;

            ctx.drawImage(img, 0, 0);
        })
    }, [ctx, appState])

    return (
        <canvas
            id="portrait"
            width="600" 
            height="900"

            ref={canvasRef}
        >
        </canvas>
    )
}

export default Portrait;