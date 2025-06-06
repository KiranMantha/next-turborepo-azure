import { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { LinkMock } from './Link.mock';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  args: { model: LinkMock },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { model: LinkMock },
};
