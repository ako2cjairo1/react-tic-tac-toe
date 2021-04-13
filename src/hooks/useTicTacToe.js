import { useState, useEffect, useRef } from 'react';
import { DIMENSIONS, PLAYER, STATUS } from '../components/tictactoe/constants';

const winningCombinations = [
	// Horizontal
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// Vertical
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// Diagonal
	[0, 4, 8],
	[2, 4, 6],
];

const useTicTacToe = (firstPlayer = PLAYER.Human) => {
	const blankBoxes = new Array(DIMENSIONS.BOARD ** 2).fill(null);
	const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
	const [gameStatus, setGameStatus] = useState(STATUS.New);
	const [boxes, setBoxes] = useState(blankBoxes);

	let checkBoard = useRef();
	let computerMove = useRef();

	useEffect(() => {
		let timeout;

		if (gameStatus === STATUS.InProgress) {
			// check the statistics
			checkBoard.current();

			if (currentPlayer && currentPlayer.name === PLAYER.Computer.name) {
				timeout = setTimeout(() => {
					computerMove.current();
				}, 2000);
			}
		}

		return () => timeout && clearTimeout(timeout);
	}, [currentPlayer, gameStatus]);

	const isNoMoves = !boxes.includes(null);

	const checkWinner = () => {
		let winner = null;
		winningCombinations.forEach((winCombination) => {
			if (
				boxes[winCombination[0]] !== null &&
				boxes[winCombination[0]] === boxes[winCombination[1]] &&
				boxes[winCombination[0]] === boxes[winCombination[2]]
			) {
				winner = boxes[winCombination[0]];
			}
		});

		return winner;
	};

	checkBoard.current = () => {
		const winner = checkWinner();
		if (winner) {
			setGameStatus(STATUS.Winner);
			togglePlayer();
		} else if (isNoMoves && !winner) {
			// if the board is full, decide wheather a draw or
			setGameStatus(STATUS.Draw);
		}
	};

	computerMove.current = () => {
		let randPosition = 4; // start at the center of the board :)

		if (currentPlayer && currentPlayer.name === PLAYER.Computer.name) {
			// parse thru blank boxes
			while (boxes[randPosition] !== null) {
				randPosition = Math.floor(Math.random() * 9);
			}
			// finally place the computers move in board
			moveToPosition(randPosition);
		}
	};

	const humanMove = (pos) => {
		if (currentPlayer && currentPlayer.name === PLAYER.Human.name) {
			moveToPosition(pos);
		}
	};

	const moveToPosition = (pos) => {
		if (gameStatus === STATUS.InProgress && boxes[pos] === null) {
			setBoxes((currentBox) => {
				if (currentBox[pos] === null) {
					let updatedBox = currentBox;
					updatedBox[pos] = currentPlayer.side;
					return updatedBox;
				}
				return currentBox;
			});

			togglePlayer();
		}
	};

	const togglePlayer = () =>
		setCurrentPlayer((prevPlayer) =>
			prevPlayer.name === PLAYER.Human.name ? PLAYER.Computer : PLAYER.Human
		);

	const handleNewGame = () => {
		setBoxes(blankBoxes);
		setGameStatus(STATUS.InProgress);
		setCurrentPlayer(PLAYER.Human);
	};

	const handlers = {
		onNewGame: handleNewGame,
		onMoveTo: humanMove,
	};

	return [boxes, currentPlayer, gameStatus, handlers];
};

export { useTicTacToe };
