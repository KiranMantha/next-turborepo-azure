import { EditableComponent, ModelProps } from '@adobe/aem-react-editable-components';
import { default as NextLink } from 'next/link';
import { FC } from 'react';
import { LinkProps } from './Link.model';

export const LinkEditConfig = {
  emptyLabel: 'Link',
  isEmpty: () => false,
};

export const Link: FC<{
  model: LinkProps & ModelProps;
}> = (props) => {
  const { label, href } = props.model;

  return (
    <EditableComponent config={LinkEditConfig} {...props}>
      <NextLink href={href || ''}>{label}</NextLink>
    </EditableComponent>
  );
};
