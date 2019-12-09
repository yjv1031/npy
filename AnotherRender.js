import { mesAutobind } from '@mes/mes-shared';
import React, { PureComponent } from 'react';

const AnotherRender = (resProps = {}) => {
  const Render = class extends PureComponent {
    locationPopup = (e, url) => {
      e.preventDefault();
      window.location.href=url;
    };

    render() {
      let queryString = '';

      let title = this.props.data[resProps.content].value;
      
      if(title === undefined){
        title = this.props.data[resProps.content];
      }
      
      if(title === undefined){
        title = '';
      };
      
      if (resProps.key) {resProps.key.forEach((key, i) => {
          if(this.props.data[key].value !== undefined){
          queryString += `${i === 0 ? '?' : '&'}${[key]}=${this.props.data[key].value}`;
          }else{
            queryString += `${i === 0 ? '?' : '&'}${[key]}=${this.props.data[key]}`;
          }
        });
      }

    return (
      <a href={`${resProps.path}${queryString}`}
        onClick={(e) => this.locationPopup(e, `${resProps.path}${queryString}`)}

        {...resProps}
        >
        {title}
        </a>
      );

    }
  };
  return mesAutobind(Render);
};

export default AnotherRender;