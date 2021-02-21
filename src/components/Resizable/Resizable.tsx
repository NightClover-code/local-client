//importing resizable component
import { ResizableBox } from 'react-resizable';
//importing styles
import './resizable.css';
//props interface
interface ResizableProps {
  direction: 'vertical' | 'horizental';
}
//resizable component
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox width={Infinity} height={300} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
