import CustomModelClient from '@/lib/CustomModelClient';
import '@/lib/import-components';
import '@/styles/globals.scss';
import { ModelManager } from '@adobe/aem-spa-page-model-manager';
import { AppProps } from 'next/app';

const modelClient = new CustomModelClient(process.env.NEXT_PUBLIC_AEM_HOST);
ModelManager.initializeAsync({
  modelClient
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
