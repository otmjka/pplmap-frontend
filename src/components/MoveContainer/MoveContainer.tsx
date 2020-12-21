import React from 'react';

const MoveContainer = ({ children }: { children: React.ReactNode }) => {
  let offsetX: number;
  let offsetY: number;

  const move = (e: React.MouseEvent<HTMLElement, React.MouseEvent>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
    e.preventDefault();
  };

  const add = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    console.log({ offsetX, offsetY });
    // @ts-ignore
    el.addEventListener('mousemove', move);
    e.preventDefault();
  };

  const remove = (e: React.MouseEvent) => {
    // @ts-ignore
    e.currentTarget.removeEventListener('mousemove', move);
    e.preventDefault();
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="itemContainer" onMouseDown={add} onMouseUp={remove}>
      {children}
    </div>
  );
};

export default MoveContainer;
