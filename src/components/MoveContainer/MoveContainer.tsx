import React, { useRef, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

interface MoveContainerProps {
  children: React.ReactNode;
  onChange: (debugInfo: {
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
  }) => void;
}

const DebugBlock = styled(Box)({
  position: 'absolute',
  zIndex: 101,
  bottom: '40px',
  left: 0,
  background: 'red',
  fontSize: '8px',
});

const MoveContainer = ({ children, onChange }: MoveContainerProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: -1, y: -1 });
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });
  const [isStartMoving, setIsStartMoving] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: -1, y: -1 });
  const left = mousePosition.mouseX - offset.x;
  const top = mousePosition.mouseY - offset.y;
  const divStyles = { left: `${left}px`, top: `${top}px` };
  const debugInfo = {
    on: isStartMoving,
    ...divStyles,
    ...offset,
    ...mousePosition,
  };

  useEffect(() => {
    // eslint-disable-next-line
    // debugger;
    setOffset({
      x: refContainer?.current?.getBoundingClientRect().left || -1,
      y: refContainer?.current?.getBoundingClientRect().top || -1,
    });
  }, []);

  const move = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isStartMoving) return;
    console.log(e.pageX - startPosition.x, e.pageY - startPosition.y);
    // if (!isStartMoving) return;
    // const mousePos = { mouseX: e.pageX, mouseY: e.pageY };
    // setMousePosition(mousePos);
    // onChange({ ...offset, ...mousePos });
    // e.preventDefault();
  };

  const add = (e: React.MouseEvent) => {
    console.log(`
      ${'add'}
      ${e.clientX}
      ${e.clientY}
      ${refContainer?.current?.getBoundingClientRect().left}
      ${refContainer?.current?.getBoundingClientRect().top}
      ${divStyles.left}
      ${divStyles.top}`);
    // eslint-disable-next-line
    // debugger;
    // if (!refContainer) return;
    // if (!refContainer.current) return;

    // const offsetX =
    //   e.clientX - refContainer.current.getBoundingClientRect().left;
    // const offsetY =
    //   e.clientY - refContainer.current.getBoundingClientRect().top;
    setIsStartMoving(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    // setOffset({ x: offsetX, y: offsetY });
    // e.preventDefault();
  };

  const remove = (e: React.MouseEvent) => {
    console.log('remove');
    setIsStartMoving(false);
    // e.preventDefault();
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="itemContainer"
      ref={refContainer}
      style={divStyles}
      onMouseDown={add}
      onMouseMove={move}
      onMouseUp={remove}
      onMouseLeave={remove}
    >
      {children}
      <DebugBlock>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </DebugBlock>
    </div>
  );
};

export default MoveContainer;
