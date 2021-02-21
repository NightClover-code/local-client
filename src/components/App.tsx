//importing styles
import 'bulmaswatch/superhero/bulmaswatch.min.css';
//importing components
import CodeCell from './CodeCell';
//app component
const App: React.FC = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

export default App;
