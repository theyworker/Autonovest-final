App = {
  init: function() {

console.log($('#verified').text());
    if($('#verified').text() == "Verified"){
          $('#verifypic').attr("src","../Verify.png");
          $('#unverifiedwarning').hide();
    }
    else{
        $('#verifypic').attr("src","../Not-Verified.png");
        $('#claim').hide();
    }

    return App.buttonevents();
  },

  buttonevents: function(){
    $(document).on('click', '.btn-verify', App.verifypage);
    $(document).on('click', '.btn-claim', App.claim);
  },

  claim : function(event){
    window.location.href = "/claim"
  },

  verifypage: function(event) {

    event.preventDefault();

window.location.href = "/newuser";


  }
}

$(function() {

    App.init();

});
