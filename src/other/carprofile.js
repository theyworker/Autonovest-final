App = {
  init: function() {
  $(document).on('click', '.btn-purchase', App.buyevent);
  console.log($('input:text').val());
  },

  buyevent: function(event) {

    event.preventDefault();

console.log('Buy button was pressed');
  console.log($('input:text').val());

  }
}

$(function() {
  App.init();
});
