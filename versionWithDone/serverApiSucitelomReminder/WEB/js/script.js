
const btn = document.getElementById("addTask");

btn.addEventListener("click", ()=>{
    console.log("skuska");
    const Name = document.getElementById("taskName").value;
    const Priority = parseInt(document.getElementById("priority").value);
    const Price = parseFloat(document.getElementById("price").value);
    
    //console.log(Name);
    //console.log(Priority);
    //console.log(Price);

    let object = {};

    if(Price>0){
        object = {Name, Priority, Price};
    }else{
        object = {Name, Priority};
    }

    //console.log(object);
    $.ajax({
        url:"http://localhost:3000/skusanie/insert",
        type:"post",
        dataType:"json",
        //contentType:"application/json",
        data:object,
        success: (result)=>{
            console.log(result);
        },
        error: (err)=>{
            console.log("Error: ", err);
        }
    })
    
});






