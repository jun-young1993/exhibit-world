import { Kbd, Table } from "flowbite-react";

export function HelpEditControlsModal(){
	return (
		<Table>
		  <Table.Head>
		    <Table.HeadCell>Key</Table.HeadCell>
		    <Table.HeadCell>Description</Table.HeadCell>
		  </Table.Head>
		  <Table.Body className="divide-y">
		    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
			<Kbd>Shift</Kbd><span> + </span><Kbd>Mouse Drag</Kbd>
		      </Table.Cell>
		      <Table.Cell>I move the position of the camera.</Table.Cell>
		    </Table.Row>
		    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
			<Kbd>Mouse wheel</Kbd>
		      </Table.Cell>
		      <Table.Cell>Zoom in or out on the scene.</Table.Cell>
		    </Table.Row>
		    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
			<Kbd>Mouse Drag</Kbd>
		      </Table.Cell>
		      <Table.Cell>I move the rotation of the camera.</Table.Cell>
		    </Table.Row>
		  </Table.Body>
		</Table>
	      );
}


export function HelpExhibitControlsModal(){
	return (
		<Table>
		  <Table.Head>
		    <Table.HeadCell>Key</Table.HeadCell>
		    <Table.HeadCell>Description</Table.HeadCell>
		  </Table.Head>
		  <Table.Body className="divide-y">
		    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
		      	<span className="inline-flex gap-1">
			      <Kbd>w</Kbd>
			      <Kbd>s</Kbd>
			</span>
			<span> or </span>
			<span className="inline-flex gap-1">
				<Kbd>a</Kbd>
				<Kbd>d</Kbd>
			</span>
		      </Table.Cell>
		      <Table.Cell>The WASD keys are used for movement.</Table.Cell>
		    </Table.Row>
		    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
			<Kbd>Shift</Kbd><span> or </span><Kbd>Spacebar</Kbd>
		      </Table.Cell>
		      <Table.Cell>The key used for running or jumping.</Table.Cell>
		    </Table.Row>
		    {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
		      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
			<span className="inline-flex gap-1">
			  <Kbd icon={MdKeyboardArrowUp} />
			  <Kbd icon={MdKeyboardArrowDown} />
			</span>
			<span> or </span>
			<span className="inline-flex gap-1">
			  <Kbd icon={MdKeyboardArrowLeft} />
			  <Kbd icon={MdKeyboardArrowRight} />
			</span>
		      </Table.Cell>
		      <Table.Cell>Choose and activate previous/next tab.</Table.Cell>
		    </Table.Row> */}
		  </Table.Body>
		</Table>
	      );
}
