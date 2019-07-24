$(function(){

  function buildHTML(message){
    var html = `<div class="message">
                <div class="message__info">
                <div class="message__info--user-name">
                ${ message.name }
                </div>
                <div class="message__info--post-time">
                ${ message.created_at }
                </div>
                </div>
                <div class="message__post">`
                if (message.content != ""){
                  html += `<p class="message__post">${ message.content }</p>`
                }
                if (message.image != null){
                  html += `<img src='${ message.image }', class='lower-message__image'>`
                }

                html += '</div>'
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
      $('.chat-space__main').append(html)
      $('.input-form__box').val('')
    })
  })
})