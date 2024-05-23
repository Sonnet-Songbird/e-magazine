## 템플릿
### 테마
#### PaperAlbumDesktopTheme 
    - css 해석해서 페이지넘기는 부분까지 동적으로 작성 필요
    - contenteditable과 지금 방식으론 호환안됨
#### StPageFlipDesktopTheme
    - 고치든 버리든 하자...
## 기능
### 추상화
    - 레이지 로딩 기능을 포함한 이미지 로더
    - 가변 길이 테마 
    - 하위 컴포넌트 생성을 View.js가 아닌 별도의 클로저 스크립트로 정의하여 의존성 분리 

### 사양
    - 이미지 마그니파이어 ( 적용하려면 이미지 로딩하는 방식 자체를 바꿔야할듯?) Glass Magnifier, 클릭하면 돋보기 배율 변경 https://adamrisberg.github.io/react-image-magnifiers/ 2번
    - 프로필 기능 (모달로 떠야함. 프로필 레포지터리도 필요하겠다)
    - 책 펼치기 전 커버 왼쪽 공간에 탭 식으로 사용할 수 있는 메뉴페이지 하나? 프로필도 여기서 봐야겠지?
    - 콘텐츠 모델, 이미지 컨테이너
### 