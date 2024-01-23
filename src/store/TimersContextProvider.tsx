import { useReducer, type ReactNode } from 'react';
import TimersContext from './TimersContext.tsx';

export type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

const initialState: TimersState = {
	isRunning: true,
	timers: [],
};

export type TimersContextValue = TimersState & {
	addTimer: (timerData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};

type TimersContextProviderProps = {
	children: ReactNode;
};

type StartTimersACtions = {
	type: 'START_TIMERS';
};

type StopTimersACtions = {
	type: 'STOP_TIMERS';
};

type AddTimerACtions = {
	type: 'ADD_TIMER';
	payload: Timer;
};

type Action = StartTimersACtions | StopTimersACtions | AddTimerACtions;

const reducer = (state: TimersState, action: Action): TimersState => {
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

	if (action.type === 'ADD_TIMER') {
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

const TimerContextProvider = ({ children }: TimersContextProviderProps) => {
	const [timersState, dispatch] = useReducer(reducer, initialState);

	const ctx: TimersContextValue = {
		timers: timersState.timers,
		isRunning: timersState.isRunning,
		addTimer(timerData) {
			dispatch({ type: 'ADD_TIMER', payload: timerData });
		},
		startTimers() {
			dispatch({ type: 'START_TIMERS' });
		},
		stopTimers() {
			dispatch({ type: 'STOP_TIMERS' });
		},
	};
	return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
};

export default TimerContextProvider;
