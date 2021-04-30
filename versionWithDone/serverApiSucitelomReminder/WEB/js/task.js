

function complete(element){
    console.log("Ahoj");
    console.log(element);
    //console.log("http://localhost:3000/reminder.done?_id="+element.value)

    $.ajax({
        url:"http://localhost:3000/reminder/done?_id="+element.value,
        type:"patch",
        
        statusCode: {
            200: (result)=>{
                  location.reload();
            }
        }
        
        //200:(result)=>{
            //console.log("Task was completed");
            //location.reload();
        //}
    });

    //location.reload();
}


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
                        var text = name + " ("+date+") ";
                        text = text + "Priority: "+priority+ " price: " +price+"";
                        text = text + " Done: "+done;
                        
                        console.log(text);

                        var newElement = $("<div></div>").html(text);
                        var elementBR= $("<br/>")
                        //var tlacidlo= $("<button id=\"stlacene\">I have just done it</button>")
                        var tlacidlo= $("<button onClick=\"complete(this)\" value="+id+">I have just done it</button>")
                        var elementB= $("<hr>")
                        console.log("-----------");
                        console.log(text);
                        if(done === true){
                            $("#parrent").append(newElement, elementBR, elementB);
                        }else{
                            $("#parrent").append(newElement, elementBR, tlacidlo, elementB);
                        }
                        
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

















