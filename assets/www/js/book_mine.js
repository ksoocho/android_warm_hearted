var $totalCount = 0;

 jQuery.nl2br = function(varTest){
     return varTest.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
 };

//****************************************************************
//  나의 글모음 메인 페이지
//****************************************************************
function displayMineBook(book_id)
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

           $('#pgMineBookTitle').text(book_name);
           $('#pgMineBookDescr').html($.nl2br(book_descr));
           $('#pgMineBookUserName').text("엮은이 : "+user_name);

           if ( photo_id > 0 )
           {
                var v_book_photo = '<center>'+
                                    '<img src=http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPagePhotoView.php?photo_id=' +
                                    photo_id + ' width=290 /> ' +
                                    '</center>';

            } else {
                 var v_book_photo = '<center>'+
                                    '<img src=./img/our_story.jpg width=290 /> ' +
                                    '</center>';
            }

            $('#mine_book_photo').html(v_book_photo);

            $('#pgListBookTitle').text(book_name);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#mineBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  글모음 수정 페이지
//****************************************************************
function displayChangeBook(book_id)
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
               book_descr     = entry.book_descr;
           });

           $('#pgChangeBookTitle').val(book_name);
           $('#pgChangeBookDescr').text(book_descr);

            $("#changeBookMessage").html("");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#changeBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  글모음 수정처리
//****************************************************************
function saveChangeBook(book_id, book_name, book_descr)
{
    var dataString = 'book_id='+book_id+'&book_name='+book_name+'&book_descr='+book_descr;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/book/ajaxBookUpdate.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#changeBookMessage").html("<span style='color:#cc0000'>표지 변경 성공 </span>" );
           } else {
               $("#changeBookMessage").html("<span style='color:#cc0000'>표지 변경 실패 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#changeBookMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  나의 글모음 목록 리스트 (전체페이지수)
//****************************************************************
function setPageListTotal(book_id){

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
//  나의 글모음 목록 리스트 (현재페이지)
//****************************************************************
function setPageList(book_id, page){

    list_page = "";

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
               list_page = list_page + '<li><a href=#pageListChangeDetail?word_id='+entry.word_id +'&word_type='+entry.word_type+'> ' + v_page_title + '</a> </li>';
            });

        }
    });

     $("#book_page_list").html(list_page);
     $('#book_page_list').trigger('create');
     $('#book_page_list').listview('refresh');

}

//****************************************************************
//  나의 글모음 목록 리스트 (현재페이지 + PAGING NAVI)
//****************************************************************
function loadPageData(book_id, page){

    // Pagination
    var $cur_page = page;
    var $per_page = 50;

    // Total Count
    setPageListTotal(book_id);

    var $count = $totalCount;

    // Total Page
    var $no_of_paginations = Math.ceil($count / $per_page);

    // Page Set
    $('#pgSearchTotalPage').val($no_of_paginations);

    var pageDisplay = $cur_page + " / " + $no_of_paginations;

    $('#searchPageDisplay').text(pageDisplay);

    // Content for Data
    setPageList(book_id, page);

    // Message Clear
    $("#pgListMessage").html("");

}

//****************************************************************
//  상세 페이지 상단 ( 글번호, 글생각 ) 보여주기
//****************************************************************
function displayChangeList(book_id, word_type, word_id)
{
    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_id='+word_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageSelect.php",
        data: dataString,
        cache: false,
        dataType:'json',
        success: function(data) {

           $.each(data, function(index, entry) {
               page_title     = entry.page_title;
               page_no        = entry.page_no;
               post_script    = entry.post_script;
           });

           $('#pgListPageTitle').val(page_title);
           $('#pgListPageNo').val(page_no);
           $('#pgListPagePost').text(post_script);

           $('#pgListPageWordID').val(word_id);
           $('#pgListPageWordType').val(word_type);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#changeListMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  상세 페이지 하단 ( 글내용 ) 보여주기
//****************************************************************
function viewPageDetail(word_type, word_id) {

    var dataString = 'word_type='+word_type+'&word_id='+word_id;

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

             if (word_type=="STD") {
                 $('#detail_text').html($.nl2br(v_detail_content));
             } else {
                 $('#detail_text').html("");
             }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#viewDetailMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });
}
//****************************************************************
//  상세 페이지 저장처리 ( 글 제목, 페이지 번호, 글생각 )
//****************************************************************
function saveListPage(book_id, word_type, word_id, page_title, page_no, post_script)
{
    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_id='+word_id+'&page_title='+page_title+'&page_no='+page_no+'&post_script='+post_script;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageUpdate.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#pgListMessage").html("<span style='color:#cc0000'>페이지 변경 성공 </span>" );
           } else {
               $("#pgListMessage").html("<span style='color:#cc0000'>페이지 변경 실패 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#pgListMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  글모음에서 글제거
//****************************************************************
function deleteListPage(book_id, word_type, word_id)
{
    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_id='+word_id;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPageDelete.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#pgListMessage").html("<span style='color:#cc0000'>페이지 삭제 성공 </span>" );
           } else {
               $("#pgListMessage").html("<span style='color:#cc0000'>페이지 삭제 실패 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#pgListMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}

//****************************************************************
//  개인 글 저장하기
//****************************************************************
function savePerPage(book_id, word_type, word_title, word_content)
{
    var dataString = 'book_id='+book_id+'&word_type='+word_type+'&word_title='+word_title+'&word_content='+word_content;

    $.ajax({
        type: "POST",
        url: "http://ksoocho.cafe24.com/warm_heart/ajax/page/ajaxPerPageAdd.php",
        data: dataString,
        cache: false,
        success: function(data) {
           if (data > 0)
           {
               $("#PerPageMessage").html("<span style='color:#cc0000'>글 저장 성공 </span>" );
           } else {
               $("#PerPageMessage").html("<span style='color:#cc0000'>글 저장 실패 </span>" );
           }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#PerPageMessage").html("<span style='color:#cc0000'>Error : </span>"+ data );
        }
    });

}