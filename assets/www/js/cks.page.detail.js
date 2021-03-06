jQuery.nl2br = function(varTest){
    return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
};

<!-------------------------->
<!-- pageinit : ViewPage  -->
<!-------------------------->
$(document).bind('pagebeforechange', function(event, data) {
    $.mobile.pageData = ( data && data.options && data.options.pageData)
                       ? data.options.pageData : null;
});

 <!-------------------------->
 <!-- pageinit : ViewPage  -->
 <!-------------------------->
$(document).on('pageinit','#viewDetailPage', function() {
    displayDetailPage();
});

$(document).on('pagebeforeshow','#viewDetailPage', function(event, data) {

    if ($.mobile.pageData)
    {
       if ($.mobile.pageData.like_id)
       {
          localStorage.setItem("like_id",$.mobile.pageData.like_id);
       } else {
          localStorage.setItem("like_id",0);
       }

       localStorage.setItem("article_type", 'NONE');
       localStorage.setItem("article_detail_type",'NONE');
    }

    displayDetailPage();
});



function displayDetailPage() {

    var v_like_id = localStorage.getItem("like_id");
    var v_article_type = localStorage.getItem("article_type");
    var v_article_detail_type = localStorage.getItem("article_detail_type");

    var v_url = 'http://ksoocho.cafe24.com/warm_heart/cks_json/json_detail_view.php?like_id='+v_like_id+
                '&article_type='+v_article_type+
                '&article_detail_type='+v_article_detail_type;

    $.ajax({
        url: v_url,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
            $.each(data, function(i,item_detail){

             //------------------------
             // Photo Image
             //------------------------
             if (item_detail.photo_name) {
               var v_detail_photo = '<center>' + '<img src=http://ksoocho.cafe24.com/warm_heart/cks_jquery/jphoto_view.php?photo_id=' + item_detail.photo_id + ' width=290 /> ' + '</center><br>';
             } else {
               var v_detail_photo = '';
             }

             $('#view_detail_photo').html(v_detail_photo);

             //------------------------
             // Photo ID
             //------------------------
             var v_detail_id = item_detail.photo_id;
             $('#view_detail_id').val(v_detail_id);

             //------------------------
             // Title
             //------------------------
             var v_detail_title = item_detail.photo_title;
             $('#view_detail_title').html('<b>'+v_detail_title+'</b><br>');

             //------------------------
             // URL
             //------------------------
             if (item_detail.url_link) {
                 var v_detail_url = item_detail.url_link;
             } else {
               var v_detail_url = '';
             }

             $('#view_detail_url').html(v_detail_url+'<br>');

             //------------------------
             // Contents
             //------------------------
             var v_detail_content = item_detail.photo_content;
              $('#view_dtl_text').html($.nl2br(v_detail_content));

              $("#viewDetailMessage").html("" );

            });
        },
            error: function(){
                 $("#viewDetailMessage").html("<span style='color:#cc0000'>There was an error loading the data</span>" );
        }
    });

}

function saveFavoritePage(book_id, word_type, word_id)
{
    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_id='+word_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageInsert.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#viewDetailMessage").html("<span style='color:#cc0000'>스크랩 성공</span>" );
           } else {
               $("#viewDetailMessage").html("<span style='color:#cc0000'>스크랩 실패</span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#viewDetailMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}