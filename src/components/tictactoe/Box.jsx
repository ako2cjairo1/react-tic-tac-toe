import { STATUS } from './constants';

const Box = (props) => {
	const { dim, box, onMoveTo, gameStatus } = props;
	const { player, position } = box;

	const styled = {
		width: `${dim}px`,
		height: `${dim}px`,
	};

	const boxStyle = gameStatus !== STATUS.New ? 'box active' : 'box';

	return (
		<div className={boxStyle} style={styled} onClick={() => onMoveTo(position)}>
			{player}
		</div>
	);
};

export default Box;
