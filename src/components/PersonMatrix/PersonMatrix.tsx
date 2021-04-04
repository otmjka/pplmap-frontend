import * as React from 'react';
import { styled } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { fill, matrix } from './helpers';

import { getCells } from '../../heplers/pythagorasMatrix';
import NumberBox from './NumberBox';

const MatrixContainer = styled(Box)({
  display: 'flex',
  width: 200,
  height: 200,
  backgroundColor: 'blueviolet',
  border: 'none',
});

const RowContainer = styled(Box)({ width: '100%' });

export const PersonMatrix = (props: { birthday: string }) => {
  const { birthday } = props;
  const cells = getCells(birthday);
  const { squareNumbers } = cells;

  return (
    <MatrixContainer>
      {matrix.map((row, j) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <RowContainer key={j}>
            {row.map((key, rowItemIndex) => {
              return (
                <NumberBox key={key} odd={((j + rowItemIndex) % 2) as 0 | 1}>
                  {squareNumbers[key] ? fill(key, squareNumbers[key]) : '-'}
                </NumberBox>
              );
            })}
          </RowContainer>
        );
      })}
    </MatrixContainer>
  );
};
