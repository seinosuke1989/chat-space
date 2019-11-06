$(function(){

  function buildhtml(message){
    var addImage = message.image.url ? `<img class = "lower-message__image", src=${message.image.url}>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                    <div class="lower-message__image">
                    ${addImage}
                    </div>
                  </div>
                </div>`
      return html
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildhtml(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('エラー');
    });
  });
  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id');
    var url = 'api/messages'
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildhtml(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
    })
    .fail(function() {
      alert("自動更新に失敗しました")
    })
  };
  setInterval(reloadMessages, 5000);
});
