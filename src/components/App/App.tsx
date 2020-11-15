import * as React from 'react';
// import logo from './logo.svg';
import './App.css';

import { getCells } from '../../heplers/pythagorasMatrix';
function fill(ch: number, times: number) {
  let str = '';
  for (let i = 0; i < times; i++) {
    str = `${str}${ch}`;
  }
  return str;
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const PersonMatrix = (props: { value: string }) => {
  const cells = getCells('10.09.1985');
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
    <div className="wideScreenContainer">
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
    </div>
  );
};
const App = () => {
  // const value = JSON.stringify(cells, null, 2);

  return (
    <div>
      <PersonMatrix value="10.09.1985" />
    </div>
  );
};

export default App;
