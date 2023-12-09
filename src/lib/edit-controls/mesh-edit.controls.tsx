import {Sidebar} from "flowbite-react";
import { HiCubeTransparent, HiColorSwatch, HiArrowsExpand, HiOutlineRefresh   } from "react-icons/hi";
import { TbGeometry, TbTexture } from "react-icons/tb";
import {Color, Mesh} from "three";
import {Fragment, ReactNode, SVGAttributes, useEffect, useMemo, useState} from "react";
import { useDebounce } from 'usehooks-ts'
import { TransformControlsProps } from "@react-three/drei";
import { TransformMode } from "../../types/transform";
import MeshService from "../../services/mesh.service";
import MaterialService from "../../services/material.service";
import GeometryService from "../../services/geometry.service";
import {DefaultExhibitGeometryEntity, GeometryType} from "../../clients/entities/exhibit-geometry.entity";
import ExhibitGeometryFactory from "../../clients/factories/exhibit-geometry.factory";
import ImageClient from "../../clients/image.client";
import {ImageEntity} from "../../clients/entities/image.entity";
import GltfClient from "../../clients/gltf.client";
import {GltfEntity} from "../../clients/entities/gltf.entity";
import { PiCirclesThreeBold } from "react-icons/pi";
import {useThree} from "@react-three/fiber";



