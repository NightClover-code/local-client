//importing hooks
import { useRef } from 'react';
//importing styles
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import './styles/code-editor.css';
//importing editor & types & prettier
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
//props interface
interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}
//code editor
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  //refs
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  //editor did mount handler
  const editorMountedHandler: EditorDidMount = (getValue, monacoEditor) => {
    //saving editor instance to use outside editorMountedHandler
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };
  //formating code on click
  const onFormatHandler = () => {
    //getting value from the editor
    const unformatted = editorRef.current?.getModel()?.getValue()!;
    //formating the value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      semi: true,
      useTabs: false,
      singleQuote: true,
    });
    //set the formated value to the editor
    editorRef.current?.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatHandler}
      >
        Format
      </button>
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
    </div>
  );
};
export default CodeEditor;
