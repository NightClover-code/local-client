//importing hooks & es build & plugins
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
//app component
const App = () => {
  //refs
  const serviceRef = useRef<any>();
  const iframeRef = useRef<any>();
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
      //showing it to the user
      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        '*'
      );
    }
  };
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
                eval(event.data);
            }, false)
        </script>
    </body>
    </html>
  `;
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
      <iframe
        sandbox="allow-scripts"
        src="./test.html"
        title="test-page"
        srcDoc={html}
        ref={iframeRef}
      />
    </div>
  );
};

export default App;
