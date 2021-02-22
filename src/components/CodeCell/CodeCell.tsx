//importing hooks & bundler
import { useState, useEffect } from 'react';
import bundle from '../../bundler';
//importing components
import CodeEditor from '../CodeEditor/CodeEditor';
import Preview from '../Preview/Preview';
import Resizable from '../Resizable/Resizable';
//importing styles
import './code-cell.css';
//code cell component
const CodeCell: React.FC = () => {
  //local state
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  //deboucing user raw code
  useEffect(() => {
    const timer = setTimeout(async () => {
      //getting output code
      const output = await bundle(input);
      //updating code state
      setCode(output.code);
      //updating error (in bundling)
      setErr(output.err);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizental">
          <CodeEditor
            initialValue={
              " //you can delete this line \n console.log('editor initialized!')"
            }
            onChange={(value: string) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
