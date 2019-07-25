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

  function appendMember(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ id }'>
                  <p class='chat-group-user__name chat-group-user__name2'>${ name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.chat-group-users').append(html);
  }

  $("#user-search-field").on("keyup", function(){
    var input = $(this).val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(user){
      search_result.empty();
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

  search_result.on('click', '.user-search-add', function(){
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    $(this).parent().remove();
    appendMember(name, id);
  });

  $('.chat-group-users').on('click', '.user-search-remove', function(){
     $(this).parent().remove();
  });
});