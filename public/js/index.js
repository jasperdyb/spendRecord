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