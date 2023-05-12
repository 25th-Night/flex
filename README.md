# Project `FLEX`

<br>

## ⛳ Goals

- `Flask`를 이용한 간단한 CRUD 기능 구현
- `MongoDB` 사용법 및 ID Field 컨트롤 학습
- `Javascript`를 이용한 동적 화면 처리 및 `fetch` 함수를 이용한 비동기 API 호출 연습
- `AWS ElasticBeanstalk`을 이용한 클라우드 배포

<br>

## ✅ Summary

- 사용자가 구매하고 싶은 상품을 등록하고, 다른 사용자와 공유하는 기능을 제공하는 웹 서비스
- 댓글, 좋아요, 검색 등의 기능을 추가적으로 구현 예정

<br>

## 📑 Requirements

**[필수]**

1. **글쓰기 기능** : 유저는 내가 사고싶은 상품을 등록할 수 있습니다. 
2. **읽기 기능** : 유저가 등록한 상품의 목록을 보여줄 수 있습니다.
3. **더미데이터 생성** : 실제데이터가 존재하는 것처럼 게시물을 등록해두는 것
4. **배포** : ElasticBeanstalk을 통한 배포

[**선택]** 

- **수정**  : 유저가 등록한 게시물에 대한 내용을 수정할 수 있습니다.
- **삭제** : 유저는 자신이 등록한 게시물을 삭제할 수 있습니다.
- **댓글** : 유저는 게시물에 댓글을 게시할 수 있습니다.
- **댓글 수정, 삭제** : 유저는 댓글을 수정하거나 삭제할 수 있습니다.
- **리스트** : 페이지네이션 기능을 통해서 목록을 만들 수 있습니다.
- **카테고리** : 상품에 따라 카테고라이징을 해보세요.
    - 옷, 전자제품, 가구, 키친, 잡화 등


| Main | Detail | 
| --- | --- |
| **HTML** | Template 구성 | 
| **CSS** | 화면 스타일 적용 | 
| **Javascript** | 동적인 화면 처리 | 
| **Python** | 백엔드 작성 언어 | 
| **Flask** | API 구성 | 
| **MongoDB** | Database | 
| **AWS ElasticBeanstalk** | 클라우드 배포 | 

<br>

## 💻 Wireframe

| Main | Detail | 
| --- | --- |
| ![image](https://github.com/25th-Night/flex/assets/104040502/74bd8294-cac8-4993-bec7-0a483bffc5b1) | ![image](https://github.com/25th-Night/flex/assets/104040502/6a0d95ff-1740-40e2-8e37-9bc0ad6b7a1e) |

| Register | Modify | 
| --- | --- |
| ![image](https://github.com/25th-Night/flex/assets/104040502/5a9b3105-85e9-4de0-af02-a9b6baad44f0) | ![image](https://github.com/25th-Night/flex/assets/104040502/7b796d48-b9d9-4fab-a90c-1445ed2dd272) |

<br>

## 💭 Database

### MongoDB

- Schema-less 구조
    - 다양한 형태의 데이터 저장 가능
    - 데이터 모델의 유연한 변화 가능 (데이터 모델 변경, 필드 확장 용이)
- Read/Write 성능이 뛰어남
- JSON 구조 : 데이터를 직관적으로 이해 가능
- 사용 방법이 쉽고, 개발이 편리함

| `ref` : ****[[MongoDB] MongoDB 장점/단점](https://tychejin.tistory.com/349)****

<br>

### Table Info

- 사용자 관리 기능을 구현하지 않기 때문에 `Product` 단일 테이블을 사용 예정
- **`Product` Table Details**
    
    
    | Attribute | Field Name | Data Type | Identifier |
    | --- | --- | --- | --- |
    | 아이디 | id | int | PK |
    | 사용자 | user | text |  |
    | 상품명 | name | text |  |
    | 가격 | price | int |  |
    | URL | url | text |  |
    | 카테고리 | category | int |  |
    | 상세내용 | description | text |  |

<br>

## 📝 API Statement

![image](https://user-images.githubusercontent.com/104040502/236858547-3aaa1bbe-b696-4e04-85ec-8ca208b80482.png)

<br>

## 📽 기능 동작 화면

| 01. 사이트 접속 & 페이징 | 02. 카테고리별 조회 | 
| --- | --- |
| ![01  사이트 접속](https://github.com/25th-Night/flex/assets/104040502/6335b9e6-f238-48de-812d-a806f837f443) | ![02  카테고리별 조회](https://github.com/25th-Night/flex/assets/104040502/956c5483-79f6-42ae-841d-073a692dd547) |

| 03. 상품 상세정보 조회 | 04. 상품 정보 등록 | 
| --- | --- |
| ![03  상품 상세정보 조회](https://github.com/25th-Night/flex/assets/104040502/fb3778c4-24f6-45b9-9c82-f99c60e2b053) | ![04  상품 정보 등록](https://github.com/25th-Night/flex/assets/104040502/e19d8c77-725c-45cd-96d2-918ba7e73dce) |

| 05. 상품 정보 수정 | 06. 상품 정보 삭제 | 
| --- | --- |
| ![05  상품 정보 수정](https://github.com/25th-Night/flex/assets/104040502/da35747a-ebf3-40e8-9170-4aaf64577340) | ![06  상품 정보 삭제](https://github.com/25th-Night/flex/assets/104040502/0a4c7a59-79fb-4ca7-92d1-6702431cffcc) |
