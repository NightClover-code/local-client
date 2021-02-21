//importing resizable component
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
//importing styles
import './resizable.css';
//props interface
interface ResizableProps {
  direction: 'vertical' | 'horizental';
}
//resizable component
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableProps = {
      width: Infinity,
      resizeHandles: ['s'],
      height: 300,
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  } else {
    resizableProps = {
      className: 'resize__horizental',
      height: Infinity,
      width: window.innerHeight * 0.8,
      resizeHandles: ['e'],
      maxConstraints: [Infinity, window.innerWidth * 0.8],
      minConstraints: [window.innerWidth * 0.2, Infinity],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
