//importing hooks & bundler
import { useState } from 'react';
import bundle from '../bundler';
//importing components
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview';
//code cell component
const CodeCell: React.FC = () => {
  //local state
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  //onClick Handler
  const onClickHandler = async () => {
    //getting output code
    const output = await bundle(input);
    //updating code state
    setCode(output);
  };
  return (
    <div>
      <CodeEditor
        initialValue={
          " //you can delete this line \n console.log('editor initialized!')"
        }
        onChange={(value: string) => setInput(value)}
      />
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
