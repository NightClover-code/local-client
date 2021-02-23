//importing hooks & bundler
import { useState, useEffect } from 'react';
import bundle from '../../bundler';
//importing types & actions
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';
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
  //redux state & actions
  const { updateCell } = useActions();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  //deboucing user raw code
  useEffect(() => {
    const timer = setTimeout(async () => {
      //getting output code
      const output = await bundle(cell.content);
      //updating code state
      setCode(output.code);
      //updating error (in bundling)
      setErr(output.err);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);
  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizental">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value: string) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
