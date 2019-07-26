$(function(){

  function buildHTML(message){
    var content = (message.content == "") ? ``:`<p class="message__post">${ message.content }</p>`;
    var image = (message.image == null) ? ``:`<img src='${ message.image }', class='lower-message__image'>`;

    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="message__info">
                    <div class="message__info--user-name">
                      ${ message.name }
                    </div>
                    <div class="message__info--post-time">
                      ${ message.created_at }
                    </div>
                  </div>
                <div class="message__post">
                  ${ content }
                  ${ image }
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-space__main').append(html);
      $('#new_message').get(0).reset();
      $('.chat-space__main').animate({ scrollTop: $('.chat-space__main')[0].scrollHeight});
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
    .always(function(){
      
    });
  });

  var interval = setInterval(function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      var href = "api/messages"
      $.ajax({
        url: href,
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var insertHTML = buildHTML(message)
          $('.chat-space__main').append(insertHTML)
          $('.chat-space__main').animate({scrollTop: $('.chat-space__main')[0].scrollHeight});
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval);
      }
  } , 5000 );
})

