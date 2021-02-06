import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ReactReader } from 'react-reader';
import styled from '@emotion/styled';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Color, FontFamily } from '../constants';
import { Check, Settings } from '../assets';

interface ContainerProps {
  color: Color;
  background: Color;
  fontFamily: string;
}

const Container = styled('div') <ContainerProps>`
  position: relative;
  height: 100vh;
  overflow: hidden;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};

  & * {
    background-color: ${({ background }) => background} !important;
    color: ${({ color }) => color} !important;
    border-color: ${({ color }) => color} !important;
    font-family: ${({ fontFamily }) => fontFamily} !important;
  }

  & button > span {
    background-color: ${({ color }) => color} !important;
  }

  & > div > div > div {
    background-color: transparent !important;
  }

  & svg {
    background-color: transparent !important;
  }
`;

interface SideContainerProps {
  active: boolean;
  color: Color;
  background: Color;
}

const SideContainer = styled('div') <SideContainerProps>`
  width: 300px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: ${({ active }) => active ? 0 : -300}px;
  z-index: 100;
  border-left: 2px solid ${({ color }) => color};
  padding: 20px;
  transition: all 366ms;
  background-color: ${({ background }) => background};

  @media only screen and (max-width: 500px) {
    width: 100vw;
    right: ${({ active }) => active ? 0 : '-100vw'};
  }
`;

interface SettingsContainerProps {
  active: boolean;
  color: Color;
  background: Color;
}

const SettingsContainer = styled('div') <SettingsContainerProps>`
  position: absolute;
  top: 20px;
  right: ${({ active }) => active ? 298 : -2}px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: ${Color.LIGHT};
  z-index: 101;
  border: 2px solid ${({ color }) => color};
  border-right: none;
  transition: all 366ms;
  background-color: ${({ background }) => background};

  & svg {
    transition: all 366ms;
  }

  @media only screen and (max-width: 500px) {
    right: 0;
  }

  &:hover svg {
    opacity: 0.7;
  }
`;

interface SettingsHeaderProps {
  color: Color;
}

const SettingHeader = styled('div') <SettingsHeaderProps>`
  color: ${({ color }) => color};
  font-weight: bold;
  font-size: 18px;
`;

const ColorSelectorContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

interface ColorSelectorItemProps {
  color: Color;
  selectedColor: Color;
}

const ColorSelectorItem = styled('div') <ColorSelectorItemProps>`
  width: 20px;
  height: 20px;
  border-radius: 8px;
  border-color: ${Color.LIGHT};
  background-color: ${({ color }) => color};
  border: 2px solid ${({ selectedColor }) => selectedColor};
  transition: all 366ms;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  & svg {
    width: 12px;
    height: 12px;
  }
`;

interface SliderContainerProps {
  color: Color;
  background: Color;
}

const SliderContainer = styled('div') <SliderContainerProps>`
  margin: 10px 0;

  & .rc-slider-handle {
    border-color: ${({ color }) => color} !important;
    background-color: ${({ background }) => background};
  }

  & .rc-slider-track {
    background-color: ${({ color }) => color};
  }

  & .rc-slider-step {
    background-color: ${({ color }) => color}88;
  }

  & .rc-slider-dot {
    background-color: ${({ background }) => background};
    border-color: ${({ color }) => color}AA;
  }

  & .rc-slider-dot-active {
    border-color: ${({ color }) => color};
  }
`;

interface SelectContainerProps {
  color: Color;
  background: Color;
}

const SelectContainer = styled('div') <SelectContainerProps>`
  margin: 10px 0;
  color: ${({ color }) => color} !important;
  background-color: ${({ background }) => background};

  & .select__control, & .select__control--is-focused, & .select__control--menu-is-open {
    border-color: ${({ color }) => color} !important;
    box-shadow: 0 0 0 1px ${({ color }) => color} !important;
    background-color: ${({ background }) => background};
  }

  .select__indicator-separator {
    background-color: ${({ color }) => color};
  }

  & .select__single-value {
    color: ${({ color }) => color}BB !important;
  }

  & .select__menu {
    border-color: ${({ color }) => color} !important;
    background-color: ${({ background }) => background};
  }

  & svg {
    color: ${({ color }) => color}BB !important;
  }
`;

interface HighlightsContainerProps {
  active: boolean;
  color: Color;
  background: Color;
}

const HighlightsContainer = styled('div') <HighlightsContainerProps>`
  position: absolute;
  bottom: 20px;
  right: ${({ active }) => active ? 300 : 0}px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 101;
  border: 2px solid ${({ color }) => color};
  border-right: none;
  transition: all 366ms;
  background-color: ${({ background }) => background};
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  & svg {
    transition: all 366ms;
  }

  @media only screen and (max-width: 500px) {
    right: 0;
  }

  &:hover svg {
    opacity: 0.7;
  }
`;

