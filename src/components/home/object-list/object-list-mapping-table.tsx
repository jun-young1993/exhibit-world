import {Button, FloatingLabel, Navbar, Radio, Table} from "flowbite-react";
import {useRecoilState, useRecoilValue} from "recoil"
import { FaArrowRightLong } from "react-icons/fa6";
import {useEffect, useState} from "react";
import ObjectListTable from "./object-list-table";
import {
	groupMappingAllAtom, groupMappingSelectorFamily, selectedGroupMappingAtom, selectedGroupMappingIdAtom,
	useAddGroupMappingHook, useDeleteGroupMappingHook, usePatchGroupMappingHook
} from "store/recoil/groups-mapping.recoil";
import IconButton from "../../icon-button";
import { RiMenuAddFill } from "react-icons/ri";
import {ExhibitModal} from "../../exhibit-modal";
import {useModal} from "../../../store/recoil/modal.recoild";
import { MdCreate, MdDelete, MdOutlineCancel } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import {GroupEntity} from "../../../clients/entities/group.entity";
import {GroupMappingEntity} from "../../../clients/entities/group-mapping.entity";
import DeleteContentModal from "components/modal/delete.content";


function EditContentModal({uuid}: {uuid: GroupMappingEntity['id']}){
	const selectedGroupMapping = useRecoilValue<GroupMappingEntity>(groupMappingSelectorFamily(uuid));

	const [name, setName] = useState<string>(selectedGroupMapping.name);
	const { closeModal } = useModal();
	const patchGroupMapping = usePatchGroupMappingHook()

	return (
		<div className="flex max-w-md flex-col gap-4 mt-3">
			<div>
				<FloatingLabel
					variant="outlined"
					label="name"
					sizing="sm"
					defaultValue={selectedGroupMapping.name}
					onChange={event => setName(event.target.value)}
				/>
			</div>
			<div className={"flex flex-wrap gap-2"}>
				<Button
					size={"sm"}
					onClick={() => {
						patchGroupMapping(selectedGroupMapping.id,{
							name: name
						});
						closeModal();
					}}
				>
					<MdCreate className="mr-2 h-3 w-3" />
					Save
				</Button>
				<Button
					size={"sm"}
					onClick={() => closeModal()}
				>
					<MdOutlineCancel className={"mr-2 h-3 w-3"} />
					Cancel
				</Button>
			</div>
		</div>

	)
}
function AddContentModal(){
	const [name, setName] = useState<string| undefined>(undefined);
	const { closeModal } = useModal();
	const addGroupMapping = useAddGroupMappingHook()

	return (
		<div className="flex max-w-md flex-col gap-4 mt-3">
			<div>
			<FloatingLabel variant="outlined" label="name" sizing="sm" onChange={event => setName(event.target.value)} />
			</div>
			<div className={"flex flex-wrap gap-2"}>
				<Button
					size={"sm"}
					onClick={() => {
						addGroupMapping({
							name: name
						});
						closeModal();
					}}
				>
					<MdCreate className="mr-2 h-3 w-3" />
					Create
				</Button>
				<Button
					size={"sm"}
					onClick={() => closeModal()}
				>
					<MdOutlineCancel className={"mr-2 h-3 w-3"} />
					Cancel
				</Button>
			</div>
		</div>

	)
}

export default function ObjectListMappingTable(){
	const [groupMapping] = useRecoilState(groupMappingAllAtom);
	const [mappingTableNode, setMappingTableNode] = useState<boolean>(true);
	const [selectedGroupMappingId, setSelectedGroupMappingId] = useRecoilState<GroupMappingEntity['id']>(selectedGroupMappingIdAtom);
	const delteGroupMapping = useDeleteGroupMappingHook();
	const { openModal, closeModal } = useModal();
	const headers = [
		'name',
		'edit',
		'delete',
		'list'
	];
	return (
		<>
			{mappingTableNode 
			?
				<>
					<Navbar fluid rounded>
						<IconButton
							icon={<RiMenuAddFill />}
							tooltip={"Add Exhibition"}
							onClick={() => {
								openModal({
									title: 'Add Exhibition',
									content: <AddContentModal />
								})
							}}
						/>
					</Navbar>
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
												checked={selectedGroupMappingId === groupMapping.id}
												onChange={() => {
													if(selectedGroupMappingId !== groupMapping.id){
														setSelectedGroupMappingId(groupMapping.id);
													}
												}}

											/>
										</Table.Cell>
										<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
											<div className="relative">
												<div
													className={`block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
													${groupMapping.id !== selectedGroupMappingId ? "" : "border-blue-500"} `}
												>
													{groupMapping.name}
												</div>
											</div>
										</Table.Cell>
										<Table.Cell>
											<Button
												outline
												// outline
												gradientDuoTone="purpleToBlue"
												onClick={()=>{
													openModal({
														title: 'Edit Exhibition',
														content: <EditContentModal uuid={groupMapping.id}/>
													})
												}}
											>
												<TbEdit />
											</Button>
										</Table.Cell>
										<Table.Cell>
											<Button
												pill
												gradientDuoTone="pinkToOrange"
												onClick={()=>{
													openModal({
														content: <DeleteContentModal 
															title={"Are you sure you want to delete this group?"}
															onClick={()=>{
																delteGroupMapping(groupMapping.id);
																closeModal();
															}}
														/>
													})
												}}
											>
												     <MdDelete />
											</Button>
										</Table.Cell>
										<Table.Cell>
											<Button
												outline
												gradientDuoTone="tealToLime"
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
					<ExhibitModal

					/>
				</>
			: <ObjectListTable 
				onBackClick={() => setMappingTableNode(true)}
			/>}
		</>
	)
}