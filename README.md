# Project `FLEX`

<br>

## ✅ Summary

- 사용자가 구매하고 싶은 상품을 등록하고, 다른 사용자와 공유하는 기능을 제공하는 웹 서비스
- 댓글, 좋아요, 검색 등의 기능을 추가적으로 구현 예정

<br>

## 💻 Wireframe

| Main | Detail | 
| --- | --- |
| ![image](https://user-images.githubusercontent.com/104040502/236858809-08092f54-906f-410f-a0dc-04f0f0f972e9.png) | ![image](https://user-images.githubusercontent.com/104040502/236858859-85e5f504-109f-4ceb-be55-813749d36e1c.png) |

| Register | Modify | 
| --- | --- |
| ![image](https://user-images.githubusercontent.com/104040502/236858916-64f63e6f-186c-42d7-9dab-33aed79831de.png) | ![image](https://user-images.githubusercontent.com/104040502/236858998-a3825268-f535-4a22-8084-6140e4fcdbc1.png) |

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

