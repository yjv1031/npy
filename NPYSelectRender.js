import React, { Component } from 'react';
import { Icon } from '@mes/mes-ui-react';
import find from 'lodash/find';

const SelectRender = () => {
  const component = class extends Component {
    render = () => {
      const { selectOption, value, required, resProps, className, placeholder } = this.props;
      let data = find(selectOption, ['value', value]);
      console.log('SelectRender recieved props', selectOption, value);

      if (placeholder && !data) {
        data = placeholder;
      } else if (!data) {
        console.log(data, this.props);
      }

      return (
        data ?
          <div
            className={`ag-custom-select-list ${required ? 'req-value' : ''} ${className || ''}`}
            {...resProps}
          >
            { data.text || data }
            <Icon name="dropdown" />
          </div>
          : null
      );
    };
  };

  return component;
};

export default SelectRender;
