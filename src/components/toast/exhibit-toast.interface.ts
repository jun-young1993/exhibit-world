
export interface ExhibitToastProperty {
	content: string
}
export interface ExhibitToastProps extends ExhibitToastProperty{
	id: number,
}
export interface ExhibitToastGroupProps {
	max: number
	time: number | null
}