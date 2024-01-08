import GridTable from "components/lib/grid-table";

export default function ObjectList(){
	return <GridTable 
		headers={[
			'name',
			<span key={'edit'} className="sr-only">Edit</span>
		]}
	/>
}