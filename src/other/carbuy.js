App = {
  init: function() {
  $(document).on('click', '.btn-md', App.mdevent);

  },
  mdevent: function(event) {

    event.preventDefault();

    var carID = parseInt($(event.target).data('id'));
    window.location.href = "/car/"+carID;



  }
}

$(function() {
  App.init();
  console.log('working');
});
