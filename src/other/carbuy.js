App = {
  init: function() {
  $(document).on('click', '.btn-purchase', App.buyevent);

  },

  buyevent: function(event) {

    event.preventDefault();
var amounttobuy = $('input:text').val();
var carid = $("#buyamount").attr("name");

  console.log(amounttobuy);

    console.log(carid);


  alert('Please confirm your purchase of'+amounttobuy+'Ether' );

        

  }
}

$(function() {
  App.init();
});
