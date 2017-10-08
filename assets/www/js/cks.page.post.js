 jQuery.nl2br = function(varTest){
     return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
 };


<!-------------------------->
<!-- pageinit : PostPage  -->
<!-------------------------->
$(document).on('pageinit','#postPage', function() {
	getPostList();
});

function getPostList() {

	$.ajax({
		url: 'http://ksoocho.cafe24.com/warm_heart/cks_json/json_post_list.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			$.each(data, function(i,item_post){

			var v_post_content = item_post.post_content;

			$('#postList').append('<li><h2> ' + item_post.post_title+' </h2> '+
								  $.nl2br(v_post_content) +
								  ' <p> ' +
								  item_post.post_date +
								  ' </p></li>');


			});
		},
		error: function(){
			output.text('There was an error loading the data.');
		}
	});

}

<!-------------------------->
<!-- postPage -->
<!-------------------------->
function resetTextFields()
{
	$("#postTitle").val("");
	$("#postContent").val("");
}

function reloadPage()
{
	location.reload();
}

function onSuccess(data, status)
{
	resetTextFields();
	// Notify the user the new post was saved
	data = $.trim(data);
	if(data == "SUCCESS")
	{
		$("#notification").css("background-color", "#ffff00");
		$("#notification").text("글 남기기 - 성공");
	}
	else
	{
		$("#notification").css("background-color", "#ff0000");
		$("#notification").text(data);
	}
}

$(document).ready(function() {

  // New Post Summit
	$("#postsubmit").click(function(){

		var formData = $("#newPostForm").serialize();

		$.ajax({
			url: "http://ksoocho.cafe24.com/warm_heart/cks_jquery/newpost.php",
			type: "POST",
			cache: false,
			data: formData,
			success: onSuccess
		});

		return false;
	});


	$("#cancel").click(function(){
		resetTextFields();
	});

	$("#refresh_post").click(function(){
		location.reload();
	});

	$("#post_reload").click(function(){
		location.reload();
	});

	//------------------------------------------------------------
	//  Back Button
	//------------------------------------------------------------
	$("#postcancel").click(function(){
	   parent.history.back();
	   return false;
	});

});


