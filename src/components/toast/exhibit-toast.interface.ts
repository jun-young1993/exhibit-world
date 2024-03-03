import {IconType} from "./exhibit-toast";

export interface ExhibitToastProperty {
	content: string
	icon ?: IconType
}
export interface ExhibitToastProps extends ExhibitToastProperty{
	id: number,
}
export interface ExhibitToastGroupProps {
	max: number
	time: number | null
}