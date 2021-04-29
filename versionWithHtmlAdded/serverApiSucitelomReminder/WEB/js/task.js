
//$(document).ready( ()=>{});

//skrateny zapis

$(()=>{
        console.log("Hello");

        $.ajax({
            url:"http://localhost:3000/skusanie",
            type:"get",
            statusCode:{
                200: (result)=>{console.log(result);

                    for(let i = 0; i < result.length; i++){
                        //console.log(result[i].Name);
                        const id = result[i]._id;
                        const name = result[i].Name;
                        const priority = result[i].Priority;
                        const date = result[i].Date;
                        const done = result[i].Done;
                        const price = result[i].Price;
                            //console.log(result[i].Name);
                        var text = name + " ("+date+") <br>";
                        text = text + "Priority: "+priority+ " price: " +price+" <br>";
                        text = text + "Done: "+done;
                        console.log(text);
                    }
                },
                400: (err)=>{console.log(err)},
                404: (err)=>{console.log("Wrong url")},

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

















