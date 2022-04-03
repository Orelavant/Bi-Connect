import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "../styles/Tab.module.scss";
import CreateButton from "./CreateButton";

interface TabData {
	data: {
		[key: string]: any;
	}[];
	renderComponent: React.FunctionComponent<any>;
	createButtonOnClick: () => void;
}

interface TabProps {
	tabs: { [key: string]: TabData };
}

const Tab = ({ tabs }: TabProps) => {
	const [selectedTabName, setSelectedTabName] = useState(
		Object.entries(tabs)[0][0]
	);

	return (
		<Tabs.Root value={selectedTabName} asChild>
			<div className={styles.card}>
				<Tabs.List asChild>
					<div className={styles["tab-trigger-list"]}>
						{Object.entries(tabs).map(([tabKey, tabData]) => (
							<Tabs.Trigger value={tabKey} asChild key={tabKey}>
								<button
									className={styles["trigger-button"]}
									onClick={() => {
										setSelectedTabName(tabKey);
									}}
								>
									{tabKey}
								</button>
							</Tabs.Trigger>
						))}
					</div>
				</Tabs.List>
				<div className={styles["tab-content-list-container"]}>
					{Object.entries(tabs).map(([tabKey, { data, renderComponent }]) => (
						<Tabs.Content value={tabKey} asChild>
							<div>
								{data.map((json) =>
									React.createElement(renderComponent, { ...json })
								)}
							</div>
						</Tabs.Content>
					))}
				</div>
				<div className={styles["create-button-container"]}>
					<CreateButton
						buttonName={"Create " + selectedTabName}
						onClick={tabs[selectedTabName].createButtonOnClick}
					></CreateButton>
				</div>
			</div>
		</Tabs.Root>
	);
};

export default Tab;
