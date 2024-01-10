import ExhibitCanvas from "components/ExhibitCanvas";
import { Radio, Table, TableRowProps } from "flowbite-react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { groupsAllAtom } from "store/recoil/groups.recoil";

export default function ObjectList(){
	const groups = useRecoilValue(groupsAllAtom);
	const [selected, setSelected] = useState<string | null>(null);
	const headers = [
	
		'positionX',
		'positionY',
		'positionZ',
		'quaternionX',
		'quaternionY',
		'quaternionZ',
		'quaternionW',
		'rotationX',
		'rotationY',
		'rotationZ',
		'scaleX',
		'scaleY',
		'scaleZ',
		'id',
		// <span key={'edit'} className="sr-only">Edit</span>
	];
	return (
		<div className="h-full">
			<input id="small-range" type="range" value="50" className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"></input>
			<div className="flex flex-col-reverse h-full">
				<div className="h-[50%]">
					<ExhibitCanvas />
				</div>
				<div className="overflow-x-auto h-auto">
					<Table hoverable>
						<Table.Head>
							<Table.HeadCell className="m-4">
								
							</Table.HeadCell>
						{headers.map((header,index) => {
							return <Table.HeadCell
							key={`${header}-${index}`}
							>{header}</Table.HeadCell>
						})}
						</Table.Head>
						<Table.Body className="divide-y">
							{groups.map((group) => {
								return (
									<Table.Row 
										key={group.id}
										className="bg-white dark:border-gray-700 dark:bg-gray-800"
									>
										<Radio 
											className="m-4" 
											name="select-group" 
											value={group.id}
											checked={selected === group.id}
											onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
												if(selected === group.id){
													setSelected(null);
												}else{
													setSelected(group.id);
												}
											}}
										/>
										<Table.Cell>{group.positionX}</Table.Cell>
										<Table.Cell>{group.positionY}</Table.Cell>
										<Table.Cell>{group.positionZ}</Table.Cell>
										<Table.Cell>{group.quaternionX}</Table.Cell>
										<Table.Cell>{group.quaternionY}</Table.Cell>
										<Table.Cell>{group.quaternionZ}</Table.Cell>
										<Table.Cell>{group.quaternionW}</Table.Cell>
										<Table.Cell>{group.rotationX}</Table.Cell>
										<Table.Cell>{group.rotationY}</Table.Cell>
										<Table.Cell>{group.rotationZ}</Table.Cell>
										<Table.Cell>{group.scaleX}</Table.Cell>
										<Table.Cell>{group.scaleY}</Table.Cell>
										<Table.Cell>{group.scaleZ}</Table.Cell>
										<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
											{group.id}
										</Table.Cell>
										{/* <Table.Cell>
										<a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
											Edit
										</a>
										</Table.Cell> */}
									</Table.Row>
								)
							})}
						</Table.Body>
					</Table>
				</div>
			</div>
		</div>
	)
}