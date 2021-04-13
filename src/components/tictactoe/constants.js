const DIMENSIONS = {
	BOARD: 3,
	BOX: 100,
};

const PLAYER = {
	Human: { name: 'You', side: 'X' },
	Computer: { name: 'Computer', side: 'O' },
};

const STATUS = {
	New: 'New Game',
	Winner: 'Winner',
	Draw: 'Draw',
	InProgress: 'In Progress',
};

export { DIMENSIONS, PLAYER, STATUS };
