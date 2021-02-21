//importing hooks & bundler
import { useState } from 'react';
import bundle from '../bundler';
//importing components
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview';
//app component
const App: React.FC = () => {
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
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default App;
