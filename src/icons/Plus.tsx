import { Plus as FeatherIcon } from 'react-feather';
import { IconProps, sizeMap } from './IconProps';

export const Plus = ({
  color = 'currentcolor',
  stroke = 'currentcolor',
  size = 'md',
}: IconProps) => {
  return <FeatherIcon color={color} stroke={stroke} size={sizeMap[size]} />;
};
