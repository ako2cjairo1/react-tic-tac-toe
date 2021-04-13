import './App.css';
import React from 'react';
import TicTacToeContainer from './components/tictactoe/TicTacToeContainer';

export default function App() {
	return (
		<div className='App'>
			<div className='App-header'>
				<h1>Tic-Tac-Toe</h1>
			</div>
			<div className='App-container'>
				<TicTacToeContainer />
			</div>
		</div>
	);
}
