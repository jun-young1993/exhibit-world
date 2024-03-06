import {
    exhibitAllAtom,
    exhibitAtomFamily,
    usePatchExhibitHook,
    useRemoveExhibitHook
} from "../../store/recoil/exhibit.recoil";
import {useRecoilState, useRecoilValue} from "recoil";
import {Button, FloatingLabel, Table, Toast, ToggleSwitch, Tooltip} from "flowbite-react";
import {MdCreate, MdDelete, MdOutlineCancel, MdOutlinePreview} from "react-icons/md";
import {FaCopy} from "react-icons/fa";
import {HiCheck, HiOutlineExclamationCircle} from "react-icons/hi";
import Exhibit from "../exhibit";
import {useModal} from "../../store/recoil/modal.recoild";
import {isEmpty} from "lodash";
import {ExhibitEntity} from "../../clients/entities/exhibit.entity";
import {TbEdit} from "react-icons/tb";
import {useEffect} from "react";
import {useToast} from "../../store/recoil/toast.recoil";
import {IconType} from "../toast/exhibit-toast";
import { useCopyToClipboard } from "usehooks-ts";

function EditContentModal({uuid}: {uuid: ExhibitEntity['id']}) {
    const patchExhibit = usePatchExhibitHook();
    const [exhibit, setExhibit] = useRecoilState(exhibitAtomFamily(uuid));
    const {closeModal} = useModal();
    
    return (
        <div className="flex max-w-md flex-col gap-4 mt-3">
            <div>
                <FloatingLabel
                    variant="outlined"
                    label="name"
                    sizing="sm"
                    value={exhibit.name}
                    onChange={event => setExhibit({
                        ...exhibit,
                        name: event.target.value
                    })}
                />
            </div>
            <div>
                <ToggleSwitch 
                    label="public"
                    checked={exhibit.isPublic} 
                    onChange={(checked) => 
                        setExhibit({
                            ...exhibit,
                            isPublic: checked
                        })
                    }
                />
            </div>
            <div className={"flex flex-wrap gap-2"}>
                <Button
                    size={"sm"}
                    onClick={() => {
                        patchExhibit(uuid,{
                            name: exhibit.name
                        });
                        closeModal();
                    }}
                >
                    <MdCreate className="mr-2 h-3 w-3" />
                    Save
                </Button>
            </div>
        </div>
    )
}



export default function ExhibitList(){
    const exhibits = useRecoilValue(exhibitAllAtom);
    const { pushToast } = useToast();
    const { openModal, closeModal } = useModal();
    const [copiedText, copy] = useCopyToClipboard()
    const removeExhibit = useRemoveExhibitHook();
    const headers = [
        'preview',
        'name',
        'link',
        'SETTING',
        'created_at',
        'delete'
    ]

    useEffect(() => {
        if(isEmpty(exhibits)){
            pushToast({
                icon: IconType.INFO,
                content: 'Please export the exhibit from the Objects tab.'
            })
        }
    },[]);

    const handleCopyToClipboard = (text: string) => () => {
        copy(text)
          .then(() => {
            console.log('Copied!', { text })
          })
          .catch(error => {
            console.error('Failed to copy!', error)
          })
      }


    return (
        <>
            <div className="w-full h-full">
                <Table hoverable>
                    <Table.Head>
                        {headers.map((header,index) => {
                            return <Table.HeadCell
                                key={`${header}-${index}`}
                            >{header}</Table.HeadCell>
                        })}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {exhibits.map((exhibit) => {
                            return (
                                <Table.Row
                                    key={exhibit.id}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Button
                                            pill
                                            outline
                                            gradientDuoTone="purpleToBlue"
                                            onClick={() => {
                                                openModal({
                                                    content: <Exhibit uuid={exhibit.id} />
                                                })
                                            }}
                                        >
                                            <MdOutlinePreview
                                                className={"h-5 w-5"}
                                            />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {exhibit.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Tooltip
                                            color={"white"}
                                            content={
                                                <Toast>
                                                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                                        <HiCheck className="h-5 w-5" />
                                                    </div>
                                                    <div className="ml-3 text-sm font-normal">Copied</div>
                                                </Toast>
                                            }
                                            trigger="click" animation="duration-1000" >
                                            <Button
                                                className={"ml-6"}
                                                pill
                                                outline
                                                gradientDuoTone="redToYellow"
                                                onClick={async () => {
                                                    // handleCopyToClipboard(`${window.location.href}exhibit/${exhibit.id}`);
                                                    await navigator.clipboard.writeText(`${window.location.href}exhibit/${exhibit.id}`);
                                                }}
                                            >
                                                <FaCopy />
                                            </Button>
                                        </Tooltip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            outline
                                            // outline
                                            gradientDuoTone="purpleToBlue"
                                            onClick={()=>{
                                                openModal({
                                                    title: 'SETTING EXHIBIT',
                                                    content: <EditContentModal uuid={exhibit.id}/>
                                                })
                                            }}
                                        >
                                            <TbEdit />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {exhibit.createdAt.toString()}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        <Button
                                            pill
                                            outline
                                            gradientDuoTone="pinkToOrange"
                                            onClick={() => {
                                                openModal({
                                                    content: (
                                                        <div className="text-center">
                                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                Are you sure you want to delete this exhibit?
                                                            </h3>
                                                            <div className="flex justify-center gap-4">
                                                                <Button color="failure"
                                                                        onClick={() => {

                                                                            removeExhibit(exhibit);
                                                                            closeModal();
                                                                        }}>
                                                                    {"Yes, I'm sure"}
                                                                </Button>
                                                                <Button
                                                                    color="gray" onClick={() => closeModal()}>
                                                                    No, cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }}
                                        >
                                            <MdDelete
                                                className={"h-5 w-5"}
                                            />
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