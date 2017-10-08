 jQuery.nl2br = function(varTest){
     return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
 };

//****************************************************************
//  글모음 LIST TOTAL ( Paging 구현 목적)
//****************************************************************
function setDetailListTotal(book_id){

    var dataString = 'book_id='+book_id;

    $.ajax({
            type: "POST",
            url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageListTotal.php",
            data: dataString,
            cache: false,
            async: false,
            success: function(data) {
               $totalCount = data;
            }
        });
}

//****************************************************************
//  글모음 LIST ( 현재 PAGE )
//****************************************************************
function setDetailList(book_id, page){

    listBookPage = "";

    var dataString = 'book_id='+book_id+'&page='+page;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageList.php",
        data: dataString,
        cache: false,
        dataType:'json',
        async: false,
        success: function(data) {

            $.each(data, function(index, entry) {

              if ( entry.word_type == "STD") {
                   v_page_title = entry.page_title;
               } else {
                   v_page_title = '* '+entry.page_title;
               }
               listBookPage = listBookPage
                              + '<li><a href=#pageViewPageDetail?'
                              + 'word_id='+entry.word_id
                              + '&word_type='+entry.word_type
                              + '&word_title='+entry.page_title
                              +'> '
                              + v_page_title + '</a> </li>';
            });
        }
    });

   $("#book_page_list").html(listBookPage);
   $('#book_page_list').trigger('create');
   $('#book_page_list').listview('refresh');
}

//****************************************************************
//  페이지 LIST 보여주기 ( 현재 페이지 + PAGING NAVI )
//****************************************************************
function loadDetailPage(book_id, page){

    // Pagination
    var $cur_page = page;
    var $per_page = 50;

    // Total Count
    setDetailListTotal(book_id);

    var $count = $totalCount;

    // Total Page
    var $no_of_paginations = Math.ceil($count / $per_page);

    // Page Set
    $('#pgDetailTotalPage').val($no_of_paginations);

    var pageDisplay = $cur_page + " / " + $no_of_paginations;

    $('#detailPageDisplay').text(pageDisplay);

    // Content for Data
    setDetailList(book_id, page);

}

//****************************************************************
//  상세 페이지 내용 보여주기
//****************************************************************
function viewPageDetail(book_id, word_type, word_id) {

    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_id='+word_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxDetailView.php",
        data: dataString,
        cache: false,
        dataType:'json',
        success: function(data) {
           $.each(data, function(index, entry) {
               photo_title    = entry.photo_title;
               photo_name     = entry.photo_name;
               url_link       = entry.url_link;
               photo_content  = entry.photo_content;
               word_id_prev   = entry.word_id_prev;
               word_id_next   = entry.word_id_next;
           });

             // Photo Image
             if (photo_name) {
               var v_detail_photo = '<center>'+
                                 '<img src=http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPagePhotoView.php?photo_id=' +
                                 word_id + ' width=290 /> ' +
                                 '</center><br>';

             } else {
               var v_detail_photo = '';
             }

             $('#detail_photo').html(v_detail_photo);

             // Title
             $('#detail_title').html('<b>'+photo_title+'</b><br>');

             // URL
             if (url_link) {
                 var v_detail_url = url_link;
             } else {
               var v_detail_url = '';
             }

             $('#detail_url').html(v_detail_url+'<br>');

             // Contents
             var v_detail_content = photo_content;
             $('#detail_text').html($.nl2br(v_detail_content));

             $('#detail_word_id').val(word_id);
             $('#detail_word_type').val(word_type);

             $('#prev_word_id').val(word_id_prev);
             $('#next_word_id').val(word_id_next);

             // Message
              $("#viewDetailMessage").html(" ");

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#viewDetailMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });
}

//****************************************************************
//  페이지 스크랩
//****************************************************************
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
               $("#viewDetailMessage").html("<span style='color:#cc0000'>Scrap - Success </span>" );
           } else {
               $("#viewDetailMessage").html("<span style='color:#cc0000'>Scrap - Fail </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#viewDetailMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  글모음 상세 보기
//****************************************************************
function displayBookName(book_id)
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
               book_name      = entry.book_name;
           });

           $('#pgDetailBookTitle').text(book_name);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#viewDetailMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}
