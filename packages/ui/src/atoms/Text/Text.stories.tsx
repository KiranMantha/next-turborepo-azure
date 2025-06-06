import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { RichTextMock, TextMock } from './Text.mock';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  args: {
    model: TextMock,
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    model: TextMock,
  },
};

export const RichText: Story = {
  args: {
    model: RichTextMock,
  },
};
