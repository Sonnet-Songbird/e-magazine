# 탬플릿 

## 인터페이스
- View 컴포넌트에서 viewFunctions Ref 컬렉션을 상속 받아서 key로 사용.

  ### ["setTheme"] 
  - 테마 변경
  - @arg: idx(number)
  - @return: void
  - @Component: Viewer
  
  ### ["setPages"] 
  - 컨텐츠 변경
  - @arg: idx(number)
  - @return: void
  - @Component: Viewer
  
  ### ["setShowingIdx"] 
  - 컨텐츠의 시작 인덱스를 변경
  - @arg: idx(number)
  - @return: void
  - @Component: Viewer

  ### ["goTo"] 
  - 인덱스를 통한 이동
  - @arg: idx(number)
  - @return: void
  - @Component: util/PageFinder
    
  ### ["goToWithKey"] 
  - 문자열을 통한 이동
  - @arg: key(string)
  - @return: void
  - @Component: 
