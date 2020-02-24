import React from 'react';
import { Popup } from '@mes/mes-ui-react';
import { isEmpty, isArray, isObject } from 'lodash';


const getDisplayValue = ({ value }) => {
  if ( isObject(value) ) {
    return value.value || '';
  }
  return JSON.stringify(value);
};

const ToolTipTable = props => {
  if (!props.body) {
    return null;
  }

  const Tr = trProps => {
    const { data } = trProps;

    if (!data) {
      return null;
    }

    return data.map((row, i) => (
      <tr key={i}>
        {row.map(cell => {
          const keys = Object.keys(cell);
          const tagKey = keys.filter(
            key => ['th', 'td'].includes(key),
          ).join('');
          const attrKeys = keys.filter(
            key => !['th', 'td'].includes(key),
          );
          const attrList = attrKeys.reduce((acc, cur) => ({
            ...acc,
            [cur]: cell[cur],
          }), {});
          const value = cell[tagKey] || '';

          if (tagKey === 'th') {
            return <th key={`${i}_${tagKey}_${value}`} {...attrList}>{value}</th>;
          } else {
            return <td key={`${i}_${tagKey}_${value}`} {...attrList}>{value}</td>;
          }
        })}
      </tr>
    ));
  };

  return (
    <div className="table-row">
      <table className="ui table center">
        <thead>
          <Tr data={props.head} />
        </thead>
        <tbody>
          <Tr data={props.body} />
        </tbody>
      </table>
    </div>
  );
};

const Renderer = (resProps, props) => {
  const { value: data, cProps = {}} = props;
  const { value = '', tooltip = {}} = data;
  const BodyComponent = cProps.BodyComponent;

  console.log('props', props);
  if (isEmpty(tooltip) || !Object.values(tooltip).join('')) {
    return value;
  }

  const { head, body, title } = tooltip;

  let popupContent = body;
  if (BodyComponent) {
    popupContent = <BodyComponent head={head} body={body} />;
  } else if (isArray(body)) {
    popupContent = <ToolTipTable head={head} body={body} />;
  } else if (isObject(body)) {
    popupContent = JSON.stringify(body);
  }

  return (
    <Popup
      trigger={<div className="tooltipTxt">{value}</div>}
      // hoverable
      position="left center"
    >
      <Popup.Header>{title}</Popup.Header>
      <Popup.Content>
        {popupContent}
      </Popup.Content>
    </Popup>
  );
};


const ToolTipRenderer = (resProps = {}) => {
  const renderer = Renderer.bind(null, resProps);
  renderer.getDisplayValue = getDisplayValue;

  return renderer;
};

export default ToolTipRenderer;
