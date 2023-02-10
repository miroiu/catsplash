import { IconProps, sizeMap } from './IconProps';

export const Masonry = ({
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
        <path d="M22 9.999V20a1 1 0 0 1-1 1h-8V9.999h9zm-11 6V21H3a1 1 0 0 1-1-1v-4.001h9zM11 3v10.999H2V4a1 1 0 0 1 1-1h8zm10 0a1 1 0 0 1 1 1v3.999h-9V3h8z"></path>
      </g>
    </svg>
  );
};
