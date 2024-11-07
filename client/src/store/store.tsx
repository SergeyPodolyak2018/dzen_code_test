import { createContext, useReducer } from 'react';
import { MMain } from '../models/main';
import { TMain } from '../definitions/main';
import { mainReducer, TAction } from './reduser';

type TState = { main: TMain };

const initialState = {
  main: MMain,
};
const AppContext = createContext<{
  state: TState;
  dispatch: React.Dispatch<TAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

type ContextProviderProps = {
  children: React.ReactNode;
};

function StateProvider({ children }: ContextProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, StateProvider };
