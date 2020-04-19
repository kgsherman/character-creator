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
            if (component.canvas) {
                ctx.drawImage(component.canvas, 0, 0)
            }
            /*const componentCanvas = document.createElement('canvas');
            componentCanvas.width = 600;
            componentCanvas.height = 900;
            const componentCtx = componentCanvas.getContext('2d');

            const componentImgSrc = `/components/${selectedRace.name}/${component.path}/${selectedRace.name}${component.name}${component.index}.png`;
            let componentImg = new Image();
            componentImg.addEventListener('load', () => {

                componentCtx.drawImage(componentImg, 0, 0);

                if (component.tint) {
                    const tintSrc = `/components/${selectedRace.name}/${component.path}/${selectedRace.name}${component.name}${component.index}_tint.png`;
                    let tint = new Image();
                    tint.addEventListener('load', () => {
                        const tintCanvas = document.createElement('canvas');
                        tintCanvas.width = 600;
                        tintCanvas.height = 900;
                        const tintCtx = tintCanvas.getContext('2d');
                        tintCtx.drawImage(tint, 0, 0);
                        tintCtx.globalCompositeOperation = 'source-atop';
                        tintCtx.fillStyle = component.tint;
                        tintCtx.fillRect(0, 0, 600, 900);
                        tintCtx.globalCompositeOperation = 'source-over';

                        componentCtx.globalCompositeOperation = 'color';
                        componentCtx.drawImage(tintCanvas, 0, 0);
                        componentCtx.globalCompositeOperation = 'source-over';

                        //ctx.drawImage(componentCanvas, 0, 0);
                        setCanvases([
                            ...canvases,
                            {
                                canvas: componentCanvas,
                                order: component.z,
                            }
                        ]);
                    })

                    tint.src = tintSrc;
                } else {
                    setCanvases([
                        ...canvases,
                        {
                            canvas: componentCanvas,
                            order: component.z,
                        }
                    ]);
                }

                
            });
            componentImg.src = componentImgSrc;*/


        })
    }, [ctx, appState])

    /*useEffect(() => {
        if (!canvases.length || !ctx)
            return;

        ctx.clearRect(0, 0, 600, 900);

        canvases.sort((a, b) => a.order - b.order).forEach(({ canvas }) => {
            ctx.drawImage(canvas, 0, 0)
        });
    }, [canvases, ctx])*/

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