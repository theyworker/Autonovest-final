App = {
  init: function() {
    // Load pets into the boxes
    $.getJSON('other/cars.json', function(data) {
      var petsRow = $('#carsRow');
      var petTemplate = $('#carTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.car-Manufacturer').text(data[i].Manufacturer);
        petTemplate.find('.car-yearofmanu').text(data[i].yearofmanu);
        petTemplate.find('.car-EngineNumber').text(data[i].EngineNumber);
        petTemplate.find('.btn-buy').attr('data-id', data[i].id);
        petTemplate.find('.btn-md').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.buttonevents();
  },

  buttonevents: function(){
    $(document).on('click', '.btn-md', App.mdevent);
  },

  mdevent: function(event) {

    event.preventDefault();

    var carID = parseInt($(event.target).data('id'));
    window.location.href = "/car/"+carID;


  }
}

$(function() {
  $(window).load(function() {
    App.init();

  });
});
