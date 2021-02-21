//importing hooks & es build & plugins
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
//importing components
import CodeEditor from './CodeEditor/CodeEditor';
import Preview from './Preview/Preview';
//app component
const App: React.FC = () => {
  //refs
  const serviceRef = useRef<any>();
  //local state
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  //initializing esbuild
  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
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
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });
      //updating code state with the results
      setCode(result.outputFiles[0].text);
    }
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
