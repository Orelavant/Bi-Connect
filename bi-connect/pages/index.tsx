import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let input: string = e.target.value;
		setEmail(input);
	};

	const handlePasswordInputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		let input: string = e.target.value;
		setPassword(input);
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log(email);
		console.log(password);
		//TODO
		//API call
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Bi-Connect</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.card}>
				<div className={styles.email}>
					<label htmlFor="email">Email</label>
					<input onChange={handleEmailInputOnChange} id="email" />
				</div>
				<div className={styles.password}>
					<label htmlFor="password">Password</label>
					<input
						onChange={handlePasswordInputOnChange}
						id="password"
						type="password"
					/>
				</div>

				<button onClick={handleSubmit} className={styles["login-button"]}>
					Login
				</button>
				{/* <div className={styles["button-container"]}>
			</div> */}
			</div>
		</div>
	);
};

export default Home;
