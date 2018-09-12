App = {
  init: function() {
    // Load pets into the boxes
    $.getJSON('other/carsnew.json', function(data) {
      var petsRow = $('#carsRow');
      var carDisplayTemp = $('#carTemplate');
      for (i = 0; i < data.length; i ++) {

        carDisplayTemp.find('.panel-title').text(data[i].name);
        carDisplayTemp.find('img').attr('src', data[i].picture);
        carDisplayTemp.find('.car-Manufacturer').text(data[i].Manufacturer);
        var salests;
        if(data[i].ForSale){
          salests = "On Sale";
        }
        else {
          salests =  "SOLD";
        }
        carDisplayTemp.find('.car-sts').text(salests);
        carDisplayTemp.find('.car-EngineNumber').text(data[i].EngineNumber);
        carDisplayTemp.find('.btn-buy').attr('data-id', data[i].id);
        carDisplayTemp.find('.btn-md').attr('data-id', data[i].id);



        petsRow.append(carDisplayTemp.html());

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


  },


}

$(function() {
  $(window).load(function() {
    App.init();

  });
});
