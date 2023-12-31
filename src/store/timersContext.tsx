import { type ReactNode, createContext, useContext, useReducer } from 'react';
import AddTimer from '../components/AddTimer';

export type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRunning: boolean;
	timers: Array<Timer>;
};

type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};

type TimersContextProviderProps = {
	children: ReactNode;
};

type StartTimersAction = {
	type: 'START_TIMERS';
};
type StopTimersAction = {
	type: 'STOP_TIMERS';
};
type AddTimersAction = {
	type: 'ADD_TIMERS';
	payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimersAction;

const initialState: TimersState = {
	isRunning: false,
	timers: [],
};

const timersReducer = (state: TimersState, action: Action): TimersState => {
	if (action.type === 'START_TIMERS') {
		return {
			...state,
			isRunning: true,
		};
	}
	if (action.type === 'STOP_TIMERS') {
		return {
			...state,
			isRunning: false,
		};
	}
	if (action.type === 'ADD_TIMERS') {
		return {
			...state,
			timers: [
				...state.timers,
				{
					name: action.payload.name,
					duration: action.payload.duration,
				},
			],
		};
	}
	return state;
};

const TimersContext = createContext<TimersContextValue | null>(null);

const TimersContextProvider = ({ children }: TimersContextProviderProps) => {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const ctx: TimersContextValue = {
		timers: timersState.timers,
		isRunning: timersState.isRunning,
		addTimer: (timerData) => {
			dispatch({ type: 'ADD_TIMERS', payload: timerData });
		},
		startTimers: () => {
			dispatch({ type: 'START_TIMERS' });
		},
		stopTimers: () => {
			dispatch({ type: 'STOP_TIMERS' });
		},
	};

	return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
};

export const useTimersContext = () => {
	const timersCtx = useContext(TimersContext);
	if (timersCtx === null) {
		throw new Error(`TimersContext is null - that should not be the case`);
	}
	return timersCtx;
};

export default TimersContextProvider;
