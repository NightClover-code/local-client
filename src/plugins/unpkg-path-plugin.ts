import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = (code: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //resolving when the path is index.js
      build.onResolve({ filter: /(^index)\.js$/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });
      //resolving for nested relative files (ex: './' or '../')
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: code,
          };
        }
        //checking to see if we already fetched this file and if its cached
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it exits  return it immediatly
        if (cachedResult) {
          return cachedResult;
        }
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
