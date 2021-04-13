import Box from './Box';
import { STATUS } from './constants';

const Board = (props) => {
	const { DIMENSIONS, boxes, onMoveTo, gameStatus } = props;
	const { BOX, BOARD } = DIMENSIONS;

	const styled = {
		width: `${BOX * BOARD + 15}px`,
	};

	const boardStyle = gameStatus !== STATUS.New ? 'board visible' : 'board';

	return (
		<div className={boardStyle} style={styled}>
			{boxes.map((box, position) => {
				const renderProps = { dim: BOX, box: { player: box, position }, onMoveTo, gameStatus };
				return <Box key={position} {...renderProps} />;
			})}
		</div>
	);
};

export default Board;
