import ExhibitCanvas from "components/ExhibitCanvas";
import ResizeHandle from "components/lib/resize-handle";
import { Radio, Table } from "flowbite-react";
import {useEffect, useState} from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import {useRecoilState, useRecoilValue} from "recoil";
import { groupsAllAtom } from "store/recoil/groups.recoil";
import {selectGroupAtom} from "../../store/recoil/select-group.recoil";
import ObjectListSideMenu from "./object-list/object-list-side-menu";



/**
 * url - https://www.npmjs.com/package/react-resizable-panels
 * @returns 
 */
export default function ObjectList(){
	const groups = useRecoilValue(groupsAllAtom);

	const [ panelDirection ] = useState<'vertical' | 'horizontal'>("vertical");
	const [ selectedGroupId, setSelectedGroupId ] = useRecoilState<string | null>(selectGroupAtom);
	useEffect(() => {

	},[selectedGroupId])
	const headers = [
		// 'positionX',
		// 'positionY',
		// 'positionZ',
		// 'quaternionX',
		// 'quaternionY',
		// 'quaternionZ',
		// 'quaternionW',
		// 'rotationX',
		// 'rotationY',
		// 'rotationZ',
		// 'scaleX',
		// 'scaleY',
		// 'scaleZ',
		'name',
		// <span key={'edit'} className="sr-only">Edit</span>
	];
	return (
		<div className={"w-full min-w-0 h-full flex"}>
			<div className={"flex-none h-full"}>
			{/* <div className={"flex-1 w-full h-full"}> */}
				<ObjectListSideMenu />
			</div>
			{/* <div className={"flex-none h-full"}> */}
			<div className={"flex-1 w-full h-full"}>
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
													checked={selectedGroupId === group.id}
													onChange={() => {
														if(selectedGroupId === group.id){
															setSelectedGroupId(null);
														}else{
															setSelectedGroupId(group.id);
														}
													}}
												/>
												{/* <Table.Cell>{group.positionX}</Table.Cell>
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
												<Table.Cell>{group.scaleZ}</Table.Cell> */}
												<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
													<div className="relative">
														<input  className="block w-full p-1 ps-5 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={group.name} />
														<button className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
													</div>
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
			</div>
		</div>
	)
}