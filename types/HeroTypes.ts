import { ReactNode } from 'react';

export type ParallaxImgProps = {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
};

export type FeatureItemProps = {
  title: string;
  description: string;
  icon: ReactNode;
};