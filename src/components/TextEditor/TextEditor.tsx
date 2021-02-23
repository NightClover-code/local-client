//importing hooks & styles
import { useEffect, useRef, useState } from 'react';
import './text-editor.css';
//react markdown editor
import MDEditor from '@uiw/react-md-editor';
//text editor component
const TextEditor: React.FC = () => {
  //refs
  const divRef = useRef<HTMLDivElement | null>(null);
  //local state
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>('# Header');
  //closing editor when clicking out
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //checking if user clicked on the editor
      if (
        divRef.current &&
        event.target &&
        divRef.current.contains(event.target as Node)
      ) {
        return;
      }
      //close editor otherwise
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    //cleanup
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);
  //conditional rendering of MDEditor
  if (editing) {
    return (
      <div ref={divRef} className="text-editor card">
        <div className="card-content">
          <MDEditor onChange={v => setValue(v || '')} value={value} />
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className="markdown">
      <MDEditor.Markdown source={value} />
    </div>
  );
};
export default TextEditor;
