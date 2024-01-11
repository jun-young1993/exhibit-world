import ExhibitCanvas from "components/ExhibitCanvas";
import ResizeHandle from "components/lib/resize-handle";
import { Radio, Table, TableRowProps } from "flowbite-react";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useRecoilValue } from "recoil";
import { groupsAllAtom } from "store/recoil/groups.recoil";
/**
 * url - https://www.npmjs.com/package/react-resizable-panels
 * @returns 
 */
export default function ObjectList(){
	const groups = useRecoilValue(groupsAllAtom);
	const [selected, setSelected] = useState<string | null>(null);
	const [panelDirection, setPanelDirection] = useState<'vertical' | 'horizontal'>("vertical");
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
		
			<PanelGroup autoSaveId="example" direction={panelDirection} className="w-full h-full flex-col-reverse">
				<Panel className="flex-none h-full">
					<div className="w-full h-full">
						<ExhibitCanvas />
					</div>
				</Panel>
				<ResizeHandle />
				<Panel 
					className="flex-none h-full"
					style={{
						overflow: 'scroll'
					}}
				>
					<div className="w-full h-full">
						<Table hoverable>
							<Table.Head>
								<Table.HeadCell className="">
									
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
				</Panel>
			</PanelGroup>
		
		// <div className="h-full">
		// 	<div className="flex flex-col-reverse h-full aspect-video">
		// 		<div className="h-[50%]">
		// 			<ExhibitCanvas />
		// 		</div>
				
		// 		<div className="flex-shrink w-10 h-10">
		// 			R
		// 		</div>
				
		// 		<div className="overflow-x-auto h-auto h-[50%]">

		// 		</div>
		// 	</div>
		// </div>
	)
}