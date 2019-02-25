

//let token = localStorage.getItem("Bearer")

//alert user to use correct credentials;
function showEror(){

$('.login').on('submit', function(event){
	
	swal({
    title: 'Ops!',
    text: 'Please enter your correct credentials!',
    showConfirmButton: false
  });
});
}
$(showEror);

function login() {

$('.login').on('submit', function(event){
	event.preventDefault();
	const username = $('.username').val();
	$('.username').val('');
	const password = $('.password').val();
	   
    $('.password').val('');
        let data = { username, password }
        let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
       }
    };
       fetch('/api/auth/login', settings)
	      .then(response => {
	 	  if (response.ok){
		   	return response.json();
		 }
    	})
	    .then(responseJson => {
         //console.log('hello')
        localStorage.setItem("Bearer", responseJson.authToken);
		$(location).attr("href", "./home.html");
    	})
	    .catch(err => {
		console.log(err);
		
		showEror()  // show error message when user enters incorrect pass or userid;
				
	  });
	
	})
}
$(login)


function register() {
    $('.register').on('submit', function(event){
        event.preventDefault();
        const firstName = $('.firstName').val();
		console.log(firstName);
		$('.firstName').val('');
        const lastName =  $('.lastName').val();
		$('.lastName').val('');
        const username =  $('.username').val();
		$('.username').val('');
        const password =  $('.password').val();
		
		$('.password').val('');
        let data = { username, password, firstName, lastName  }
        let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
       }
    };
       fetch('/users', settings)
	      .then(response => {
	 	  if (response.ok){
            return response.json();
            JSalert(); //alert user if registration is successful.     
		 }
    	})
	    .then(responseJson => {
            $(location).attr("href", "./index.html");
    	})
	    .catch(err => {
		console.log(err);
		 alert('please check if fields filled correctly')
	});
    })
}

//alert if user successfuly registered or not;

function JSalert(){

$('.register').on('submit', function(event){
	
	swal({
    title: 'Congrats!',
    text: 'Your account is created!',
    timer: 4000,
    showConfirmButton: false
  });
});
}

$(JSalert);

function logout() {
	
	$('.logout').on('click', function(e){
	 e.preventDefault();
	 login();
     console.log('is this working')
	 let settings = {
        method: "get",
       // body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
	   }
	};

	fetch('/users/logout', settings)

	.then(response => {
		if (response.ok){
		 return response.json();
			 
	  }
	 })
	 .then(responseJson => {
		 $(location).attr("href", "./index.html");
	 })
	 .catch(err => {
	 console.log(err);
	 alert('please check if fields filled correctly')
	 }) 
	});
} 

$(register);
$(logout);


 




