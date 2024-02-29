import ExhibitCanvas from "components/ExhibitCanvas";
import ResizeHandle from "components/lib/resize-handle";
import {useEffect, useState} from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import ObjectListSideMenu from "./object-list/object-list-side-menu";
import ObjectListTable from "./object-list/object-list-table";
import ObjectListMappingTable from "./object-list/object-list-mapping-table";



/**
 * url - https://www.npmjs.com/package/react-resizable-panels
 * @returns 
 */
export default function ObjectList(){

	const [ panelDirection ] = useState<'vertical' | 'horizontal'>("vertical");

	return (
		<>
		<div className={"w-full min-w-0 h-full flex"}>
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
						<ObjectListMappingTable />
						{/* <ObjectListTable /> */}
					</Panel>
				</PanelGroup>
			</div>
		</div>

		</>
	)
}