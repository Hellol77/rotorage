import { SVGProps } from "react";

export interface IconPropsType extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: string;
  onClick?: () => void;
}
