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
import Profile from "../profile";
import VersionBadge from "components/version/version-badge";
interface DashboardPannelProps {

}

const githubClient = new GithubClient();



function StartMenu(){
	return (
		<div>
			<span className="mt-2">
				<VersionBadge />	
			</span>
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
			<Profile />
		</>
	)
}
export default function DashboardPannel(props: DashboardPannelProps){
	return (
		<Navbar fluid rounded>
			<div className="flex justify-between w-full">
				<div className="flex justify-start gap-x-3">
					<StartMenu />
				</div>
				<div className="flex justify-center gap-x-3">
					<CenterMenu />
				</div>
				<div className="flex justify-end gap-x-3">
					<EndMenu />
				</div>
			</div>
		</Navbar>
	)
}