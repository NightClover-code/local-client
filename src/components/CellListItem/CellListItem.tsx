//importing types & components
import { Cell } from '../../state';
import CodeCell from '../CodeCell/CodeCell';
import TextEditor from '../TextEditor/TextEditor';
//props interface
interface CellListItemProps {
  cell: Cell;
}
//item component
const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  //returning a cell or a text editor
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }
  return <div>{child}</div>;
};

export default CellListItem;
