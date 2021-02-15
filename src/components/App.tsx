//importing hooks & es build & plugins
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
//app component
const App = () => {
  //refs
  const serviceRef = useRef<any>();
  //local state
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  //initializing esbuild
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
      //transpiling the code to es2015
      const result = await serviceRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin()],
      });
      //showing it to the user
      setCode(result.outputFiles[0].text);
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
