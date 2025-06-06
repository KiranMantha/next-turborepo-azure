import { render } from '@testing-library/react';
import { Link, LinkEditConfig } from './Link';
import { LinkMock } from './Link.mock';

describe('Link Component', () => {
  it('LinkEditConfig properties', () => {
    expect(LinkEditConfig).toHaveProperty('emptyLabel', 'Link');
    expect(LinkEditConfig).toHaveProperty('isEmpty');
  });

  it('should render link with correct label', () => {
    const { getByText } = render(<Link model={LinkMock} />);
    expect(getByText(LinkMock.label)).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    const { getByText } = render(<Link model={LinkMock} />);
    const linkElement = getByText(LinkMock.label).closest('a');
    expect(linkElement).toHaveAttribute('href', LinkMock.href);
  });

  it('should render empty link when href is not provided', () => {
    const { getByText } = render(<Link model={{ label: 'Link', href: '' }} />);
    const linkElement = getByText('Link').closest('a');
    expect(linkElement).toHaveAttribute('href', '');
  });
});
