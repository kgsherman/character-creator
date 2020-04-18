import React, { createContext, useContext, useReducer } from 'react';
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

const reducer = (state, action) => {
  const selectedRace = state.find(race => race.selected);
  console.log('selectedRace', selectedRace)
  switch (action.type) {
    case 'selectRace':
      
      return state.map(race => ({
        ...race,
        selected: race.name === action.raceName,
      }));
    case 'selectComponentTab':
      
      return [
        ...state.filter(race => !race.selected),
        {
          ...selectedRace,
          components: selectedRace.components.map(component => ({
            ...component,
            selected: component.name === action.componentName,
          }))
        }
      ]
    case 'selectComponentIndex':
      const selectedComponent = selectedRace.components.find(component => component.selected);
      return [
        ...state.filter(race => !race.selected),
        {
          ...selectedRace,
          components: [
            ...selectedRace.components.filter(component => !component.selected),
            {
              ...selectedComponent,
              index: action.index,
            }
          ]
        }
      ]
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {

  const [appState, dispatch] = useReducer(reducer, initialState);

  const selectRace = (raceName) => {
    dispatch({
      type: 'selectRace',
      raceName,
    });
  }

  const selectComponentTab = (componentName) => {
    dispatch({
      type: 'selectComponentTab',
      componentName,
    });
  }

  const selectComponentIndex = (index) => {
    dispatch({
      type: 'selectComponentIndex',
      index,
    });
  }


  return <AppContext.Provider value={{ selectRace, selectComponentTab, selectComponentIndex, appState }}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);