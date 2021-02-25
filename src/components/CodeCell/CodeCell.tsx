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
  const cumulativeCode = useTypedSelector(({ cells: { order, data } }) => {
    const orderedCells = order.map(id => data[id]);
    const cumulativeCode = [];
    //joining code from all cells
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });
  //deboucing user raw code
  useEffect(() => {
    if (!bundle) {
      //initial bundling & loading
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);
  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizental">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-cover-container">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
