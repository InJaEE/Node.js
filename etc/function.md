# function
<br>

### 명시(선언)적 함수
* 함수 호출 : 함수이름();
* 명시적함수는 html문서가 실행될때 가장 먼저 실행된다.
```javascript
function 함수이름(){
    // 실행문
}
```

<br><br>

### 익명 함수  
* 함수 호출:변수이름();
* 익명함수는 html문서가 실행될때 위에서부터 순차적으로 실행된다.
```javascript
var 변수이름 = function(){
    // 실행문
}
```


<br>

*명시적함수가 익명함수보다 먼저 실행된다*

<br><br>

### 리턴함수
- 함수는 또 다른 함수를 반환할 수 있다.
- 리턴함수를 사용하려면 변수에 저장 후 사용한다.
```javascript
function funName(){
    return function(x){
        for(var i=1;i<10;i++){
            console.log(x+" * "+i+" = "+(x*i));
        }
    };
}
var returnFun = funName();
returnFun(5);
```

<br><br>

### 클로저
- 반환된 함수의 life-cycle이 종료될 때까지 호출된 함수의 life-cycle이 유지되는 것
```javascript
function funName(x){
    return function(){
        for(var i=1;i<10;i++){
            console.log(x+" * "+i+" = "+(x*i));
        }
    };
}
var returnFun = funName(5);
// 매개변수 5의 값이 그대로 전달되어 리턴함수가 실행된다.
returnFun();
```
<br><br>

### 내부함수
- 함수안에 또다른 함수
- 내부 함수이므로 외부에서는 호출 불가
- 함수명이 같아서 생기는 충돌을 방지하는 등 다른곳에서 사용하지 못하는 함수를 만들때 사용
```javascript
function outFun(width, height){
    console.log("triangle : "+triangle());
    console.log("quadrangle : "+quadrangle());

    function triangle(){
        return (width*height)/2;
    }
    function quadrangle(){
        return width*height;
    }
}
outFun(2, 6);
```
<br><br>

### 콜백함수
- 매개변수로 함수를 전달하고, 전달된 매개변수가 특정 시점에 호출되는 함수
```javascript
function funName(funcCBF, funCBP, num){
    for(var i=1;i<=10;i++){
        console.log(num+" * "+i+" = "+(num*i));
            if(i<10) funCBP(i);
    }
    funcCBF();
}

function funCallBackProgress(n){
    console.log((n*10)+"% 진행완료");
};

function funCallBackFinish(){
    console.log("서버 작업 종료");
};

funName(funCallBackFinish, funCallBackProgress, 7);
```