interface IconBaseProps extends SVGAttributes<SVGElement> {
    children?: ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
}
type IconType = (props: IconBaseProps) => JSX.Element;
const theme = {
    "root": {
        "base": "h-full float-right",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800"
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
        "base": "mt-6 rounded-lg p-4 bg-cyan-40 dark:bg-gray-700",
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
        "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:cursor-pointer",
        "active": "bg-gray-100 dark:bg-gray-700",
        "collapsed": {
            "insideCollapse": "group w-full pl-8 transition duration-75",
            "noIcon": "font-bold"
        },
        "content": {
            "base": "px-3 flex-1 whitespace-nowrap"
        },
        "icon": {
            "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
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
interface MeshEditControlsInterface {
    mesh: Mesh
    transformControls: any
}
enum MeshEditItemName {
    Transform = 'transform',
    Color = 'color',
    Geometry = 'geometry',
    Texture = 'texture',
    Gltf = 'gltf'
}


interface meshEditItemInterface {
    name: MeshEditItemName,
    element: ReactNode,
    icon:  IconType
}

interface transformItemInterface {
    name: TransformMode,
    icon: IconType
}

const imageClient = new ImageClient();
const gltfClient = new GltfClient();

/**
 * url - https://www.flowbite-react.com/docs/components/sidebar#
 * 
 * @param param0 
 * @returns 
 */
export default function MeshEditControls({ mesh, transformControls }: MeshEditControlsInterface) {

    const [ clicked, setClicked ] = useState<MeshEditItemName | null>(null)
    const [transformMode, setTransformMode] = useState<TransformControlsProps['mode']>('translate');
    const [color, setColor] = useState<string>(`#${new Color(mesh.toJSON().materials[0].color).getHexString()}`);
    const debouncedColorValue = useDebounce<string>(color, 500);
    const [textures, setTextures] = useState<ImageEntity[] | []>([]);
    const [gltfEntities, setGltfEntities] = useState<GltfEntity[] | []>([]);

    const meshService = new MeshService(mesh);
    const materialService = new MaterialService(mesh);
    const geometryService = new GeometryService(mesh);

    const transformItems: transformItemInterface[] = [{
        name: TransformMode.Translate,
        icon: HiCubeTransparent
    },{
        name: TransformMode.Rotate,
        icon: HiOutlineRefresh
    },{
        name: TransformMode.Scale,
        icon: HiArrowsExpand
    }];
    const meshEditItems: meshEditItemInterface[] = [
        {
            name: MeshEditItemName.Transform,
            icon: (
                (transformMode === TransformMode.Scale)
                    ? HiArrowsExpand
                    : (transformMode === TransformMode.Rotate)
                        ? HiOutlineRefresh
                        : HiCubeTransparent
            ),
            element: (
                <>
                    {transformItems.map(({name, icon}) => {
                        return (
                            <Sidebar.Item
                                icon={icon}
                                onClick={()=>{
                                    if(transformControls){
                                        console.log(transformControls);
                                        transformControls.current.setMode(name);

                                        setTransformMode(name);
                                    }
                                }}
                            >
                                {name}
                            </Sidebar.Item>
                        )
                    })}
                </>
            )
        },{
            name: MeshEditItemName.Geometry,
            icon: TbGeometry,
            element: (<>
                {Object.values(GeometryType).map((geometryType) => {
                    return (
                        <Sidebar.Item
                            onClick={() => {
                                const geometryFactory = new ExhibitGeometryFactory(new DefaultExhibitGeometryEntity({
                                    id: mesh.geometry.uuid,
                                    type: geometryType
                                }));
                                mesh.geometry = geometryFactory.create();
                                geometryService.update();
                            }}
                        >
                            {geometryType}
                        </Sidebar.Item>
                    )
                })}
            </>)
        },{
            name: MeshEditItemName.Texture,
            icon: TbTexture,
            element: <>
                {textures.map((texture) => {
                    return(
                        <Sidebar.Item
                            onClick={()=>{
                                materialService.updateTexture(texture);
                            }}
                        >
                            {texture.name}
                        </Sidebar.Item>
                    )
                })}
            </>
        },{
            name: MeshEditItemName.Gltf,
            icon: PiCirclesThreeBold,
            element: <>
                {gltfEntities.map((gltf) => {
                    return(
                        <Sidebar.Item
                            onClick={()=>{
                                mesh.userData.gltf = gltf;
                                meshService.update();
                            }}
                        >
                            {gltf.name}
                        </Sidebar.Item>
                    )
                })}
            </>
        },{
            name: MeshEditItemName.Color,
            icon: HiColorSwatch,
            element: <input
                value={color}
                type={'color'}
                onChange={(event)=>{
                    if('color' in mesh.material){
                        const threeColor = new Color(event.target.value)
                        mesh.material.color = threeColor;
                        setColor(`#${threeColor.getHexString()}`);
                    }
                }}
            />
        }
    ]

    const onTransformControlsMouseUp = () => {
        geometryService.update();
        meshService.update();
    }
    useEffect(() => {
        transformControls?.current?.addEventListener('mouseUp',onTransformControlsMouseUp)
        return () => {
            transformControls?.current?.removeEventListener('mouseUp',onTransformControlsMouseUp);
        }
    },[transformControls, onTransformControlsMouseUp]);

    useEffect(()=>{
        materialService.update();
        console.log('debouncedColorValue',debouncedColorValue);

    },[debouncedColorValue])

    useEffect(()=> {
        imageClient.findAllPurposeByTexture()
            .then((response: ImageEntity[] | []) => {
                setTextures(response);
            })
            .catch((exception) => {

            })
    },[])

    useEffect(()=> {
        gltfClient.findAll()
            .then((response: GltfEntity[] | []) => {
                setGltfEntities(response);
            })
            .catch((exception) => {

            })
    },[])

    return (
        <Sidebar
            onClick={(event)=>{
                event.stopPropagation();
            }}
            theme={theme}
            aria-label="mesh-edit-sidebar"
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {
                        meshEditItems.map(({name, element, icon}, index) => {
                            return (
                                <Fragment
                                    key={index}
                                >
                                    <Sidebar.Item
                                        onClick={()=> {
                                            if(clicked === name){
                                                setClicked(null);
                                            }else if(clicked !== name){
                                                setClicked(name);
                                            }else{
                                                setClicked(name)
                                            }
                                        }}
                                        icon={icon}
                                    >
                                    {name}
                                    </Sidebar.Item>
                                    {
                                        (clicked === name) &&
                                        <Sidebar.CTA>
                                            {element}
                                        </Sidebar.CTA>
                                    }   
                                    <hr />
                                </Fragment>
                            )
                        })
                    }

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}


