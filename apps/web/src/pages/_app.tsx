import { AppProps } from 'next/app';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
