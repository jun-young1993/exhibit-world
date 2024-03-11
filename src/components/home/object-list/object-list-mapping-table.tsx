import {Badge, Button, FloatingLabel, Label, Navbar, Radio, RangeSlider, Spinner, Table, TextInput } from "flowbite-react";
import {useRecoilState } from "recoil"
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState} from "react";
import ObjectListTable from "./object-list-table";
import {
	groupMappingAllAtom, groupMappingAtomFamily, selectedGroupMappingIdAtom,
	useAddGroupMappingHook, useDeleteGroupMappingHook, usePatchGroupMappingHook
} from "store/recoil/groups-mapping.recoil";
import IconButton from "../../icon-button";
import { RiMenuAddFill } from "react-icons/ri";
import {useModal} from "../../../store/recoil/modal.recoild";
import { MdCreate, MdDelete, MdOutlineCancel } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import {GroupMappingEntity} from "../../../clients/entities/group-mapping.entity";
import DeleteContentModal from "components/modal/delete.content";
import { useToast } from "store/recoil/toast.recoil";
import { TiExport } from "react-icons/ti";
import { ExportSyncStatus, exportSyncStatusAtom } from "store/recoil/export-sync-status.recoil";
import { LuHelpCircle } from "react-icons/lu";
import { HelpEditControlsModal } from "components/modal/help.content";
import { GoSearch } from "react-icons/go";
import { debounce } from "lodash";
import { useDebounce } from 'usehooks-ts'

function EditContentModal({uuid}: {uuid: GroupMappingEntity['id']}){
	const [groupMapping, setGroupMapping] = useRecoilState<GroupMappingEntity>(groupMappingAtomFamily(uuid));
	
	
	const { closeModal } = useModal();
	const {pushToast} = useToast();
	const patchGroupMapping = usePatchGroupMappingHook()
	
	return (
		<div className="flex max-w-md flex-col gap-4 mt-3">
			<div>
				<FloatingLabel
					variant="outlined"
					label="name"
					sizing="sm"
					value={groupMapping.name}
					onChange={event => setGroupMapping({
						...groupMapping, 
						name: event.target.value
					})}
				/>
			</div>
			<div>
					<div className="mb-1 block">
						<Label htmlFor="ambient-light-intensity-range" value={`ambient light intensity (${groupMapping.ambientLightIntensity})`} />
					</div>
					<RangeSlider
						id="ambient-light-intensity-range"
						min={0}
						max={100}
						step={0.1}
						defaultValue={groupMapping.ambientLightIntensity}
						onChange={(event) => setGroupMapping({
							...groupMapping, 
							ambientLightIntensity: Number(event.target.value)
						})}
					/>
			</div>
			<div className={"flex flex-wrap gap-2"}>
				<Button
					size={"sm"}
					onClick={() => {
						patchGroupMapping(groupMapping.id,{
							name: groupMapping.name,
							ambientLightIntensity: groupMapping.ambientLightIntensity
						});
						closeModal();
						pushToast({
							content: "An object mapping has been modified"
						})
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
	const {pushToast} = useToast();
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
						pushToast({
							content: "An object mapping has been added."
						})
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
	const [groupMappingAllData] = useRecoilState(groupMappingAllAtom);
	const [mappingTableNode, setMappingTableNode] = useState<boolean>(true);
	const [selectedGroupMappingId, setSelectedGroupMappingId] = useRecoilState<GroupMappingEntity['id']>(selectedGroupMappingIdAtom);
	const [exportSyncStatus, setExportSyncStatus] = useRecoilState(exportSyncStatusAtom);
	const delteGroupMapping = useDeleteGroupMappingHook();
	const [groupMapping, setGroupMapping] = useState<GroupMappingEntity[] | []>([]);
	
	const { openModal, closeModal } = useModal();
	const {pushToast} = useToast();

	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearchText = useDebounce(searchText, 300)


	const handleSearchData = function(): GroupMappingEntity[] | []
	{
		return groupMappingAllData.filter((mapping) => {
			if(mapping.id === selectedGroupMappingId){
				return true;
			}
			return mapping.name.includes(debouncedSearchText);
		})
	}
	
	useEffect(() => {
		setGroupMapping([...handleSearchData()])
	},[debouncedSearchText]);
	useEffect(() => {
		setGroupMapping([...handleSearchData()]);
	},[groupMappingAllData])

	const headers = [
		'name',
		'setting',
		'list',
		'export',
		'delete',
		
	];
	
	const tooltipPlacement = 'bottom-end';
	return (
		<>
			{mappingTableNode 
			?
				<>
					<Navbar fluid rounded>
						<div className="flex justify-between w-full">
							<div className="flex flex-row gap-3">
								{/* <div>
									<Badge className="mt-1.5" size="sm" color="info">Exhibition</Badge>
								</div> */}
								<div>
									<IconButton
										icon={<RiMenuAddFill />}
										tooltip={"Add Exhibition"}
										tooltipPlacement={tooltipPlacement}
										onClick={() => {
											console.log('click');
											openModal({
												title: 'Add Exhibition',
												content: <AddContentModal />
											})
										}}
									/>
								</div>
								<div className="max-w-md border-l ml-3 pl-6">
									<TextInput type="text" rightIcon={GoSearch} placeholder="Search" onChange={event => setSearchText(event.target.value)} />
								</div>
							
							</div>
							<div className="flex flex-row gap-3">
								<IconButton 
									icon={<LuHelpCircle />}
									tooltip={"Help"}
									tooltipPlacement={tooltipPlacement}
									onClick={() => {
											openModal({
												title: "Help.",
												content: <HelpEditControlsModal />
											})
									}}
								/>
							</div>
						</div>
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
														title: 'SETTING EXHIBITION',
														content: <EditContentModal uuid={groupMapping.id}/>
													})
												}}
											>
												<TbEdit />
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
										<Table.Cell>
											<Button 
												outline
												onClick={() => {
													if(exportSyncStatus === ExportSyncStatus.IDLE){
														setExportSyncStatus(ExportSyncStatus.PENDING);
													}
												}}
											>
												{
													(exportSyncStatus === ExportSyncStatus.PENDING)
													? <Spinner size="xs" />
													: <TiExport />
												}	
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
																pushToast({
																	content: "An object mapping has been deleted."
																})
															}}
														/>
													})
												}}
											>
												     <MdDelete />
											</Button>
										</Table.Cell>

								
									</Table.Row>
								)
							})}
						</Table.Body>
					</Table>
					</div>
				</>
			: <ObjectListTable 
				onBackClick={() => setMappingTableNode(true)}
			/>}
		</>
	)
}