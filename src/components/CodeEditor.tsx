//importing editor
import MonacoEditor from '@monaco-editor/react';
//props interface
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}
//code editor
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  //editor did mount handler
  const editorMountedHandler = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };
  return (
    <MonacoEditor
      editorDidMount={editorMountedHandler}
      height="500px"
      value={initialValue}
      language="javascript"
      theme="dark"
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
export default CodeEditor;
