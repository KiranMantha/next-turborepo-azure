import { ErrorBoundary } from '@/hoc';
import { fetchModel, ResponsiveGrid, ResponsiveGridComponentProps } from '@adobe/aem-react-editable-components';
import { Constants } from '@adobe/aem-spa-page-model-manager';
import { NextPageContext } from 'next';
import Head from 'next/head';

const { NEXT_PUBLIC_AEM_HOST, NEXT_PUBLIC_AEM_ROOT, NEXT_PUBLIC_AEM_DEFAULT_PAGE, NEXT_PUBLIC_AEM_AUTH } = process.env;

type PageRendererProps = {
  model: ResponsiveGridComponentProps & {
    description: string;
  };
  pagePath: string;
  isAuthorMode: boolean;
};

export default function PageRenderer({ model, pagePath, isAuthorMode }: PageRendererProps) {
  return (
    <>
      <Head>
        <title>{model.title}</title>
        <meta name="description" content={model.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="page-gutter">
        <ErrorBoundary>
          <ResponsiveGrid
            key={pagePath}
            {...model}
            cqPath={`${pagePath}/${Constants.JCR_CONTENT}/root/responsivegrid`}
            isInEditor={isAuthorMode}
          />
        </ErrorBoundary>
      </main>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { page, isAuthorMode } = context.query;
  const path = Array.isArray(page) ? page.join('/') : page;
  const pagePath = `${NEXT_PUBLIC_AEM_ROOT}/${path || NEXT_PUBLIC_AEM_DEFAULT_PAGE}`;

  const model = await fetchModel({
    pagePath,
    itemPath: 'root/responsivegrid',
    host: NEXT_PUBLIC_AEM_HOST,
    options: {
      headers: {
        Authorization: NEXT_PUBLIC_AEM_AUTH || ''
      }
    }
  });
  return {
    props: {
      model,
      pagePath,
      isAuthorMode: Boolean(isAuthorMode)
    }
  };
}
