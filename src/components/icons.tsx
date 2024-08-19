export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  capitalCircle: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-circle-dot"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" fill="red" stroke-width="0" />
    </svg>
  ),
}
