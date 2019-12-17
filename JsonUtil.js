import axios from 'axios';

// value, text로 이루어진 코드성 Json에서 text를 반환한다.
// (코드성데이터 Json에서, 찾으려는 text에 대한 value)
// [EX] M8GE010450 > store.js > codeMapping 메소드
function getCodeName(jsonArray, value) {
  return jsonArray.find( (idx) => idx.value === value ).text;
}

// 코드성 json data 가져옴
// [EX] M8GE010450 > store.js > codeMapping 메소드
function getJsonCodeData(code, category, url = '/ma1a11-masterdata/masterdata') {
  return axios.get(`${url}/${code}/${category}`)
    .then((response) => { return response.data.result}  );
}

// 코드성 json data를 selectOptions 에 맞는 형태({value:'',text:''})형태로 리턴함
function getJsonCodeData2(code, category, url = '/ma1a11-masterdata/masterdata') {
  return axios.get(`${url}/${code}/${category}`)
    .then((response) => {
    const result = [];
      for(let key in response.data.result) {
        const temp = {'value': key, 'text': response.data.result[key]};
        result.push(temp);
      }
      return result;
    }
  );
}

//코드성 데이터 value, text 어레이리스트로 리턴
// [EX] M8AC012110 그리드 selectBox 출력 예제
function setConditionCode(param) {
  //value text
  let result = [];
  for(var key in param) {
    result.push({ value: key, text: param[key] });
  }
  return result;
}

//파이프로 전달되는 스트링(CD,NAME)에 대하여 {value:'',text:''} 어레이리스트로 리턴
//단 cdChar 와 nameChar는 각 스트링에 대한 구분 기호를 의미한다.
function setSplitData(cd, name, cdChar, nameChar) {
  //value text
  let result = [];
  let cdList = cd.split(cdChar);
  let nameList = name.split(nameChar);
  cdList.forEach((temp,i) => {
    if( nameList[i] !== undefined){
      result.push({ value: temp, text: nameList[i]});
    }
  });
  return result;
}

export default {
  getCodeName,
  getJsonCodeData,
  getJsonCodeData2,
  setConditionCode,
  setSplitData,
}

export {
  getCodeName,
  getJsonCodeData,
  getJsonCodeData2,
  setConditionCode,
  setSplitData,
}
