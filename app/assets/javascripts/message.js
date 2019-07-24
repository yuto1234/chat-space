$(function(){

  function buildHTML(message){
    var content = (message.content == "") ? ``:`<p class="message__post">${ message.content }</p>`;
    var image = (message.image == null) ? ``:`<img src='${ message.image }', class='lower-message__image'>`;

    var html = `<div class="message">
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
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
    .always(function(){
      $('.input-form__submit').removeAttr('disabled');
    });
  });
});