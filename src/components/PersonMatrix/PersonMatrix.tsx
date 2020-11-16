import * as React from 'react';

import { fill, matrix } from './helpers';

import { getCells } from '../../heplers/pythagorasMatrix';

export const PersonMatrix = (props: { birthday: string }) => {
  const { birthday } = props;
  const cells = getCells(birthday);
  const { squareNumbers } = cells;
  let offsetX: number;
  let offsetY: number;

  const move = (e: React.MouseEvent<HTMLElement, React.MouseEvent>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
    el.style.background = 'red';
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
    <div className="itemContainer" onMouseDown={add} onMouseUp={remove}>
      <div className="personListContainer">
        {matrix.map((row, j) => {
          return (
            <div key={j}>
              {row.map((key) => {
                return (
                  <div key={key} className="personItem">
                    {squareNumbers[key] ? fill(key, squareNumbers[key]) : '-'}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
