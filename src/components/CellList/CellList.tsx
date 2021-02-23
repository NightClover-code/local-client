//importing hooks
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddCell from '../AddCell/AddCell';
import CellListItem from '../CellListItem/CellListItem';
//importing fragment
import { Fragment } from 'react';
//cell list component
const CellList: React.FC = () => {
  //getting cells
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  //returning cells
  const returnedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));
  return <div>{returnedCells}</div>;
};

export default CellList;
