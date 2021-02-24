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
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));
  return (
    <div>
      <AddCell
        previousCellId={null}
        forceVisible={cells.length === 0 ? true : false}
      />
      {returnedCells}
    </div>
  );
};

export default CellList;
