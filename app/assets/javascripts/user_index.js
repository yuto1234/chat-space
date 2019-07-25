$(function(){
  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                </div>`

    search_result.append(html);
  }

  function appendNoUser(fail) {
    var html = `<p>
                  <div class="chat-group-user__name">${ fail }</p>
                </p>`

    search_result.append(html);
  }

  $(".chat-group-form__input").on("keyup", function(){
    var input = $(this).val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(user){
      $("#user-search-result").empty();
        if (user.length !== 0){
          user.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
      })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
});