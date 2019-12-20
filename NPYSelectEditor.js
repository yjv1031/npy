import React, { Component } from 'react';
import { Select } from '@mes/mes-ui-react';

const SelectEditRender = () => {
  const component = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.value,
        flag: false,
      };
      this.heightValue = 150;

      console.log('selectEditor constructor');
      console.log('스테이트 현황');
      console.log(this.state);
      console.log('프랍스현황');
      console.log(this.props);
      console.log('끝');
    }

    onChange = (e, data) => {
      console.log('온체인지 발생');
      this.setState({ value: data.value});
      this.props.stopEditing();
    };

    // afterGuiAttached = () => {
    //   if (!this.props.selectOption) return false;
    // };

    getValue = () => this.state.value;
    isPopup = () => true;

    render = () => {
      const { selectOption, column, placeholder, className } = this.props;
      const w = column.actualWidth - 16;

      if (!selectOption) {
        this.props.stopEditing();
        return '';
      }

      return (
        <Select
          open
          width={w}
          scrolling
          options={selectOption}
          value={this.state.value}
          onChange={this.onChange}
          className={className || ''}
          placeholder={placeholder}
        />
      );
    };
  };

  return component;
};

export default SelectEditRender;
