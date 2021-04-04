import * as React from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// const NumberBox = ({ children }: { children: React.ReactNode }) => (
//   <div className="personItem">{children}</div>
// );

const ContainerNumberBox = styled(Box)({
  display: 'block',
  position: 'relative',
  width: '100%',
  border: 'none',
});

const ContentNumberBox = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
});

const AfterNumberBox = styled(({ odd, ...other }) => <Box {...other} />)({
  display: 'block',
  paddingBottom: '100%',
  backgroundColor: '#fff',
  background: (props: { odd: 0 | 1 }) => ['red', 'orange'][props.odd],
});

const NumberBox = ({
  odd,
  children,
}: {
  odd: 1 | 0;
  children: React.ReactNode;
}) => {
  return (
    <ContainerNumberBox>
      <ContentNumberBox>
        <Typography>{children}</Typography>
      </ContentNumberBox>
      <AfterNumberBox odd={odd} />
    </ContainerNumberBox>
  );
};

export default NumberBox;
