import React, { useRef, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useDebug } from '../../contexts/DebugContext';
import { DebugBlock, AxisX, AxisY } from '../Debug/MoveContainerDebug';

interface MoveContainerProps {
  name: string;
  children: React.ReactNode;
  offsetX: number;
  offsetY: number;
  onChange: (value: { offset: { x: number; y: number } }) => void;
  onClick: () => void;
}

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
  onClick,
}: MoveContainerProps) => {
  const { debug } = useDebug();
  const refContainer = useRef<HTMLDivElement>(null);
  const [containerPosition, setContainerPostion] = useState({ x: NaN, y: NaN });
  const [offset, setOffset] = useState({ x: offsetX, y: offsetY });
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [isStartMoving, setIsStartMoving] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const isMovingStyles = isStartMoving ? { zIndex: 1000 } : {};

  const divStyles = {
    left: `${offset.x + delta.x}px`,
    top: `${offset.y + delta.y}px`,
  };

  const joinedStyles = { ...divStyles, ...isMovingStyles };
  const debugInfo = {
    on: isStartMoving,
    ...divStyles,
    ...offset,
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ message: 'first useEffect' });
    if (refContainer.current == null) {
      // eslint-disable-next-line no-console
      console.log({ message: 'refContainer is not defined' });
      return;
    }
    const { left: x, top: y } = refContainer.current.getBoundingClientRect();
    setContainerPostion({ x, y });
    // eslint-disable-next-line no-console
    console.log({ name, x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refContainer.current]);

  useEffect(() => {
    if (offset.x === offsetX && offset.y === offsetY) {
      return;
    }
    setOffset({ x: offsetX, y: offsetY });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleOnClick = () => {
    onClick();
  };

  return (
    // eslint-disable-next-line
    <div
      className="itemContainer"
      ref={refContainer}
      style={joinedStyles}
      onMouseDown={add}
      onMouseMove={move}
      onMouseUp={remove}
      onMouseLeave={remove}
      onClick={handleOnClick}
    >
      <Inner isMoving={isStartMoving}>
        {children}
        {debug && (
          <>
            <DebugBlock>
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </DebugBlock>

            <AxisX top={`${startPosition.y - containerPosition.y}px`} />
            <AxisY left={`${startPosition.x - containerPosition.x}px`} />
          </>
        )}
      </Inner>
    </div>
  );
};

export default MoveContainer;
