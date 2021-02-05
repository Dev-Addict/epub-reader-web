import React, { FC, useRef } from 'react';
import { ReactReader } from 'react-reader';
import styled from '@emotion/styled';

const Container = styled('div')`
  position: relative;
  height: 100vh;

  & > * ::selection {
    background: #348AA788;
  }
`;

interface Props {
  url: string;
}

export const ReaderScreen: FC<Props> = () => {
  const readerRef = useRef<ReactReader>(null);

  return (
    <Container>
      <ReactReader url="/file2.epub" title="The Little Prince" handleTextSelected={(range, contents) => { }} ref={readerRef} />
    </Container>
  );
};
