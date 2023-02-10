import { X as FeatherIcon } from 'react-feather';
import { IconProps, sizeMap } from './IconProps';

export const Minus = ({
  color = 'currentcolor',
  stroke = 'currentcolor',
  size = 'md',
}: IconProps) => {
  return <FeatherIcon color={color} stroke={stroke} size={sizeMap[size]} />;
};
