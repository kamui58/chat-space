$(function(){

  var reloadMessages = function(){
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataTyoe: 'json'
    })
    .done(function(messages){

      if (messages.length !== 0) {
        console.log(messages)
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main__chatBox').append(insertHTML);
        $('.main__chatBox').animate({ scrollTop: $('.main__chatBox')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".main__footer__formBtn").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  function buildHTML(message){
    if (message.image) {
      var html =
    ` <div class="message" data-message:id=${message.id}>
        <div class="main__chatBox__user">
          <div class="main__chatBox__user__nickname">
            ${message.user_name}
          </div>
          <div class="main__chatBox__user__dayTime">
            ${message.date}
          </div>
        </div>
        <div class="main__chatBox__message">
          <p class="main__chatBox__message__body">
            ${message.body}
          </p>
        </div>
        <img class="main__chatBox__message__image" src=${message.image}>
      </div>`
      return html;
    } else {
      var html =
  ` <div class="message" data-message-id=${message.id}>
      <div class="main__chatBox__user">
        <div class="main__chatBox__user__nickname">
          ${message.user_name}
        </div>
        <div class="main__chatBox__user__dayTime">
          ${message.date}
        </div>
      </div>
      <div class="main__chatBox__message">
        <p class="main__chatBox__message__body">
          ${message.body}
        </p>
      </div>
    </div>`
    return html;
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $(".main__chatBox").append(html);
      $(".main__chatBox").animate({ scrollTop: $(".main__chatBox")[0].scrollHeight});
      $("form")[0].reset();

    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $(".main__footer__formBtn").prop( 'disabled', false );
    });
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});