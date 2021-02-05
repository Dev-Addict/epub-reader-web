import React, { ChangeEventHandler, Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BookLover, OpenBook } from '../assets';

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #EFE5EE;
`;

const FileInput = styled('input')`
  display: none;
`;

interface ButtonProps {
  disabled: boolean;
}

const Button = styled('div') <ButtonProps>`
  display: flex;
  flex-direction: row;
  background-color: #5DD39E;
  border-radius: 10px;
  transition: all 336ms;
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

const ButtonText = styled('div')`
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 12px 50px;
  font-size: 17px;
  user-select: none;
  background-color: #348AA7;
  transition: all 336ms;
  color: #F8E5EE;
  font-weight: bold;
  box-shadow: 0 0 6px 0 #348AA788;
`;

const ButtonIcon = styled('div')`
  margin: 10px;
  transition: all 336ms;
`;

const IllustrationContainer = styled('div')`
  & > svg {
    height: 90vh;
    width: auto;
  }
`;

interface Props {
  setUrl: Dispatch<SetStateAction<string>>;
}

export const HomeScreen: FC<Props> = ({ setUrl }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [isLoading, setLoading] = useState(false);

  const onButtonClick = () => () => {
    setUrl('start');
  };

  const onFileChange = (): ChangeEventHandler<{ files: FileList }> => ({ target: { files } }) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setUrl(reader.result as string);

      setLoading(false);
    });

    if (files[0] && files[0].type === 'application/epub+zip') {
      setLoading(true);

      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Container>
      <FileInput ref={fileRef} type="file" accept="application/epub+zip" onChange={(onFileChange() as any)} />
      <Button onClick={isLoading ? undefined : onButtonClick()} disabled={isLoading}>
        <ButtonText>Start Reading</ButtonText>
        <ButtonIcon>
          <OpenBook />
        </ButtonIcon>
      </Button>
      <IllustrationContainer>
        <BookLover />
      </IllustrationContainer>
    </Container>
  );
};
