App = {
  init: function() {

var totalamount;
var disamount;
var timeamount;
$('#dist').keyup(function(){
disamount = $(this).val()*0.02;

if(isNaN(timeamount)){
  totalamount = disamount;
}
else {
  totalamount = disamount + timeamount;
}

  $('#calcdis').text(totalamount);
})

$('#time').keyup(function(){
  timeamount = $(this).val()*0.01;
  if(isNaN(disamount)){
    totalamount = timeamount;
  }
  else {
    totalamount = disamount + timeamount;
  }
  $('#calcdis').text(totalamount);
})

  },



}

$(function() {
      App.init();

});
