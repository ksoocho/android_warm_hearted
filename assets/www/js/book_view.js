 jQuery.nl2br = function(varTest){
     return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
 };

//****************************************************************
//  글모음 전체 List
//****************************************************************
function viewBookList(){

     listBook = "";

     var dataString = "";

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookListAll.php",
        data: dataString,
        cache: false,
        dataType:'json',
        async: false,
        success: function(data) {
            $.each(data, function(index, entry) {
               listBook = listBook + '<li><a href=#pageBookMainPage?book_id='+entry.book_id+'>'
                                   + entry.book_name
                                   +' ('+entry.user_name+')'
                                   + '</a><span class=ui-li-count>'
                                   + entry.view_count
                                   +'</span></li>';
            });
        }
    });

      $("#book_list").html(listBook);
      $('#book_list').trigger('create');
      $('#book_list').listview('refresh');
}

//****************************************************************
//  즐겨찾기 글모음 LIST
//****************************************************************
function viewFavoriteBookList(user_id){

     listBook = "";

     var dataString = 'user_id='+user_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookListFavorite.php",
        data: dataString,
        cache: false,
        dataType:'json',
        async: false,
        success: function(data) {
            $.each(data, function(index, entry) {
               listBook = listBook + '<li><a href=#pageBookMainPage?book_id='+entry.book_id+'>' + entry.book_name +' ('+entry.user_name+')'+ '</a></li>';
            });
        }
    });

    $("#favorite_book_list").html(listBook);
    $('#favorite_book_list').trigger('create');
    $('#favorite_book_list').listview('refresh');
}

//****************************************************************
// 즐겨찾기 저장
//****************************************************************
function saveFavoriteBook(user_id, book_id)
{
    var dataString = 'user_id='+user_id+'&book_id='+book_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookSetFavorite.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#mainBookMessage").html("<span style='color:#cc0000'>즐겨찾기 성공 </span>" );
           } else {
               $("#mainBookMessage").html("<span style='color:#cc0000'>즐겨찾기 실패 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#mainBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });
}
//****************************************************************
// 즐겨찾기 저장 취소
//****************************************************************
function cancelFavoriteBook(user_id, book_id)
{
    var dataString = 'user_id='+user_id+'&book_id='+book_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookCancelFavorite.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#mainBookMessage").html("<span style='color:#cc0000'>즐겨찾기취소 성공 </span>" );
           } else {
               $("#mainBookMessage").html("<span style='color:#cc0000'>즐겨찾기취소 삭제 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#mainBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });
}

//****************************************************************
//  글모음 상세 보기
//****************************************************************
function displayMainBook(book_id)
{
    var dataString = 'book_id='+book_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookSelect.php",
        data: dataString,
        cache: false,
        dataType:'json',
        success: function(data) {

           $.each(data, function(index, entry) {
               book_id        = entry.book_id;
               book_name      = entry.book_name;
               book_descr     = entry.book_descr;
               user_name      = entry.user_name;
               view_count     = entry.view_count;
               photo_id       = entry.photo_id;
           });

           $('#pgMainBookTitle').text(book_name);
           $('#pgMainBookDescr').html($.nl2br(book_descr));
           $('#pgMainBookUserName').text("엮은이 : "+user_name);

           $('#pgMainBookID').val(book_id);
           $('#pgMainBookTitleVal').val(book_name);

           if ( photo_id > 0 )
           {
                var v_book_photo = '<center>'+
                                    '<img src=http://ksoocho.cafe24.com/warm_heart/cks_jquery/jphoto_view.php?photo_id=' +
                                    photo_id + ' width=290 /> ' +
                                    '</center>';

            } else {
                 var v_book_photo = '<center>'+
                                    '<img src=./img/our_story.jpg width=290 /> ' +
                                    '</center>';
            }

            $('#main_book_photo').html(v_book_photo);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#mineBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}
