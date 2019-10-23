# ES6 Syntax

### let
- 지역변수

<br>

### const
- 상수
- 선언과 할당을 동시에 해야한다.

<br>

### Arrow Function
- 항상 익명함수이다.
- 생성자를 사용할 수 없다.
```js
// ES5
var test = function(str){
    console.log(str)
}
// ES6
var test = (str)=>{
    console.log(str);
}
```
- 리턴 값을 가지고 있는 한 줄 함수 축약법
```js
// ES5
var arrow = function(str){
    return str+str;
} 

// ES6
var arrow = str => str+str;
```

<br>

### Template literal
- 문자열과 자바스크립트 표현식을 함께 사용하기 좋다.
```js
// ES5
var name = "백인재";
var introduce = "안녕하세요 "+name+"라고 합니다.";

// ES6
const name = "백인재";
var introduce = `안녕하세요 ${name}라고 합니다.`;
```

<br>

### 비구조화 할당
- 객체 안의 필드를 손쉽게 꺼내여 변수로 대입할 수 있다.
```js
// ES5
var person = {
    name : "백인재",
    job : "developer",
    family : ["mother", "father", "brother"]
}
var name = person.name;
var job = person.job;

// ES6
var person = {
    name : "백인재",
    job : "developer",
    family : ["mother", "father", "brother"]
}
var {name, job, family} = person;
```

<br>

### Enhanced object literals
- key:value 형태가 아닌 변수명만 작성해주면 변수명과 동일한 변수값이 대입된다.
```js
// ES5
var name = "백인재";
var job = "developer";
var info = {
    name : name,
    job : job
}

// ES6
const name = "백인재";
const job = "developer";
var info = {
    name, job
}
```

<br>

### Class
- class와 constructor 선언이 가능해졌지만 내부적으로는 ES5의 짝퉁객체와 동일한 구조
```js
// ES5(짝퉁객체)
var Sample=(function(){
    // 생성자. 객체명과 똑같이 쓴다.
    this.firstName;
    this.lastName;
    function Sample(firstName, lastName){
        this.firstName=firstName;
        this.lastName=lastName;
    }
    // 메서드
    Sample.prototype.fullName=function(){
        console.log(this.firstName+this.lastName);  
    }
    return Sample;
})(); // IIFE 즉시실행
var hong=new Sample("홍", "길동");
hong.fullName();

// ES6
class Sample{
    constructor(age, name){
        this.age=age;
        this.name=name;
    }
    speak(){
        console.log(`${this.name}은(는) ${this.age}살 입니다.`);
    }
}
const hong2=new Sample(27, "백인재");
hong2.speak();
```

<br>

### Default Parameter
- parameter의 기본값을 설정할 수 있다.
```js
// ES5
function paramTest(a, b, c){
    console.log(a, b, c);
}
paramTest("백", "인", "재");

// ES6
function paramTest(a, b="인", c="재"){
    console.log(a, b, c);
}
paramTest("백");
```