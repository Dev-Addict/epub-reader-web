import React, { ChangeEventHandler, Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { BookLover, OpenBook } from '../assets';
import { Color } from '../constants';

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${Color.LIGHT};

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
  }
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
  background-color: ${Color.GREEN};
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
  background-color: ${Color.BLUE};
  transition: all 336ms;
  color: ${Color.LIGHT};
  font-weight: bold;
  box-shadow: 0 0 6px 0 ${Color.BLUE}88;
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

  @media only screen and (max-width: 1000px) {
    & > svg {
      width: 50vw;
      height: auto;
    }
  }

  @media only screen and (max-width: 600px) {
    & > svg {
      width: 70vw;
      height: auto;
    }
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
