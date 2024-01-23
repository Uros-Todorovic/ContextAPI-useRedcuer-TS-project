import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/UseTimersContext.tsx';

export default function Header() {
	const timerCTX = useTimersContext();

	return (
		<header>
			<h1>ReactTimer</h1>

			<Button onClick={timerCTX.isRunning ? timerCTX.stopTimers : timerCTX.startTimers}>
				{timerCTX.isRunning ? 'Stop' : 'Start'} Timers
			</Button>
		</header>
	);
}
