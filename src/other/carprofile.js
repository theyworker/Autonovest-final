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

            // $.ajax({
            //   url:"buythecar",
            //   method: "POST",
            //   data:{
            //     car: carid,
            //     amount : amounttobuy
            //   },
            //   dataType:"JSON",
            //   success: function(data){
            //     console.log('Posted');
            //   },
            //   error: function(xhr, ajaxOptions, thrownError){
            //     alert(xhr.responseText);
            //     alert(thrownError);
            //     alert("Hold on to Ctrl + Shift + i to check error!");
            //
            //   }
            // })

  }
}

$(function() {
  App.init();
});
