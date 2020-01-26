$(function(){

  function buildHTML(message){
    if (message.image) {
      var html =
      ` <div class="main__chatBox__user">
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
        <img class="main__chatBox__message__image" src=${message.image}>`
      return html;
    } else {
      var html =
      `<div class="main__chatBox__user">
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
});