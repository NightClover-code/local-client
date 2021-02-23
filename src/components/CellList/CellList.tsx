//importing hooks
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../CellListItem/CellListItem';
//cell list component
const CellList: React.FC = () => {
  //getting cells
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  //returning cells
  const returnedCells = cells.map(cell => (
    <CellListItem cell={cell} key={cell.id} />
  ));
  return <div>{returnedCells}</div>;
};

export default CellList;
