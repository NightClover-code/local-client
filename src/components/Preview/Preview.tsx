//importing hooks & styles
import { useEffect, useRef } from 'react';
import './preview.css';
//interface props
interface PreviewProps {
  code: string;
}
const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        html{
          background-color: #fff;
        }
      </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
              try{
                eval(event.data);
              }catch(err){
                const root = document.querySelector('#root');
                root.innerHTML = '<div><h4>Runtime Error</h4>' + err + '</div>';
                throw err;
              }
            }, false)
        </script>
    </body>
    </html>
  `;
const Preview: React.FC<PreviewProps> = ({ code }) => {
  //refs
  const iframeRef = useRef<any>();
  //resetting the iframe (security purposes)
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    //showing it to the user
    iframeRef.current.contentWindow.postMessage(code, '*');
  }, [code]);
  return (
    <div className="iframe__wrapper">
      <iframe
        title="preview-page"
        sandbox="allow-scripts"
        src="./test.html"
        srcDoc={html}
        ref={iframeRef}
      />
    </div>
  );
};

export default Preview;
