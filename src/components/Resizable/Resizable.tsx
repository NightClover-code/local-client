//importing hooks
import { useEffect, useState } from 'react';
//importing resizable component
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
//importing styles
import './resizable.css';
//interfaces
interface ResizableProps {
  direction: 'vertical' | 'horizental';
}
interface DimensionsState {
  width: number;
  height: number;
}
//resizable component
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  //local state
  const [dimensions, setDimensions] = useState<DimensionsState>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  //getting window height and width when resizing
  useEffect(() => {
    //timer
    let timer: any;
    const listener = () => {
      //debouncing top prevent lag when resizing
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(
        () =>
          //updating height and width
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        100
      );
    };
    window.addEventListener('resize', listener);
    //cleanup
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);
  //resizable conditional props
  let resizableProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableProps = {
      width: Infinity,
      resizeHandles: ['s'],
      height: 300,
      maxConstraints: [Infinity, dimensions.height * 0.9],
      minConstraints: [Infinity, 50],
    };
  } else {
    resizableProps = {
      className: 'resize-horizental',
      height: Infinity,
      width: dimensions.width * 0.75,
      resizeHandles: ['e'],
      minConstraints: [dimensions.width * 0.2, Infinity],
      maxConstraints: [dimensions.width * 0.75, Infinity],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
