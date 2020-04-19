import React, { createContext, useContext, useEffect } from 'react';
import useAsyncReducer from './useAsyncReducer';
import races from '../config/races.json';

const initialState = races.map(race => ({
  ...race,
  selected: race.name === 'Human',
  components: race.components.map(component => ({
    ...component,
    selected: false,
    index: 0,
  }))
}))

export const AppContext = createContext(initialState);

const reducer = async (state, action) => {
  const selectedRace = state.find(race => race.selected);
  return new Promise(async resolve => {
    const selectedComponent = selectedRace.components.find(component => component.selected);
    switch (action.type) {
      case 'setCanvas':
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
      
              componentCtx.globalCompositeOperation = 'color';
              componentCtx.drawImage(tintCanvas, 0, 0);
              componentCtx.globalCompositeOperation = 'source-over';
              resolve([
                ...state.filter(race => !race.selected),
                {
                  ...selectedRace,
                  components: [
                    ...selectedRace.components.filter(component => !component.selected),
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
                  ...selectedRace.components.filter(component => !component.selected),
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
        break;
      case 'selectRace':

        resolve(
          state.map(race => ({
            ...race,
            selected: race.name === action.raceName,
          }))
        );
        break;

      case 'selectComponentTab':
        resolve(
          [
            ...state.filter(race => !race.selected),
            {
              ...selectedRace,
              components: selectedRace.components.map(component => ({
                ...component,
                selected: component.name === action.componentName,
              }))
            }
          ]
        );
        break;
      case 'selectComponentIndex':        
        resolve([
          ...state.filter(race => !race.selected),
          {
            ...selectedRace,
            components: selectedRace.components.map(component => ({
              ...component,
              index: component.name === action.componentName ? action.index : component.index,
            })),
          }
        ]);
        
        break;
      case 'selectComponentTint':
        const newState = [
          ...state.filter(race => !race.selected),
          {
            ...selectedRace,
            components: selectedRace.components.map(component => ({
              ...component,
              tint: component.name === action.componentName ? action.tint : component.tint,
            }))
          }
        ]
        resolve(newState);
        break;
      default:
        resolve(state);
    }
  })
};

export const AppProvider = ({ children }) => {

  const [appState, dispatch] = useAsyncReducer(reducer, initialState);

  const selectRace = (raceName) => {
    dispatch({
      type: 'selectRace',
      raceName,
    })
  }

  const selectComponentTab = (componentName) => {
    dispatch({
      type: 'selectComponentTab',
      componentName,
    });
  }

  const selectComponentIndex = (componentName, index) => {
    dispatch({
      type: 'selectComponentIndex',
      componentName,
      index,
    });

    dispatch({
      type: 'setCanvas',
    });
  }

  const selectComponentTint = (componentName, tint) => {
    dispatch({
      type: 'selectComponentTint',
      componentName,
      tint,
    });

    dispatch({
      type: 'setCanvas',
    });
  }

  return <AppContext.Provider value={{ selectRace, selectComponentTab, selectComponentIndex, selectComponentTint, appState }}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);