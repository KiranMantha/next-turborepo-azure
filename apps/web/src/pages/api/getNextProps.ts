import { DOMParser } from '@xmldom/xmldom';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;
  const url = process.env.NEXT_PUBLIC_URL + (path as string).replace('/author', '') + '?isAuthorMode=true';
  const response = await fetch(url);
  if (!response.ok) {
    return res.status(response.status).json({ error: `Failed to fetch page: ${response.statusText}` });
  }
  const pageText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageText, 'text/html');
  const nextPropsContent = doc.getElementById('__NEXT_DATA__')?.textContent;
  try {
    const data = JSON.parse(nextPropsContent as string);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
