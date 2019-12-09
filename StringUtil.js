//겟방식 파라미터 전달에 대하여 값을 리턴한다.
// ex) 'http://url~~~~~~~~?aa=123&bb=535'
// getParameterByName('bb') 는 파라미터 bb의 값인 535를 리턴한다.
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export default {
    getParameterByName,
}

export {
    getParameterByName,
}
