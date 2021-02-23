//importing hooks
import { useActions } from '../../hooks/useActions';
//props interface
interface ActionBarProps {
  id: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  //redux actions
  const { moveCell, deleteCell } = useActions();
  return (
    <div>
      <button
        className="button isprimary small"
        onClick={() => moveCell(id, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button onClick={() => moveCell(id, 'down')}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};

export default ActionBar;
