import { Button, Radio, Table } from "flowbite-react";
import { useRecoilValue } from "recoil"
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import ObjectListTable from "./object-list-table";
import { groupMappingAllAtom } from "store/recoil/groups-mapping.recoil";

export default function ObjectListMappingTable(){
	const groupMapping = useRecoilValue(groupMappingAllAtom);
	const [mappngTableNode, setMappingTableNode] = useState<boolean>(true);
	const [selectedGroupMappingId, setSelectedGroupMappingId] = useState<string | undefined>(undefined);
	const [ name, setName ] = useState<string>("");
	const [ edit, setEdit ] = useState<string | null>(null);

	const headers = [
		'name'
	];
	return (
		<>
			{mappngTableNode 
			? <div className="overflow-x-auto">
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
						<Table.HeadCell key={"select-object-list"} className={"p-4"}></Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{groupMapping.map((groupMapping) => {
							return (
								<Table.Row 
									key={groupMapping.id}
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell>
										<Radio 
											className="p-3"
											name="select-group" 
											value={groupMapping.id}
										/>
									</Table.Cell>
									<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
										<div className="relative">
											<input
												className={`block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
												${groupMapping.id !== edit ? "" : "border-blue-500"} `}
												onFocus={event => setName(event.target.value)}
												onChange={event => setName(event.target.value)}
												defaultValue={groupMapping.name}
												value={groupMapping.id !== edit ? groupMapping.name : name}
												readOnly={groupMapping.id !== edit}
												disabled={groupMapping.id !== edit}

											/>
										</div>
									</Table.Cell>
									<Table.Cell>
										<Button 
											pill
											// outline
											gradientDuoTone="purpleToBlue"
											onClick={()=>{
												setSelectedGroupMappingId(groupMapping.id);
												setMappingTableNode(false);
											}}
										>
											<FaArrowRightLong />
										</Button>
									</Table.Cell>
								</Table.Row>
							)
						})}
					</Table.Body>
				</Table>
			</div>
			: <ObjectListTable 
				onBackClick={() => setMappingTableNode(true)}
			/>}
		</>
	)
}