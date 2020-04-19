import React, { createContext, useContext, useEffect } from 'react';
import useAsyncReducer from './useAsyncReducer';
import races from '../config/races.json';
import jank from './jank';

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
    switch (action.type) {
      case 'setCanvas':
        jank(resolve, state)
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
        const newState1 = [
          ...state.filter(race => !race.selected),
          {
            ...selectedRace,
            components: selectedRace.components.map(component => ({
              ...component,
              index: component.name === action.componentName ? action.index : component.index,
            })),
          }
        ];
        jank(resolve,  newState1)
        
        break;
      case 'selectComponentTint':
        const newState2 = [
          ...state.filter(race => !race.selected),
          {
            ...selectedRace,
            components: selectedRace.components.map(component => ({
              ...component,
              tint: component.name === action.componentName ? action.tint : component.tint,
            }))
          }
        ]
        jank(resolve,  newState2)
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
  }

  const selectComponentTint = (componentName, tint) => {
    dispatch({
      type: 'selectComponentTint',
      componentName,
      tint,
    });
  }

  return <AppContext.Provider value={{ selectRace, selectComponentTab, selectComponentIndex, selectComponentTint, appState }}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);