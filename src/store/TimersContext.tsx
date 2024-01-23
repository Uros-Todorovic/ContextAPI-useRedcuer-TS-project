import { createContext } from 'react';
import { TimersContextValue } from './TimersContextProvider.tsx';

const TimersContext = createContext<TimersContextValue | null>(null);

export default TimersContext;
