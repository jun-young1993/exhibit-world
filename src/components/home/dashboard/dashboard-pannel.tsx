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

	const handleClick = () => {
	
		
			openModal({
				title: (
					<div className="flex flex-col" key={currentRelease.name}>
						<div className="min-w-0 flex-auto">
							<p className="text-sm font-semibold leading-6 text-gray-900">{currentRelease.name}</p>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							<p className="mt-1 text-xs leading-5 text-gray-500"><time dateTime={currentRelease.created_at.toString()}>{currentRelease.created_at.toString()}</time></p>
						</div>								
					</div>
				),
				content: (
					<div className={"w-full min-w-0 h-full flex"}>
							<Markdown className={"whitespace-pre"}>{currentRelease.body}</Markdown>
					</div>
				)
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