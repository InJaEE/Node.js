function chgData(element){
    var userid = element.parentNode.parentNode.querySelector(".user-id").innerHTML;
    var username = element.parentNode.parentNode.querySelector(".user-name").innerHTML;
    document.querySelector("#id").value = userid;
    document.querySelector("#username").value = username;
}

function rmData(element){
    console.log(element);
    
    var id = element.parentNode.parentNode.querySelector(".user-id").innerHTML;
    if(confirm("정말 삭제하시겠습니까?")){
        document.querySelector("#rm-id").value = id;
        document.querySelector("#rmForm").submit();
        // location.href = "/rest?_method=delete&id="+id;
    }
    document.querySelector("#id").value = userid;
    document.querySelector("#username").value = username;
}