import { EditableComponent, ModelProps } from '@adobe/aem-react-editable-components';
import { FC } from 'react';
import { TextProps } from './Text.model';

export const TextEditConfig = {
  emptyLabel: 'Text',
  isEmpty: () => false,
};

export const Text: FC<{
  model: TextProps & ModelProps;
}> = (props) => {
  const { richText, text } = props.model;
  const richTextContent = () => <div dangerouslySetInnerHTML={{ __html: text }} />;
  const normalTextContent = () => <div>{text}</div>;

  return (
    <EditableComponent config={TextEditConfig} {...props}>
      {richText ? richTextContent() : normalTextContent()}
    </EditableComponent>
  );
};
