//importing hooks & es build
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
//app component
const App = () => {
  //refs
  const serviceRef = useRef<any>();
  //local state
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  //init esbuild
  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
  };
  useEffect(() => {
    startService();
  }, []);
  //onClick Handler
  const onClickHandler = async () => {
    if (serviceRef.current) {
      //transforming the code to es2015
      const result = await serviceRef.current.transform(input, {
        loader: 'jsx',
        target: 'es2015',
      });
      setCode(result.code);
    }
  };
  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClickHandler}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
