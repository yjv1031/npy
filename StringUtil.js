
import qs from 'qs';
import { auth } from '@mes/mes-ui-react';


//겟방식 파라미터 전달에 대하여 값을 리턴한다.
// ex) 'http://url~~~~~~~~?aa=123&bb=535'
// getParameterByName('bb') 는 파라미터 bb의 값인 535를 리턴한다.
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//스트링으로 이루어진 날짜 데이터를 자바스크립트 날짜 객체로 변환하여 준다.
//단 파라미터 param은 '2011-09-28 11:38:00' 과 동일한 형식이어야 한다.
function changeDateToString(param) {
  const year = param.substring(0, 4);
  const month = param.substring(5, 7);
  const day = param.substring(8, 10);
  const hour = param.substring(11, 13);
  const minute = param.substring(14, 16);
  const second = param.substring(17, 19);
  return new Date(year, month, day, hour, minute, second);
}


//두 DATE형식 날짜간의 차이를 밀리초 단위로 반환한다.(1초 = 1000밀리초)
function diffDateSecond(startDate, endDate) {
  const result = endDate.getTime() - startDate.getTime() ;
  return result;
}


//undefined or null 일경우 false를 반환한다.
function isNotNull(param) {
  return param === undefined || param === null ? false : true;
}


//배열이 아닐 경우 false를 반환한다.
function isArray(param) {
  return param === undefined || param === null || !Array.isArray(param) ? false : true;
}


//로그인 유저의 창고코드를 리턴한다.
async function getChangGoCode(thisPram) {
  let code='';
  return await auth.getAllUserInfo()
    .then((allUserInfo) => {
      const key = getQueryVariable('NS_RKEY',thisPram);
      const lovList = isNotNull(allUserInfo) && isNotNull(allUserInfo.opWorkLocation) ? allUserInfo.opWorkLocation[key] : [];
      if (isArray(lovList) && lovList.length > 0) {
        code = lovList[0];
      }
      else{
        code = '';
      }
      return code;
    });
}

// 로그인 유저 정보및 창고코드 리턴
async function getUserInfo(thisPram) {
  let code='';
  let returnObj = {
    code: '',
    user: {},
  };
  return await auth.getAllUserInfo()
    .then((allUserInfo) => {
      const key = getQueryVariable('NS_RKEY',thisPram);
      const lovList = isNotNull(allUserInfo) && isNotNull(allUserInfo.opWorkLocation) ? allUserInfo.opWorkLocation[key] : [];
      if (isNotNull(allUserInfo)){
        returnObj.user = allUserInfo;
      } else {
        returnObj.user = {};
      }

      if (isArray(lovList) && lovList.length > 0) {
        returnObj.code = lovList[0];
      }
      else{
        returnObj.code = '';
      }

      return returnObj;
    });
}

function getQueryVariable(variable,thisPram) {
  const params = qs.parse(thisPram.props.location.search, { ignoreQueryPrefix: true });
  const securityValue = params[variable];
  return securityValue;
}

function isJson(str) {
  const objCon = ({}).constructor;
  try {
    if(typeof str === 'object') {
      if(str.constructor === objCon) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('false');
      return false;
    }
  } catch (e) {
    console.log("error");
      return false;
  }
}

export default {
    getParameterByName,
    changeDateToString,
    diffDateSecond,
    isNotNull,
    isArray,
    getChangGoCode,
    getUserInfo,
    isJson,
}


export {
    getParameterByName,
    changeDateToString,
    diffDateSecond,
    isNotNull,
    isArray,
    getChangGoCode,
    getUserInfo,
    isJson,
}
