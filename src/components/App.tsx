//importing styles
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//importing components
import TextEditor from './TextEditor/TextEditor';
//app component
const App: React.FC = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};
export default App;
