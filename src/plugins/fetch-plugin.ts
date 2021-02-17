import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const fetchPlugin = (code: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //loading for files ending in 'index.js'
      build.onLoad({ filter: /(^index)\.js$/ }, () => {
        return {
          loader: 'jsx',
          contents: code,
        };
      });
      //loading for css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        //checking to see if we already fetched this file and if its cached
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it exits  return it immediatly
        if (cachedResult) {
          return cachedResult;
        }
        //getting results
        const { data, request } = await axios.get(args.path);
        //modifying css files for css imports
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        //adding style tag to DOM when it's a css file
        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;
        //result
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        //store result in cache
        await fileCache.setItem(args.path, result);
        //returning result
        return result;
      });
      //loading for js files / nested js files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //checking to see if we already fetched this file and if its cached
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it exits  return it immediatly
        if (cachedResult) {
          return cachedResult;
        }
        //getting results
        const { data, request } = await axios.get(args.path);
        //result
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        //store result in cache
        await fileCache.setItem(args.path, result);
        //returning result
        return result;
      });
    },
  };
};
