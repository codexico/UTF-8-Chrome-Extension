/*
    Created on : Mar 27, 2011
    Author     : codexico
    Description:
        popup initialization
*/
$(
$('article.tabs section > h1').click(function(){
    $('article.tabs section').removeClass('current');
    $(this).closest('section').addClass('current');
})
);