interface Props {
  url: string;
}

export const ReaderScreen: FC<Props> = () => {

  const [rendition, setRendition] = useState<any>(null);
  const [selectedText, setSelectedText] = useState<any>(null);
  const [fontFamily, setFontFamily] = useState(FontFamily.MALI);
  const [color, setColor] = useState(Color.DARK);
  const [background, setBackground] = useState(Color.LIGHT);
  const [size, setSize] = useState(4);
  const [isSideOpen, setSideOpen] = useState(false);

  const onSettingsClick = () => () => setSideOpen(open => !open);
  const onColorClick = (setter: Dispatch<SetStateAction<Color>>) => (color: Color) => setter(color);
  const onSliderChange = () => (value: number) => setSize(value);
  const onFontChange = () => ({ value }: any) => (setFontFamily as any)(value as any);

  useEffect(() => {
    rendition?.themes?.default({
      '::selection': {
        'background': 'rgba(255,255,0, 0.3)'
      },
      '.epubjs-hl': {
        'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
      }
    });
  }, []);
  useEffect(() => {
    rendition?.themes?.fontSize(`${100 + (size - 4) * 10}%`);
  }, [size]);
  useEffect(() => {
    rendition?.themes?.override('background-color', background, true);
  }, [background]);
  useEffect(() => {
    rendition?.themes?.override('color', color, true);
  }, [color]);
  useEffect(() => {
    rendition?.themes?.override('font-family', fontFamily, true);
  }, [fontFamily]);

  const renderColorSelector = (selectedColor: Color, onColorClick: (color: Color) => void, selected?: Color) => () => Object.values(Color).map(color => (
    <ColorSelectorItem color={color} selectedColor={selectedColor || color} onClick={() => onColorClick(color)}>
      {
        color === selected &&
        <Check />
      }
    </ColorSelectorItem>
  ));

  const fonts = Object.keys(FontFamily)
    .map(fontFamily => fontFamily.split('_')
      .map(fontFamily => fontFamily[0]?.toUpperCase() + fontFamily.substring(1)?.toLocaleLowerCase()).join(' '))
    .map((fontFamily, i) => ({
      label: fontFamily,
      value: (FontFamily as any)[Object.keys(FontFamily)[i]]
    })) as { label: string, value: string }[];

  const onHighlightClick = () => (color: Color) => {
    if (selectedText) {
      rendition?.annotations?.highlight(selectedText?.range, {}, () => { }, 'epubjs-hl', {
        fill: color
      });
      selectedText?.contents && selectedText?.contents?.window?.getSelection()?.removeAllRanges();
    }
  };
  const onRemoveHighlightClick = () => () => {
    if (selectedText) {
      rendition?.annotations?.remove(selectedText?.range, 'epubjs-h1');
      selectedText?.contents && selectedText?.contents?.window?.getSelection()?.removeAllRanges();
    }
  };

  return (
    <>
      <Container color={color} background={background} fontFamily={fontFamily}>
        <ReactReader url="/file2.epub" title="The Little Prince" getRendition={r => setRendition(r)}
          handleTextSelected={(range, contents) => setSelectedText({ range, contents })} />
      </Container>
      <SideContainer active={isSideOpen} background={background} color={color}>
        <SettingHeader color={color}>Text Color</SettingHeader>
        <ColorSelectorContainer>
          {renderColorSelector(color, onColorClick(setColor), color)()}
        </ColorSelectorContainer>
        <SettingHeader color={color}>Background Color</SettingHeader>
        <ColorSelectorContainer>
          {renderColorSelector(color, onColorClick(setBackground), background)()}
        </ColorSelectorContainer>
        <SettingHeader color={color}>Font Size</SettingHeader>
        <SliderContainer color={color} background={background}>
          <Slider min={1} max={7} step={1} marks={'        '} value={size} onChange={onSliderChange()} />
        </SliderContainer>
        <SettingHeader color={color}>Font Family</SettingHeader>
        <SelectContainer color={color} background={background}>
          <Select options={fonts} defaultValue={fonts[0]} iClearable={false} onChange={onFontChange()} classNamePrefix="select" />
        </SelectContainer>
      </SideContainer>
      <SettingsContainer active={isSideOpen} onClick={onSettingsClick()} background={background} color={color}>
        <Settings color={color} />
      </SettingsContainer>
      <HighlightsContainer active={isSideOpen} color={color} background={background}>
        {/* <ColorSelectorItem color={color} selectedColor={color} onClick={onRemoveHighlightClick()}> */}
        {/* </ColorSelectorItem> */}
        {renderColorSelector(color, onHighlightClick())()}
      </HighlightsContainer>
    </>
  );
};
