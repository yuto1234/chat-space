$(function(){
  $(".chat-group-form__input").on("keyup", function(){
    var input = $(this).val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(dataes){
        $("#user-search-result").empty();
        if (dataes.length !== 0){
          dataes.forEach(function(data){
            appendProduct(data);
          });
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません");
        }
      })
    .fail(function(){
      alert('error');
    });
  });
});