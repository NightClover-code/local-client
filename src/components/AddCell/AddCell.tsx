//importing styles
import './add-cell.css';
//importing hooks
import { useActions } from '../../hooks/useActions';
//props interface
interface AddCellProps {
  nextCellId: string | null;
}
//add cell component
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  //redux actions
  const { insertCellBefore } = useActions();
  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, 'code')}>Code</button>
      <button onClick={() => insertCellBefore(nextCellId, 'text')}>Text</button>
    </div>
  );
};

export default AddCell;
