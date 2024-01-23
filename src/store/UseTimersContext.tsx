import { useContext } from 'react';
import TimersContext from './TimersContext.tsx';

export const useTimersContext = () => {
	const timerCTX = useContext(TimersContext);
	if (timerCTX === null) {
		throw new Error('TimersContext is null');
	}
	return timerCTX;
};
