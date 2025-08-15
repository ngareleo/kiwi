import {
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import React from 'react';

export const Slider = ({
  value,
  onValueChange,
  ...props
}: {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <ChakraSlider
      value={value?.[0]}
      onChange={(val) => onValueChange?.([val])}
      {...props}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
};
