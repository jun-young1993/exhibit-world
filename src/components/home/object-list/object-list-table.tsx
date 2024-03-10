import { Button, FloatingLabel, Label, Navbar, NavbarComponentProps, Radio, RangeSlider, Table, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { groupAtomFamily, groupsAllAtom, useAddGroupHook, useAddSpotLightGroupHook, usePatchGroupHook, useRemoveGroupHook } from "store/recoil/groups.recoil";
import { useModal } from "store/recoil/modal.recoild";
import { selectGroupAtom } from "store/recoil/select-group.recoil";
import { spotLightUserDataAtom } from "store/recoil/spot-light-user-datas.recoil";
import { UserDataSpotLight } from "types/user-data";
import { MdOutlineSettings } from "react-icons/md";
import { updateUserDataStatusAtom } from "store/recoil/update-user-data.recoil";
import IconButton, { IconButtonType } from "components/icon-button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GroupEntity } from "clients/entities/group.entity";
import { MdCreate, MdDelete, MdOutlineCancel, MdOutlineDriveFolderUpload } from "react-icons/md";
import { transformModeAtom } from "store/recoil/transform-mode.recoil";
import { TransformMode } from "types/transform";
import { HiCubeTransparent, HiColorSwatch, HiArrowsExpand, HiOutlineRefresh   } from "react-icons/hi";
import { GiFlashlight } from "react-icons/gi";
import { useToast } from "store/recoil/toast.recoil";
import InstanceMismatchError from "Exception/instance-mismatch";
import { SpotLight } from "three";
import { objectDefalutValues } from "config";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import DeleteContentModal from "components/modal/delete.content";
const ObjectListTableNavBarTheme: NavbarComponentProps['theme'] = {
	root: {
		inner: {
			base: "mx-auto flex flex-wrap items-center gap-4 justify-start",
		}
	}
}
interface SpotLightUserDataModalProps {
	data: UserDataSpotLight
}
interface EditGroupContentModalProps {
	data: GroupEntity
}
const exporter = new GLTFExporter();

function SpotLightUserDataModal(props: SpotLightUserDataModalProps){

	const [spotLightUserData, setSpotLightUserData] = useRecoilState(spotLightUserDataAtom(props.data.uuid));

	return (
		<>
		{spotLightUserData &&
			<div className="flex max-w-md flex-col gap-4">
				<div>
					<ToggleSwitch
						checked={spotLightUserData.castShadow}
						label="cast shadow"
						onChange={(checked) => {
							setSpotLightUserData({
								...spotLightUserData,
								castShadow: checked
							});
						}}
					/>
				</div>
				<div>
					<div className="mb-1 block">
						<Label htmlFor="intensity-range" value={`intensity (${spotLightUserData.intensity})`} />
					</div>
					<RangeSlider
						id="intensity-range"
						min={0}
						max={10000}
						defaultValue={spotLightUserData.intensity}
						onChange={(event) => {
							setSpotLightUserData({
								...spotLightUserData,
								intensity: Number(event.target.value)
							});
						}}
					/>
				</div>
				<div>
					<div className="mb-1 block">
						<Label htmlFor="intensity-range" value={`angle (${spotLightUserData.angle})`} />
					</div>
					<RangeSlider
						id="intensity-range"
						min={0}
						step={0.1}
						max={10}
						defaultValue={spotLightUserData.angle}
						onChange={(event) => {
							setSpotLightUserData({
								...spotLightUserData,
								angle: Number(event.target.value)
							});
						}}
					/>
				</div>
				<div>
					<div className="mb-1 block">
						<Label htmlFor="intensity-range" value={`distance (${spotLightUserData.distance})`} />
					</div>
					<RangeSlider
						id="intensity-range"
						min={0}
						max={100}
						defaultValue={spotLightUserData.distance}
						onChange={(event) => {
							setSpotLightUserData({
								...spotLightUserData,
								distance: Number(event.target.value)
							});
						}}
					/>
				</div>
			</div>
		}
		</>
	)
}
function EditGroupContentModal(props: EditGroupContentModalProps){
	const [group,setGroup] = useRecoilState(groupAtomFamily(props.data.id));
	const [name, setName] = useState<string>(group.name);
	
	return (
		<div className="flex max-w-md flex-col gap-4 mt-3">
			<div>
				<FloatingLabel
					variant="outlined"
					label="name"
					sizing="sm"
					value={group.name}
					onChange={event => setGroup({
						...props.data,
						name: event.target.value
					})}
				/>
			</div>
		</div>
	)
}
function ContentModal(props: {uuid: GroupEntity['id']}){

	const [spotLightUserData] = useRecoilState(spotLightUserDataAtom(props.uuid));
	const [group] = useRecoilState(groupAtomFamily(props.uuid));
	
	const { closeModal } = useModal();
	const [, setUpdateUserDataStatusAtom] = useRecoilState(updateUserDataStatusAtom);
	const patchGroup = usePatchGroupHook();

	const {pushToast} = useToast();
	return (
		<div className="flex max-w-md flex-col gap-4 mt-3" >	
			<EditGroupContentModal data={group} />
			{spotLightUserData && <SpotLightUserDataModal data={spotLightUserData} />}
			<div className={"flex flex-wrap gap-2"}>
				<Button
					size={"sm"}
					onClick={() => {
						if(spotLightUserData){
							setUpdateUserDataStatusAtom(props.uuid);
						}
						patchGroup(group.id,{
							name: group.name
						})
						closeModal();
						pushToast({
							content: "An object has been modified"
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

interface ObjectListTableProps {
	onBackClick ?: () => void
}
export default function ObjectListTable(props: ObjectListTableProps)
{
	const [groups] = useRecoilState(groupsAllAtom);
	const [ selectedGroupId, setSelectedGroupId ] = useRecoilState<string | null>(selectGroupAtom);
	const [transformMode,setTransformMode] = useRecoilState(transformModeAtom);
	const { openModal, closeModal } = useModal();
	const addGroup = useAddGroupHook();
	const addSpotLightGroup = useAddSpotLightGroupHook();
	const removeGroup = useRemoveGroupHook();
	const {pushToast} = useToast();
	const tooltipPlacement = "bottom-end";
	const headers = [
		'name',
		'setting',
		'delete'
	];
	return (
		<>
		<Navbar fluid rounded theme={ObjectListTableNavBarTheme}>
			
			<IconButton 
				icon={<FaArrowLeftLong />}
				tooltip={"exhibition venue list."}
				tooltipPlacement={tooltipPlacement}
				onClick={props.onBackClick}
				
			/>
			<div>|</div>
			<IconButton 
				icon={<MdOutlineDriveFolderUpload />}
				type={IconButtonType.FILE}
				tooltipPlacement={tooltipPlacement}
				tooltip="An object mapping has been add(glb or gltf)."
				onChangeFile={(event) => {
					if(!(event.target.files instanceof FileList)){
						throw new InstanceMismatchError(FileList);
					}
					addGroup(Array.from(event.target.files))
				}}
			/>
			<IconButton 
				icon={<GiFlashlight />}
				tooltipPlacement={tooltipPlacement}
				tooltip="An spot-light mapping has been add."
				onClick={() => {
					addSpotLightGroup();
				}}
			/>
			{selectedGroupId &&
				<>
				<div>|</div>
				<IconButton
					tooltipPlacement={tooltipPlacement}
					icon={transformMode === TransformMode.Translate
						? <HiCubeTransparent />
						: transformMode === TransformMode.Rotate
						? <HiOutlineRefresh />
						: <HiArrowsExpand />}
					tooltip={`transfrom`}
					onClick={() => {
						if(transformMode === TransformMode.Translate){
							setTransformMode(TransformMode.Rotate);
						}
						if(transformMode === TransformMode.Rotate){
							setTransformMode(TransformMode.Scale);
						}
						if(transformMode === TransformMode.Scale){
							setTransformMode(TransformMode.Translate);
						}
					}}
				/>
				</>
			}
			
			{/* <IconButton icon={<TbEditCircle />}/>
			<IconButton icon={<TbEditCircle />}/> */}
			
			
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
										<div
											className={`block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
										>
											{group.name}
										</div>
									</div>
								</Table.Cell>
								<Table.Cell>
									<Button 
										pill
										// outline
										gradientDuoTone="purpleToBlue"
										onClick={()=>{
											openModal({
												title: 'SETTING',
												content: (
													<ContentModal uuid={group.id} />
												),
											})
											setSelectedGroupId(group.id);
										}}
									>
										<MdOutlineSettings />
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
														removeGroup(group);
														closeModal();
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
	)
}