import { render } from '@testing-library/react';
import { Text, TextEditConfig } from './Text';
import { RichTextMock, TextMock } from './Text.mock';

describe('Text Component', () => {
  it('TextEditConfig properties', () => {
    expect(TextEditConfig).toHaveProperty('emptyLabel', 'Text');
    expect(TextEditConfig).toHaveProperty('isEmpty');
  });

  it('should render normal text correctly', () => {
    const { getByText } = render(<Text model={TextMock} />);
    expect(getByText(TextMock.text)).toBeInTheDocument();
  });

  it('should render rich text correctly', () => {
    const { container } = render(<Text model={RichTextMock} />);
    expect(container.querySelector('p')).toHaveTextContent(TextMock.text);
  });
});
