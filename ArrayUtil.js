//배열 중복 제거
//[11,22,11,55] => [11,22,55] 로 중복을 제거하여 반환한다.
function distinctArray(param) {
  return [...new Set(param)];
}

//첫번째 파라미터에 array, 두번째 파라미터에 key(아래 변환예는 key값을 name으로 한경우)를 넣으면 key를 기준으로 제이슨배열을 피벗한다(reArray를 리턴).
//jsonDiv 는 열의 공통 키값을 의미
//가능한 두번째 파라미터는 유니크한 PK를 사용하도록한다.
// array=[
//   {name:'김철수',class:'A',no:'23'},
//   {name:'박나나',class:'B',no:'53'},
//   {name:'박하하',class:'C',no:'22'},
//   {name:'김허허',class:'D',no:'11'},
//   {name:'장후후',class:'E',no:'4'},
//   {name:'홍길동',class:'F',no:'17'},
// ]
//
//========>>>>>>>>
//
// reArray=[
//   {'jsonDiv':'name',  '김철수':'김철수', '박나나':'박나나', '박하하':'박하하', '김허허':'김허허', '장후후':'장후후', '홍길동':'홍길동'},
//   {'jsonDiv':'class', '김철수':'A',      '박나나':'B',     '박하하':'C',      '김허허':'D',     '장후후':'E',     '홍길동':'F'},
//   {'jsonDiv':'no',    '김철수':'23',     '박나나':'53',    '박하하':'22',     '김허허':'11',    '장후후':'4',     '홍길동':'17'},
// ]
function pivotArray(array,key) {
  let reArray=[];
  let keyArray=getJsonNameArray(array[0]);
  for(var i in keyArray) {
    let tempKey=keyArray[i];
    let tempMap={};
    tempMap.jsonDiv = tempKey;
    for(var j in array){
      tempMap[array[j][key]] = array[j][tempKey];
    }
    reArray.push(tempMap);
  }
  return reArray;
}

//임의의 제이슨에 대하여 모든 키값을 배열로 리턴한다.
//{'a':'5435','b':'safs','c':'111'} => ['a','b','c'] 인 배열을 리턴한다.
function getJsonNameArray(param) {
  let keyArray=[];
  for(var key in param) {
    keyArray.push(key);
  }
  return keyArray;
}

//제이슨 리스트에서 특정 key에 특정 value를 가진 제이슨을 리턴한다.
// array=[
//   {name:'김철수',class:'A',no:'23'},
//   {name:'박나나',class:'B',no:'53'},
//   {name:'박하하',class:'C',no:'22'},
//   {name:'김허허',class:'D',no:'11'},
//   {name:'장후후',class:'E',no:'4'},
//   {name:'홍길동',class:'F',no:'17'},
// ]
// =====>
// getJsonByKeyName(array,'no','23') 은 {name:'김철수',class:'A',no:'23'}을 리턴한다.
// 제이슨 어레이의 pk값을 파라미터로 선택할 것.
function getJsonByKeyName(array,key,name) {
  let result = array.find((item,idx) => { return item[key] === name; });
  return result;
}

export default {
  distinctArray,
  getJsonNameArray,
  pivotArray,
  getJsonByKeyName,
}

export {
  distinctArray,
  getJsonNameArray,
  pivotArray,
  getJsonByKeyName,
}
