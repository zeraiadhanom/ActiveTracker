let token = localStorage.getItem('Bearer')

function deleteItem() {
    $('.delete').on('submit', function(event){
        event.preventDefault();
        let settings = {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
                }
              };
            fetch('/sports/id', settings)
              .then(response => {
               if (response.ok){
                   return response.json();
                   console.log(responseJson);
             }
            })
            .then(responseJson => {
             console.log(responseJson);
            })
            .catch(err => {
            console.log(err);
        }); 
            
        })
    }
    
    //adding a new activity
    
    function addNewEntry() {
       
        $('.add').on('submit', function(){
            event.preventDefault();
        //const username = username;
        const id = username._id;
        const activity = $('.activity').val();
        const distance = $('.distance').val()
        const time = $('.time').val()
        const location = $('.location').val()
        const content = $('.note').val()
        console.log(content);
    
        let data = {activity, distanceCovered, timeElapsed, location, content}
        let settings = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
           "Authorization" : "Bearer " + token,
           "Content-Type": "application/json"
           }
    
        };
        fetch('/sports/create', settings)
           .then(response => {
            if (response.ok){
                return response.json();
          }
         })
         .then(responseJson => {
          //console.log('hello')
         localStorage.setItem("Bearer", responseJson.authToken);
         //$(location).attr("href", "./home.html");
            alert('you have successfuly added a new items')
         })
         .catch(err => {  
         console.log(err);
       });
        
      })
    } 

function update() {
$('update').on('submit', function(){
	event.preventDefault();
	tobeDeleted = $('.delete').val();
	let data = { tobeDeleted}
	let settings = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
           "Authorization" : "Bearer " + token,
           "Content-Type": "application/json"
         }
       };
		fetch('/sports/id', settings)
           .then(response => {
            if (response.ok){
                return response.json();
			}
		   })
	    .then(responseJson => {
          //console.log('hello')
         localStorage.setItem("Bearer", responseJson.authToken);
         //$(location).attr("href", "./home.html");
            alert('you have successfuly added a new items')
         })
         .catch(err => {  
         console.log(err);
       });	
	
})
}	
   $(update)
   $(addNewEntry);
   $(getAllactivites);