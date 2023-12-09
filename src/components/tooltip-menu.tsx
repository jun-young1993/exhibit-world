
import React, { useState } from 'react';
import {Mesh} from "three";
interface TooltipMenuInterface {
    mesh: Mesh
}
const TooltipMenu = (props: TooltipMenuInterface) => {
    console.log(props.mesh.position);
    const [showMenu, setShowMenu] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const showTooltip = (event: { clientX: any; clientY: any; }) => {
        setPosition({ x: event.clientX, y: event.clientY });
        setShowMenu(true);
    };

    const hideTooltip = () => {
        setShowMenu(false);
    };

    return (
        <div className="absolute 238 left-719">
            <div className="icon cursor-pointer" onClick={showTooltip} onMouseLeave={hideTooltip}>
                {/* 아이콘을 이곳에 넣어주세요 */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            </div>
            {showMenu && (
                <div className="tooltip bg-gray-200 p-2 rounded absolute top-8 left-0" style={{ left: `${position.x}px`, top: `${position.y}px` }} onMouseLeave={hideTooltip}>
                    {/* 메뉴 항목을 이곳에 추가해주세요 */}
                    <a href="#" className="block hover:text-blue-500">메뉴 항목 1</a>
                    <a href="#" className="block hover:text-blue-500">메뉴 항목 2</a>
                    <a href="#" className="block hover:text-blue-500">메뉴 항목 3</a>
                </div>
            )}
        </div>
    );
};

export default TooltipMenu;
