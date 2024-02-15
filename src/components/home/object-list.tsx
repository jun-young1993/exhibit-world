import ExhibitCanvas from "components/ExhibitCanvas";
import ResizeHandle from "components/lib/resize-handle";
import { Radio, Table } from "flowbite-react";
import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import {useRecoilState, useRecoilValue} from "recoil";
import {groupsAllAtom, usePatchGroupHook} from "store/recoil/groups.recoil";
import {selectGroupAtom} from "../../store/recoil/select-group.recoil";
import ObjectListSideMenu from "./object-list/object-list-side-menu";
import { TbEditCircle, TbEdit } from "react-icons/tb";
import {isNull, isString} from "lodash";


/**
 * url - https://www.npmjs.com/package/react-resizable-panels
 * @returns 
 */
export default function ObjectList(){
	const groups = useRecoilValue(groupsAllAtom);

	const [ panelDirection ] = useState<'vertical' | 'horizontal'>("vertical");
	const [ selectedGroupId, setSelectedGroupId ] = useRecoilState<string | null>(selectGroupAtom);
	const [ edit, setEdit ] = useState<string | null>(null);
	const patchGroup = usePatchGroupHook();
	const [ name, setName ] = useState<string>("");

	useEffect(() => {

	},[selectedGroupId])



	const headers = [
		'name',
		'edit',
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
						<div className="overflow-x-auto">
							<Table hoverable>
								<Table.Head>
									<Table.HeadCell key={"select-header"} className={"p-4"}>

									</Table.HeadCell>
								{headers.map((header,index) => {
									return <Table.HeadCell
									key={`${header}-${index}`}
									>
										{header}
									</Table.HeadCell>
								})}
								</Table.Head>
								<Table.Body className="divide-y">
									{groups.map((group) => {
										return (
											<Table.Row 
												key={group.id}
												className="bg-white dark:border-gray-700 dark:bg-gray-800"
											>
												<Table.Cell>
												<Radio 
													className="p-3"
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
												</Table.Cell>
												<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
													<div className="relative">
														<input
															className={`block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
															${group.id !== edit ? "" : "border-blue-500"} `}
															onFocus={event => setName(event.target.value)}
															onChange={event => setName(event.target.value)}
															defaultValue={group.name}
															value={group.id !== edit ? group.name : name}
															readOnly={group.id !== edit}
															disabled={group.id !== edit}

														/>
													</div>
												</Table.Cell>
												<Table.Cell>
													<button type="button"
															className={
																group.id === edit
																? "px-2 py-2 text-sm font-medium text-center inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
																	: "px-2 py-2 text-sm font-medium text-center inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
															}

															onClick={() => {
																if(group.id === edit){
																	setEdit(null);
																	patchGroup(group.id,{
																		name: name
																	});
																}else{
																	setName(group.name);
																	setEdit(group.id);
																}

															}}
													>
														{group.id === edit
														? <TbEditCircle />
														: <TbEdit />}
													</button>
												</Table.Cell>
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