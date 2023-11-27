import {Sidebar} from "flowbite-react";
import { HiMinus, HiPlus, HiMenu } from "react-icons/hi";
import {DefaultExhibitMeshEntity} from "../../clients/entities/exhibit-mesh.entity";
import ExhibitMeshFactory from "../../clients/factories/exhibit-mesh.factory";
import MeshesStore from "../../store/meshes.store";
import {useState} from "react";
import {Button} from "@material-tailwind/react";


const theme = {
    "root": {
        "base": "h-full",
        "collapsed": {
            "on": "w-10",
            "off": "w-10"
        },
        "inner": "bg-opacity-0"
    },
    "collapse": {
        "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        "icon": {
            "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "open": {
                "off": "",
                "on": "text-gray-900"
            }
        },
        "label": {
            "base": "ml-3 flex-1 whitespace-nowrap text-left",
            "icon": {
                "base": "h-6 w-6 transition ease-in-out delay-0",
                "open": {
                    "on": "rotate-180",
                    "off": ""
                }
            }
        },
        "list": "space-y-2 py-2"
    },
    "cta": {
        "base": "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
        "color": {
            "blue": "bg-cyan-50 dark:bg-cyan-900",
            "dark": "bg-dark-50 dark:bg-dark-900",
            "failure": "bg-red-50 dark:bg-red-900",
            "gray": "bg-alternative-50 dark:bg-alternative-900",
            "green": "bg-green-50 dark:bg-green-900",
            "light": "bg-light-50 dark:bg-light-900",
            "red": "bg-red-50 dark:bg-red-900",
            "purple": "bg-purple-50 dark:bg-purple-900",
            "success": "bg-green-50 dark:bg-green-900",
            "yellow": "bg-yellow-50 dark:bg-yellow-900",
            "warning": "bg-yellow-50 dark:bg-yellow-900"
        }
    },
    "item": {
        "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        "active": "bg-gray-100 dark:bg-gray-700",
        "collapsed": {
            "insideCollapse": "group w-full pl-8 transition duration-75",
            "noIcon": "font-bold"
        },
        "content": {
            "base": "px-3 flex-1 whitespace-nowrap"
        },
        "icon": {
            "base": "ml-6 h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "active": "text-gray-700 dark:text-gray-100"
        },
        "label": "",
        "listItem": ""
    },
    "items": {
        "base": ""
    },
    "itemGroup": {
        "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
        "base": "mb-5 flex items-center pl-2.5",
        "collapsed": {
            "on": "hidden",
            "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        },
        "img": "mr-3 h-6 sm:h-7"
    }
};
/**
 * url - https://www.flowbite-react.com/docs/components/sidebar#
 *
 * @constructor
 */
export default function EditSidebar() {
    const { set } = MeshesStore();
    const [ open , setOpen ] = useState<boolean>(true);
    return (
        <Sidebar
            theme={theme}
            aria-label="edit-sidebar"
        >
            <Sidebar.Items
            >
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        onClick={()=>{
                            setOpen(!open);
                        }}
                        icon={open ? HiMinus : HiMenu}
                    />
                    {open && (
                        <>
                            <Sidebar.Item
                                onClick={(e:any) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const defaultExhibitMeshEntity = new DefaultExhibitMeshEntity();
                                    const exhibitMeshFactory = new ExhibitMeshFactory(defaultExhibitMeshEntity);
                                    set(exhibitMeshFactory.get());
                                }}
                                icon={HiPlus}
                            />
                        </>
                    )}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}