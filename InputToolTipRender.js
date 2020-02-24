import React from 'react';
import isFunction from 'lodash/isFunction';
import { Popup } from '@mes/mes-ui-react';
import { parseContent } from '@/components/dataGrid/cell/tooltip';
import InputStyled from '@/components/dataGrid/cell/inputStyled';

const Renderer = ({ allowHtmlTag = false } = {}) => props => {
  const { value, content, title, event, pos, input, className } = props;
  const _input = isFunction(input) ? input() : input;
  const _content = parseContent(content, allowHtmlTag);

  return (
    <Popup
      trigger={<InputStyled className={className} {..._input} value={value} />}
      //hoverable
      header={title && title}
      content={_content}
      on={event}
      position={pos || 'top left'}
    />
  );
};

export default Renderer;
