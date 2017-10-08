    $(document).ready(function() {

	    // Search Summit
		$("#submitSearch").click(function(){
	
			  var searchFormData = $("#searchForm").serialize();
			  
			  $.ajax({
				url: "http://ksoocho.cafe24.com/warm_heart/cks_json/json_top_list.php",
				type: 'GET',
				data: { sortType: 'FIND', searchString: $("#searchString").val() },
				cache: false,
				dataType: 'jsonp',
		        jsonp: 'jsoncallback', 
		        timeout: 5000,
				success: function(data, status){  
		            $('#searchList *').remove();			            	            
		            $.each(data, function(i,item_search){	
		            $('#searchList').append('<li><h6><a href=#viewPage?like_id='+ 
		                              item_search.photo_id +'> ' + 
		                              item_search.photo_title + '</h6></a>' +
						              '<span class=ui-li-count>' + item_search.like_count + '</span> </li>');
		
		             
		            });
		        },
		        error: function(){
		            output.text('There was an error loading the data.');
		        }
			  });
			  
			  return false;
    	});
	});

