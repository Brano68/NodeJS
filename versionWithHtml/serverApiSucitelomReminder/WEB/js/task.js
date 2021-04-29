
//$(document).ready( ()=>{});

//skrateny zapis

$(()=>{
        console.log("Hello");

        $.ajax({
            url:"http://localhost:3000/skusanie",
            type:"get",
            statusCode:{
                200: (result)=>{console.log(result);},
                400: (err)=>{console.log(err)}
            },
            /*
            success: (result)=>{
                console.log(result);
            },
            error: (err)=>{
                console.log("Error: ", err);
            }
            */
        })
});

















