function validateLogin(usercode, password){

	if(usercode == '' || usercode == null){
		$("#errorLogin").html("<span style='color:#cc0000'>Error:</span> Must provide a User ID");
		$("#b_usercode").focus();
		return false;
	}
	if(password == '' || password == null){
		$("#errorLogin").html("<span style='color:#cc0000'>Error:</span> Must provide a password");
		$("#b_password").focus();
		return false;
	}
	return true;
}

function check_login( usercode, password ){

    var userId = 0;
	var userName = "";
	var returnCode = "";

	var dataString = 'usercode='+usercode+'&password='+password;

	$.ajax({
	type: "POST",
	url: "http://ksoocho.cafe24.com/warm_heart/ajax/user/ajaxUserLogin.php",
	data: dataString,
	cache: false,
	dataType:"JSON",
	success: function(data){

			$.each(data, function(index, entry) {
				user_id = entry.user_id;
				user_name = entry.user_name;
				book_id   = entry.book_id;
				returnCode = entry.return_code;
			});

			if (returnCode == "S"){

				$.session.set('user_id' , user_id);
				$.session.set('book_id' , book_id);
				$.session.set('user_name' , user_name);

				localStorage.setItem('user_id'   , user_id);
				localStorage.setItem('book_id'   , book_id);
				localStorage.setItem('user_name' , user_name);

				$("#errorLogin").html("<span style='color:#cc0000'>로그인 성공</span> ");

			} else {

				$.session.clear();
				$("#errorLogin").html("<span style='color:#cc0000'>로그인 실패</span>");
			}
		}
	});

}