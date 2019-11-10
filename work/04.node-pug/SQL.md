# SQL(Structure Query Language) 문

<br>

## 1. 데이터 삽입
```sql
insert into users (userName, age, wdate) values ("홍길동", 28, "2019-11-03 10:20:11");
insert into users set userName="홍길만", age=25, wdate="2019-11-03 10:25:35";
```
## 2. 데이터 가져오기
```sql
/* SELECT (필드명, 필드명) FROM (테이블명); */
SELECT * FROM users;
```
### 3. 데이터 삭제하기
```sql
DELETE FROM users WHERE id=2;
DELETE FROM users WHERE id>200;
DELETE FROM users WHERE id>200 AND userName like '%길동%';

```
### 4. 데이터 수정하기
```sql
UPDATE users SET userName='홍길동', age='22' WHERE id=3;

```