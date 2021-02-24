//importing hooks
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
//importing types
import { Cell } from '../../state';
//importing components
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
//importing styles
import './code-cell.css';
//props interface
interface CodeCellProps {
  cell: Cell;
}
//code cell component
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  //redux actions & state
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  //deboucing user raw code
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]);
  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizental">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} bundlingStatus={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
