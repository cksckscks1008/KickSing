const chapters = [
  {
    title: '시작과 기본 문법',
    lessons: [
      '파이썬과 개발 환경',
      '파이썬 코드 실행하기',
      '주석과 들여쓰기',
      '변수와 값',
      '숫자형과 문자열',
      '기본 연산자',
      '문자열 다루기',
      'print()와 input()',
      '자료형 확인과 형 변환',
      'f-string으로 출력 꾸미기',
    ],
  },
  {
    title: '조건과 반복',
    lessons: [
      '불리언과 비교 연산자',
      'if 조건문',
      'elif와 else',
      'for 반복문',
      'range() 사용하기',
      'while 반복문',
      'break와 continue',
      '반복문 중첩',
      '간단한 패턴 만들기',
      '반복문으로 합계와 평균 구하기',
    ],
  },
  {
    title: '자료구조',
    lessons: [
      '리스트 만들기',
      '인덱스와 슬라이싱',
      '리스트 추가·삭제',
      '리스트 순회하기',
      '튜플',
      '딕셔너리',
      '집합',
      '자료구조 선택하기',
      '리스트 컴프리헨션',
      '정렬과 sorted()',
    ],
  },
  {
    title: '함수와 모듈',
    lessons: [
      '함수 정의와 호출',
      '매개변수와 인수',
      '반환값과 return',
      '기본값과 키워드 인수',
      '지역 변수와 전역 변수',
      '람다와 고차 함수',
      '모듈과 import',
      '표준 라이브러리',
      '패키지와 pip',
      '직접 모듈 만들기',
    ],
  },
  {
    title: '객체와 예외 처리',
    lessons: [
      '예외와 오류 읽기',
      'try와 except',
      'else와 finally',
      '직접 예외 발생시키기',
      '클래스와 객체',
      '속성과 메서드',
      '초기화 메서드',
      '상속과 오버라이딩',
      '클래스 변수와 인스턴스 변수',
      '사용자 정의 예외 만들기',
    ],
  },
  {
    title: '파일과 실전 활용',
    lessons: [
      '파일 열고 닫기',
      'with 문으로 파일 다루기',
      '텍스트 파일 읽고 쓰기',
      'JSON 데이터 다루기',
      '경로와 pathlib',
      '가상 환경 이해하기',
      '디버깅과 테스트 기초',
      '작은 프로그램 완성하기',
      'CSV 파일 읽고 쓰기',
      '명령줄 인수 처리하기',
    ],
  },
];

export const curriculum = chapters.map((chapter, chapterIndex) => ({
  id: `chapter-${chapterIndex + 1}`,
  number: String(chapterIndex + 1).padStart(2, '0'),
  title: chapter.title,
  lessons: chapter.lessons.map((title, lessonIndex) => ({
    id: `chapter-${chapterIndex + 1}-lesson-${lessonIndex + 1}`,
    title,
  })),
}));

export const roadmap = { title: '언어 학습 로드맵' };
