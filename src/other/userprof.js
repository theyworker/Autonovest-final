App = {
  init: function() {

console.log($('#verified').text());
    if($('#verified').text() == "Verified"){
          $('#verifypic').attr("src","../Verify.png");
          $('#unverifiedwarning').hide();
    }
    else {
        $('#verifypic').attr("src","../Not-Verified.png");

    }

    return App.buttonevents();
  },

  buttonevents: function(){
    $(document).on('click', '.btn-verify', App.verifypage);
  },

  verifypage: function(event) {

    event.preventDefault();

window.location.href = "/newuser";


  }
}

$(function() {

    App.init();

});
