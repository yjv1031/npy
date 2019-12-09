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

export default {
  getCodeName,
  getJsonCodeData,
  setConditionCode,
}

export {
  getCodeName,
  getJsonCodeData,
  setConditionCode,
}

