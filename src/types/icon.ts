import {ReactNode, SVGAttributes} from "react";

export interface IconBaseProps extends SVGAttributes<SVGElement> {
    children?: ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
}
export type Icon =  (props: IconBaseProps) => JSX.Element;