import { GithubReleaseEntity } from "clients/entities/github.entity";
import GithubClient from "clients/github.client";
import { IconType } from "components/toast/exhibit-toast";
import { Badge, Kbd, ListGroup, Navbar, Sidebar } from "flowbite-react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useModal } from "store/recoil/modal.recoild";
import { currentReleaseSelector } from "store/recoil/release.recoil";
import Markdown from 'react-markdown'
interface DashboardPannelProps {

}

const githubClient = new GithubClient();

function VersionBadge(){
	const { openModal } = useModal();
	const currentRelease = useRecoilValue(currentReleaseSelector);
	const [selected, setSelected] = useState(currentRelease);
	const tests = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	const handleClick = () => {
		githubClient.findByReleases()
		.then((releases) => {
		
			openModal({
				title: selected.name,
				content: (
					<div className={"w-full min-w-0 h-full flex"}>
						<ul role="list" className="divide-y divide-gray-100">
							{releases.map((release) => {
								
								return (
									
									<div className="flex flex-col" key={release.name}>
										<li className="flex justify-between gap-x-6 py-5" key={release.name} onClick={()=>setSelected(release)}>
											<div className="min-w-0 flex-auto">
												<p className="text-sm font-semibold leading-6 text-gray-900">{release.name}</p>
											</div>
											<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
												<p className="mt-1 text-xs leading-5 text-gray-500"><time dateTime={release.created_at.toString()}>{release.created_at.toString()}</time></p>
											</div>
										</li>
										<Markdown className={"whitespace-pre-line"}>{release.body}</Markdown>
									</div>
									
								)
							})}
						</ul>
					</div>
				)
			})	
		})
		
	}
	return (
		<Badge 
			size="sm"
			className="cursor-pointer"
			onClick={handleClick}	
		>
			{currentRelease.name}
		</Badge>
	)
}

function StartMenu(){
	return (
		<div>
			<div>first menu</div>
		</div>
	)
}

function CenterMenu(){
	return (
		<div>
			<div>center menu</div>
		</div>
	)
}
function EndMenu(){
	return (
		<>
			<VersionBadge />	
		</>
	)
}
export default function DashboardPannel(props: DashboardPannelProps){
	return (
		<Navbar fluid rounded>
			<div className="flex justify-between w-full">
				<div className="flex justify-start">
					<StartMenu />
				</div>
				<div className="flex justify-center">
					<CenterMenu />
				</div>
				<div className="flex justify-end">
					<EndMenu />
				</div>
			</div>
		</Navbar>
	)
}