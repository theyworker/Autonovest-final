App = {
  init: function() {
    // Load pets into the boxes
    $.getJSON('other/carsnew.json', function(data) {
      var petsRow = $('#carsRow');
      var carDisplayTemp = $('#carTemplate');
      for (i = 0; i < data.length; i ++) {
      if(data[i].ForSale){
        console.log(data[i].ForSale);
        carDisplayTemp.find('.panel-title').text(data[i].name);
        carDisplayTemp.find('img').attr('src', data[i].picture);
        carDisplayTemp.find('.car-Manufacturer').text(data[i].Manufacturer);
        carDisplayTemp.find('.car-yearofmanu').text(data[i].yearofmanu);
        carDisplayTemp.find('.car-EngineNumber').text(data[i].EngineNumber);
        carDisplayTemp.find('.btn-buy').attr('data-id', data[i].id);
        carDisplayTemp.find('.btn-md').attr('data-id', data[i].id);

        petsRow.append(carDisplayTemp.html());
      }
    }
    });

    return App.buttonevents();
  },

  buttonevents: function(){
    $(document).on('click', '.btn-md', App.mdevent);
    $(document).on('click', '.btn-buy', App.buyevent);
  },

  mdevent: function(event) {

    event.preventDefault();

    var carID = parseInt($(event.target).data('id'));
    window.location.href = "/car/"+carID;


  },

  buyevent: function(event) {

    event.preventDefault();

    var carID = parseInt($(event.target).data('id'));
    window.location.href = "/buy/"+carID;


  }
}

$(function() {
  $(window).load(function() {
    App.init();
console.log('Market js is running');
  });
});
