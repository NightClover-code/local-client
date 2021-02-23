import { Cell } from '../../state';
//props interface
interface CellListItemProps {
  cell: Cell;
}
//item component
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return <div>{cell.id}</div>;
};

export default CellListItem;
