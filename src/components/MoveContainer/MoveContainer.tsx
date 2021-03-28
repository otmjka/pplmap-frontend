import React, { useRef, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

interface MoveContainerProps {
  name: string;
  children: React.ReactNode;
  offsetX: number;
  offsetY: number;
  onChange: (value: { offset: { x: number; y: number } }) => void;
}

const DebugBlock = styled(Box)({
  position: 'absolute',
  zIndex: 101,
  bottom: '40px',
  left: 0,
  background: 'red',
  fontSize: '8px',
});

const crossColor = 'purple';

const AxisX = styled(({ top, ...other }) => <Box {...other} />)({
  position: 'absolute',
  zIndex: 102,
  top: (props: { top: string }) => props.top,
  left: 0,
  width: '150px',
  height: '1px',
  background: crossColor,
});

const AxisY = styled(({ top, ...other }) => <Box {...other} />)({
  position: 'absolute',
  zIndex: 102,
  top: 0,
  left: (props: { left: string }) => props.left,
  width: '1px',
  height: '150px',
  background: crossColor,
});

const Inner = styled(({ isMoving, ...other }) => <Box {...other} />)({
  position: 'relative',
  pointerEvents: (props: { isMoving: boolean }) =>
    props.isMoving ? 'none' : 'auto',
});

const MoveContainer = ({
  name,
  offsetX,
  offsetY,
  children,
  onChange,
}: MoveContainerProps) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [containerPosition, setContainerPostion] = useState({ x: NaN, y: NaN });
  const [offset, setOffset] = useState({ x: offsetX, y: offsetY });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isStartMoving, setIsStartMoving] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const divStyles = {
    left: `${offset.x + delta.x}px`,
    top: `${offset.y + delta.y}px`,
  };
  const debugInfo = {
    on: isStartMoving,
    ...divStyles,
    ...offset,
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ message: 'first useEffect' });
    if (refContainer == null || refContainer.current == null) {
      // eslint-disable-next-line no-console
      console.log({ message: 'refContainer is not defined' });
      return;
    }
    const { left: x, top: y } = refContainer.current.getBoundingClientRect();
    setContainerPostion({ x, y });
    // eslint-disable-next-line no-console
    console.log({ name, x, y });
  }, [refContainer]);

  useEffect(() => {
    if (offset.x === offsetX && offset.y === offsetY) {
      return;
    }
    setOffset({ x: offsetX, y: offsetY });
  }, [offsetX, offsetY]);

  const move = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isStartMoving) return;
    const x = e.pageX;
    const y = e.pageY;

    const deltaX = x - startPosition.x;
    const deltaY = y - startPosition.y;
    const newValue = {
      x: deltaX,
      y: deltaY,
    };
    setDelta(newValue);
  };

  const add = (e: React.MouseEvent) => {
    if (refContainer == null || refContainer.current == null) {
      // eslint-disable-next-line no-console
      console.log({ message: 'refContainer is not defined' });
      return;
    }
    setIsStartMoving(true);
    setContainerPostion({
      x: refContainer.current.getBoundingClientRect().left,
      y: refContainer.current.getBoundingClientRect().top,
    });
    setStartPosition({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const remove = (e: React.MouseEvent) => {
    if (!isStartMoving) {
      return;
    }
    if (refContainer == null || refContainer.current == null) {
      // eslint-disable-next-line no-console
      console.log({ message: 'refContainer is not defined' });
      return;
    }
    setIsStartMoving(false);
    const newOffset = { x: offset.x + delta.x, y: offset.y + delta.y };
    setOffset(newOffset);
    setDelta({ x: 0, y: 0 });
    onChange({ offset: newOffset });
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
      <Inner isMoving={isStartMoving}>
        {children}
        <DebugBlock>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </DebugBlock>
        <AxisX top={`${startPosition.y - containerPosition.y}px`} />
        <AxisY left={`${startPosition.x - containerPosition.x}px`} />
      </Inner>
    </div>
  );
};

export default MoveContainer;
