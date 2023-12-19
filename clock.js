// 즉시 실행 함수(IIFE)로 코드를 감싸서 전역 스코프를 오염시키지 않음
(function () {
  // HTML에서 clock 클래스를 가진 요소를 선택
  const clock = document.querySelector('.clock');

  // 현재 날짜와 시간을 표시하는 함수
  const getTime = () => {
    // 현재 시간을 얻기 위해 Date 객체를 생성
    const date = new Date();

    // 연도, 월, 일을 가져오고, 필요한 경우 10 미만의 숫자 앞에 0을 추가
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + String(month);
    let date1 = date.getDate();
    if (date1 < 10) date1 = '0' + String(date1);

    // 현재 요일을 가져오기 / slice사용해서 요일스펠링 앞3글자만 따오기
    const day = date.toString().slice(0, 3);

    // 연도, 월, 일, 요일을 배열에 저장
    const dateArr = [year, month, date1, day];

    // 시간을 가져와서 문자열로 변환
    const time = date.toString().slice(16, 24);

    // clock 요소의 텍스트 내용을 날짜와 시간으로 설정
    clock.textContent = dateArr.join(' ') + ' ' + time;
  };

  // 초기화 함수: getTime을 호출하고 1초마다 갱신하는 setInterval 설정
  const init = () => {
    // 처음에 한 번은 수동으로 시간을 설정
    getTime();

    // 1초마다 getTime 함수를 호출하여 시간을 업데이트
    setInterval(getTime, 1000);
  };

  // 초기화 함수 호출
  init();
})();
