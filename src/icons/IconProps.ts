export interface IconProps {
  size?: 'sm' | 'md' | 'lg';
  color?: React.CSSProperties['color'];
  stroke?: React.CSSProperties['color'];
}

export const sizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
};
