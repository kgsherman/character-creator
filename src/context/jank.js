export default (resolve, state, componentName) => {
    const selectedRace = state.find(race => race.selected);
    const selectedComponent = selectedRace.components.find(component => component.name === componentName);
    const componentCanvas = document.createElement('canvas');
    componentCanvas.width = 600;
    componentCanvas.height = 900;
    const componentCtx = componentCanvas.getContext('2d');

    const componentImgSrc = `/components/${selectedRace.name}/${selectedComponent.path}/${selectedRace.name}${selectedComponent.name}${selectedComponent.index}.png`;

    let componentImg = new Image();
    componentImg.addEventListener('load', () => {

        componentCtx.drawImage(componentImg, 0, 0);

        if (selectedComponent.tint) {
            const tintSrc = `/components/${selectedRace.name}/${selectedComponent.path}/${selectedRace.name}${selectedComponent.name}${selectedComponent.index}_tint.png`;

            let tintImg = new Image();
            tintImg.addEventListener('load', () => {
                const tintCanvas = document.createElement('canvas');
                tintCanvas.width = 600;
                tintCanvas.height = 900;
                const tintCtx = tintCanvas.getContext('2d');
                tintCtx.drawImage(tintImg, 0, 0);
                tintCtx.globalCompositeOperation = 'source-atop';
                tintCtx.fillStyle = selectedComponent.tint;
                tintCtx.fillRect(0, 0, 600, 900);
                tintCtx.globalCompositeOperation = 'source-over';

                componentCtx.globalCompositeOperation = 'hard-light';
                componentCtx.drawImage(tintCanvas, 0, 0);
                componentCtx.globalCompositeOperation = 'source-over';
                resolve([
                    ...state.filter(race => !race.selected),
                    {
                        ...selectedRace,
                        components: [
                            ...selectedRace.components.filter(component => component.name !== componentName),
                            {
                                ...selectedComponent,
                                canvas: componentCanvas,
                            }
                        ]
                    }
                ]);
            })

            tintImg.src = tintSrc;
        } else {
            resolve([
                ...state.filter(race => !race.selected),
                {
                    ...selectedRace,
                    components: [
                        ...selectedRace.components.filter(component => component.name !== componentName),
                        {
                            ...selectedComponent,
                            canvas: componentCanvas,
                        }
                    ]
                }
            ]);
        }
    });
    componentImg.src = componentImgSrc;
}