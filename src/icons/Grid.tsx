import { IconProps, sizeMap } from './IconProps';

export const Grid = ({
  color = 'currentcolor',
  size = 'md',
  stroke = 'currentcolor',
}: IconProps) => {
  const w = sizeMap[size];
  return (
    <svg
      fill={color}
      stroke={stroke}
      strokeWidth="0"
      width={w}
      height={w}
      viewBox="0 0 26 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M22 12.999V20a1 1 0 0 1-1 1h-8v-8.001h9zm-11 0V21H3a1 1 0 0 1-1-1v-7.001h9zM11 3v7.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v6.999h-9V3h8z"></path>
      </g>
    </svg>
  );
};
