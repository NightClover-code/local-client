import MDEditor from '@uiw/react-md-editor';

const TextEditor = () => {
  return (
    <div>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};
export default TextEditor;
