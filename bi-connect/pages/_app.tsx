import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	setLogger({
		log: console.log,
		warn: console.warn,
		error: () => {}, // do nothing
	});
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
