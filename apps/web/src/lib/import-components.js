import { MapTo } from '@adobe/aem-react-editable-components';
import { Link, Text } from '@repo/ui';

const aem_site = process.env.NEXT_PUBLIC_AEM_SITE;

console.log('aem site', aem_site);

MapTo(`${aem_site}/components/text`)(Text);
MapTo(`${aem_site}/components/link`)(Link);
