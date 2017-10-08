//****************************************************************
//  User Register
//****************************************************************
function doUserRegister(user_code, user_name, user_pwd, user_confirm_pwd)
{
	var dataString = 'user_code='+user_code+'&user_name='+user_name+'&user_pwd='+user_pwd+'&user_confirm_pwd='+user_confirm_pwd;

	$.ajax({
		type: "POST",
		url: "http://ksoocho.cafe24.com/warm_heart/ajax/user/ajaxUserInsert.php",
		data: dataString,
		cache: false,
		dataType:'json',
		success: function(data) {

               var user_id        = 0;
			   var book_id        = 0;
			   var return_code    = '';
			   var error_message  = '';

              $.each(data, function(index, entry) {
				   user_id        = entry.user_id;
				   book_id        = entry.book_id;
				   return_code    = entry.return_code;
				   error_message  = entry.error_message;
			   });

			  if(return_code == 'S')
			  {
				$.session.set('user_id' , user_id);
				$.session.set('book_id' , book_id);
				$.session.set('user_name' , user_name);

				localStorage.setItem('user_id'   , user_id);
				localStorage.setItem('book_id'   , book_id);
				localStorage.setItem('user_name' , user_name);

				$("#registerError").html("<span style='color:#cc0000'>Success : </span>"+ error_message );
			  } else {
				$("#registerError").html("<span style='color:#cc0000'>Error : </span>"+ error_message );
			  }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#registerError").html("<span style='color:#cc0000'>Error : System Error</span>"+textStatus+"-"+errorThrown );
		}
	});

}
