import './styles.css';
import Board from './Board';
import { DIMENSIONS, PLAYER, STATUS } from './constants';
import { useTicTacToe } from '../../hooks/useTicTacToe';

function TicTacToeContainer() {
	const [boxes, currentPlayer, gameStatus, handlers] = useTicTacToe();
	const { onNewGame, onMoveTo } = handlers;

	const renderProps = {
		DIMENSIONS,
		boxes,
		onMoveTo,
		gameStatus,
	};

	return (
		<div className='ttt-container'>
			{gameStatus !== STATUS.InProgress && <button onClick={onNewGame}>New Game</button>}
			{gameStatus === STATUS.Winner ? (
				<h5>
					{currentPlayer.name} ({currentPlayer.side}) Wins!
				</h5>
			) : gameStatus === STATUS.Draw ? (
				<h6>It's a draw!</h6>
			) : (
				gameStatus === STATUS.InProgress &&
				(currentPlayer.name === PLAYER.Computer.name ? (
					<h4>It's my turn!</h4>
				) : (
					<h4>Your turn...</h4>
				))
			)}

			<Board {...renderProps} />
		</div>
	);
}

export default TicTacToeContainer;
