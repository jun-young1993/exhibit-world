import {exhibitAllAtom, useRemoveExhibitHook} from "../../store/recoil/exhibit.recoil";
import {useRecoilState, useRecoilValue} from "recoil";
import {Radio, Table, Button, Modal, Alert, Toast, Tooltip, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import { MdOutlinePreview, MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { HiCheck, HiOutlineExclamationCircle } from "react-icons/hi";
import Exhibit from "../exhibit";
import {ExhibitModal} from "../exhibit-modal";
import {useModal} from "../../store/recoil/modal.recoild";
import ExhibitClient from "../../clients/exhibit.client";
import {isEmpty} from "lodash";


const exhibitClient = new ExhibitClient();

export default function ExhibitList(){
    const exhibits = useRecoilValue(exhibitAllAtom);

    const { openModal, closeModal } = useModal();

    const removeExhibit = useRemoveExhibitHook();
    const headers = [
        'preview',
        'link',
        'created_at',
        'delete'

    ]

    if(isEmpty(exhibits)){
        return (
            <>no data</>
        )
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
                                        <div className={"flex"}>
                                            <div>
                                                {`${window.location.href}exhibit/${exhibit.id}`}
                                            </div>
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
                                                        await navigator.clipboard.writeText(`${window.location.href}exhibit/${exhibit.id}`);
                                                    }}
                                                >
                                                    <FaCopy />
                                                </Button>
                                            </Tooltip>
                                        </div>

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
                                                                            exhibitClient.delete(exhibit.id)
                                                                                .then((deletedExhibit) => {

                                                                                    removeExhibit(exhibit);
                                                                                    closeModal();
                                                                                })
                                                                                .catch((exception ) => {

                                                                                    console.error("=>(exhibit-list.tsx:121) exception", exception);
                                                                                })
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
            <ExhibitModal />
        </>
    )
}