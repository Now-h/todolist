(function () {
  // 상수 정의: localStorage에 저장할 때 사용할 키
  const TODOLIST = 'list';

  // DOM 요소 선택
  const form = document.querySelector('form'); // 폼 엘리먼트
  const toDoInput = document.querySelector('.toDo_input'); // 할 일 입력 필드
  const toDoMultiDelete = document.querySelector('.toDo_multi_delete'); // 다중 삭제 버튼
  const toDoList = document.querySelector('.toDo_list'); // To-Do 리스트 표시 영역

  // 할 일 목록을 담을 배열 초기화
  let list;

  // 할 일 목록 불러오기
  const loadToDoList = () => {
    // localStorage에서 TODOLIST 키에 저장된 데이터를 가져옴
    // 없으면 빈 배열을 할당
    list = JSON.parse(localStorage.getItem(TODOLIST)) || [];

    // 불러온 목록을 순회하며 화면에 표시
    list.forEach((v, i) => {
      v.id = i + 1;
      v.check = false;
      getToDoList(v);
    });
  };

  // 할 일 목록을 저장
  const saveToDoList = () => {
    // id와 check 속성을 삭제한 새로운 배열을 생성
    const save = list.map((v) => {
      const obj = Object.assign({}, v);
      delete obj.id;
      delete obj.check;
      return obj;
    });

    // 새로운 배열을 JSON 형식으로 변환하여 localStorage에 저장
    localStorage.setItem(TODOLIST, JSON.stringify(save));
  };

  // 할 일 체크 토글
  const toggleToDoList = (id) => {
    const findIdx = list.findIndex((v) => v.id === id);
    list[findIdx].check = !list[findIdx].check;

    const todoItem = document.getElementById(id);
    if (list[findIdx].check) {
      todoItem.classList.add('checked');
    } else {
      todoItem.classList.remove('checked');
    }
  };


    // 다중 선택된 할 일 삭제
    const deleteMultiToDoList = () => {
    // 체크된 항목만 필터링
    const filter = list.filter((v) => v.check === true);

    // 필터링된 항목들에 대해 순회하면서 삭제
    filter.forEach((v) => {
      deleteToDoList(v.id);
    });
};

  // 할 일 삭제
  const deleteToDoList = (id) => {
    // HTML에서 해당 id의 엘리먼트 제거
    document.getElementById(id).remove();

    // 배열에서 해당 id의 할 일 제거
    const findIdx = list.findIndex((v) => v.id === id);
    list.splice(findIdx, 1);

    // 변경된 목록을 저장
    saveToDoList();
  };

  // 현재 날짜 및 시간 문자열 반환
  const getTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1; //월은 0부터 시작하므로 1을 더해줌
    if (month < 10) month = '0' + String(month);
    let date1 = date.getDate();
    if (date1 < 10) date1 = '0' + String(date1);
    const day = date.toString().slice(0, 3); // 요일 추출 slice 사용 = 앞 세 글자
    const dateArr = [year, month, date1, day];
    const time = date.toString().slice(16, 24);
    return dateArr.join(' ') + ' ' + time;
  };

  // 할 일을 추가하는 함수
  const addToDoList = (e) => {
    e.preventDefault();

    // 새로운 할 일의 id 계산
    const id = list[list.length - 1] ? list[list.length - 1].id + 1 : 1;

    // 입력된 할 일, 날짜, 체크 상태를 배열에 추가
    const toDo = toDoInput.value;
    const date = getTime();
    const check = false;
    list.push({ id, toDo, date, check });

    // 추가된 할 일을 화면에 표시
    getToDoList(list[list.length - 1]);

    // 변경된 목록을 저장
    saveToDoList();

    // 입력 필드 초기화
    toDoInput.value = '';
  };

  // 화면에 할 일을 표시하는 함수
  const getToDoList = (v) => {
    const { id, toDo, date } = v;

    // 새로운 할 일을 담을 div 엘리먼트 생성
    const div = document.createElement('div');
    div.id = id;
    div.className = 'toDo_list_item';

    // 체크박스 엘리먼트 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', () => toggleToDoList(id));
    div.append(checkbox);

    // 텍스트 표시 엘리먼트 생성
    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    textDiv.textContent = toDo;
    div.append(textDiv);

    // 날짜 표시 엘리먼트 생성
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = date;
    div.append(dateDiv);

    // 삭제 버튼 엘리먼트 생성
    // const deleteBtn = document.createElement('input');
    // deleteBtn.className = 'delete';
    // deleteBtn.type = 'button';
    // deleteBtn.value = '❌';
    // deleteBtn.addEventListener('click', () => deleteToDoList(id));
    // div.append(deleteBtn);

    // 할 일 목록 영역에 새로운 할 일 추가
    toDoList.append(div);
  };

  // 초기화 함수: 페이지 로딩 시 할 일 목록 불러오기, 이벤트 리스너 등록
  const init = () => {
    // 페이지 로딩 시 할 일 목록 불러오기
    loadToDoList();

    // 폼 제출 이벤트에 addToDoList 함수 등록
    form.addEventListener('submit', addToDoList);

    // 다중 삭제 버튼 클릭 이벤트에 deleteMultiToDoList 함수 등록
    toDoMultiDelete.addEventListener('click', deleteMultiToDoList);
  };

  // 초기화 함수 호출
  init();
})();
