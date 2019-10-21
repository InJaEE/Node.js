# Object

- 객체에 소속된 함수는 메서드
- 객체에 소속된 변수는 프로퍼티

<br>

- 객체 생성
```javascript
var appSample = {
    "backend":"node",
    "frontend":"vue",
    atlanta:function(){
        console.log("hello atlanta");
    },
    orlando:function(){
        console.log("hello orlando"); 
};
appSample.sam = "choji";
appSample["Mon Tue Wen"] = "tobi";

console.log(appSample.backend); // node
console.log(appSample.frontend); // vue
console.log(appSample.sam); // choji
console.log(appSample["Mon Tue Wen"]); // tobi
```

<br>

- 객체의 키, 밸류 값 출력
```javascript
for(var key in appSample){
    console.log(key+" / "+appSample[key]);
    // backend / node
    // frontend / vue
    // sam / choji
    // Mon Tue Wen / tobi
}
```

<br>

- 함수를 정의하는 방법(모두 같은 의미)
```javascript
appSample.airplane = function(){}

var airplane = function(){}

function airplane(){}
```

<br>

- this를 사용한 객체 활용
```javascript
appSample.airplane = function(){
    for(var key in this){
        console.log(key+" / "+this[key]);
    }
}
appSample.airplane();
```
