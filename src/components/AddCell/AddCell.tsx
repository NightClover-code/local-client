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
    <div className="add-cell">
      <div className="add-buttons">
        <button
          onClick={() => insertCellBefore(nextCellId, 'code')}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          onClick={() => insertCellBefore(nextCellId, 'text')}
          className="button is-rounded is-primary is-small"
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
