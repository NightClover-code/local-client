//importing styles
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//importing components
import CellList from './CellList/CellList';
import TextEditor from './TextEditor/TextEditor';
//app component
const App: React.FC = () => {
  return (
    <div>
      <CellList />
      <TextEditor />
    </div>
  );
};
export default App;
