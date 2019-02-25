let token = localStorage.getItem('Bearer')

function getAllactivites() {
 

let settings = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : "Bearer " + token
  }
};
fetch('/sports', settings)
    .then(response => {
        if (response.ok){
            return response.json(); 
        }
    })
    .then(responseJson => {
    display(responseJson)    
    })
    .catch(err => {
        console.log(err);
    });
}

//display activities on webpage
function display(responseJson) {
   
        for (let i = 0; i < responseJson.length; i++){
 
 $('table').append(`<tr>
         
   <td> <input class="id" type="text" value="${responseJson[i]._id}" readonly></td>       
   <td> <input class="activity" type="text" value="${responseJson[i].activity}" readonly> </td>
   <td> <input class="distance" type="text" value="${responseJson[i].distanceCovered}" readonly> </td>
   <td> <input class="time" type="text" value="${responseJson[i].timeElapsed}" readonly> </td>
   <td> <input class="location" type="text" value="${responseJson[i].location}" readonly> </td>
   <td> <input class="comment" type="text" value="${responseJson[i].comment}" readonly> </td>
   <td>
   <input type="button" class="edit_button1" value="Edit" class="edit">
   <input type="button" class="save_button1" value="Save" class="save">
   <input type="button" value="Delete" class="delete">
  </td>
  </tr>`);      
    }
} 


// Edit and save function when buttons clicked

function edit() {
$('table').on('click', '.edit_button1',function(e) {
    e.preventDefault();
	
	let button = $(this).closest('tr').find('.save_button1');
     $(button).toggle();
	
    let arrayOfInput = $(this).closest('tr').find('input');
    for ( let i = 0; i < arrayOfInput.length; i ++ ){
	  
      $(arrayOfInput[i]).prop("readonly", false);
	    } 
 });  
}



function save() {

  $('table').on('click', '.save_button1',function(e) {
    e.preventDefault();
	
	$('.save_button1').toggle();
    let arrayOfInput = $(this).closest('tr').find('input');
    for ( let i = 0; i < arrayOfInput.length; i ++ ){
     $(arrayOfInput[i]).prop("readonly", true);
   }
 
  });
}

$(save)
$(edit) 

// Deleting data from db and clear item from display;

function deleteItem() {
  $('table').on('click', '.delete', function(e) {
    e.preventDefault();
   
    edit();
   let id = $(this).closest('tr').find('.id').val();
    console.log(id)

   let settings = {
   method: "DELETE",
   headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
            }
     };
     
     fetch(`/sports/${id}`, settings)
      .then(response => {
     if (response.ok){
        alert('Item deleted successfuly')    
       }
    })
       .then(responseJson => {  
   $($(this).closest("tr")).remove();
  // location.reload(false);   
    
    })
       .catch(err => {
      console.log(err);
    }); 
            
   })
 } 
    
    //adding a new activity
    
    function addNewEntry() {
       
        $('.add').on('click', function(){
            event.preventDefault();
		
        const activity = $('#new_activity').val();
        $('#new_activity').val('');
        const distanceCovered = $('#new_distance').val();
		$('#new_distance').val('');
        const timeElapsed = $('#new_time').val()
        $('#new_time').val('')
        const location = $('#new_location').val()
        $('#new_location').val('')
        const comment = $('#new_comment').val()
        $('#new_comment').val('')
		 
    
        let data = {activity, distanceCovered, timeElapsed, location, comment}   
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
         pageload()
 
       //$('#show').append(`You successfully added new items`);
	
	   console.log(responseJson)
	   
         })
         .catch(err => {  
        // alert('Please make sure you entered required fields')
         console.log(err);
         
       });
        
      })
    } 
	
function pageloadOnedit() {
	$('table').on('click', '.save_button1', function(e){
		e.preventDefault();
		//update();
		console.log('working?')
		location.reload(false);	
		
	})
}

$(pageloadOnedit);
	
function pageload() {
	$('.add').on('click', function(e){
		e.preventDefault();
		//addNewEntry()
		location.reload(false);	
	})
}

$(pageload);

function update() {
  
  $('table').on('click', '.save_button1',function(e) {
    e.preventDefault();
   let token = localStorage.getItem('Bearer')
  
    //edit();
  
   let id = $(this).closest('tr').find('.id').val();
   let activity = $(this).closest('tr').find('.activity').val();
   
   let distanceCovered = $(this).closest('tr').find('.distance').val();
   let timeElapsed = $(this).closest('tr').find('.time').val();
   let location = $(this).closest('tr').find('.location').val(); 
   let comment = $(this).closest('tr').find('.comment').val(); 
     
    
   let data = {id, activity, distanceCovered, timeElapsed, location, comment};
   
    let settings = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
         "Authorization" : "Bearer " + token,
         "Content-Type": "application/json"
       }
      };
      fetch(`/sports/${id}`, settings)
           .then(response => {
            if (response.ok){
                return response.json();
			}
		   })
	    .then(responseJson => {
			
         pageloadOnedit()
        alert('updated successfully');
  
         
         })
         .catch(err => {  
         console.log(err);
       });	
	

  });
}

$(getAllactivites);
$(addNewEntry);
$(deleteItem);
$(update);