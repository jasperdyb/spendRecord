$('.delete-button').click(function (e) {
  e.stopPropagation()
  const id = $(e.currentTarget).data('restaurant_id')
  $('#deletion').modal()
  $('#deletion-confirm').attr('action', `/record/${id}?_method=DELETE`)
})

$('#category-filter').change(function (e) {
  e.preventDefault()
  this.form.submit()
})

$({ Counter: 0 }).animate({
  Counter: $('#totalAmount').text()
}, {
  duration: 500,
  easing: 'swing',
  step: function () {
    $('#totalAmount').text(Math.ceil(this.Counter))
  }
})
