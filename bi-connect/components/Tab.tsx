import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "../styles/Tab.module.scss";
import CreateButton from "./CreateButton";
import LoadingTabItem from "./LoadingTabItem";

interface TabData {
	data:
		| {
				[key: string]: any;
		  }[]
		| null;
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
						{Object.entries(tabs).map(([tabKey, tabData], idx) => (
							<Tabs.Trigger value={tabKey} asChild key={idx}>
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
					{Object.entries(tabs).map(
						([tabKey, { data, renderComponent }], idx) => (
							<Tabs.Content value={tabKey} asChild key={idx}>
								<div>
									{data != null ? (
										data.map((json, idx) =>
											React.createElement(renderComponent, {
												key: idx,
												...json,
											})
										)
									) : (
										<div>
											<LoadingTabItem />
											<LoadingTabItem />
											<LoadingTabItem />
											<LoadingTabItem />
											<LoadingTabItem />
										</div>
									)}
								</div>
							</Tabs.Content>
						)
					)}
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
