import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	setLogger({
		log: console.log,
		warn: console.warn,
		error: () => {}, // do nothing
	});
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
