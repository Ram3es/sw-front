import React, { HTMLProps } from 'react';

interface CustomDivProps extends HTMLProps<HTMLDivElement> {
  name: string;
}

const CustomDiv: React.FC<CustomDivProps> = ({ name, ...rest }) => {
  // Use type assertion to tell TypeScript to ignore the error
  const divProps: any = rest;
  divProps.name = name;

  return <div {...divProps} />;
};

export default CustomDiv;