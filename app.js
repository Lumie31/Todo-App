$(document).ready(function () {

  var todos = [];

  function render() {
    $('.empty').empty();
    $('.item').empty();
    if (todos.length === 0) {

      var empty = $(`
<div class="empty">
  <p>Nothing to show here</p>
</div>
<hr>

</div>
`)
      $('.item').append(empty)

    } else {
      for (var i = 0; i < todos.length; i++) {
        var todoItem = $(
          `
  <div id=${todos[i].id} class="todo ${todos[i].completed ? 'completed' : '' }">
    <input class="item-box" type="checkbox" ${todos[i].completed ? 'checked' : ''}><span>${todos[i].activity}</span><i class="pull-right close">x</i>
  </div>
`)
        $('.item').append(todoItem)
      }
    }

    $('.count').html(todos.length + ' item' + (todos.length === 1 ? '' : 's'))
    addHover();
    $('.item-box').change(checkChange)
    $('.close').click(deleteTodo);
  }

  function checkChange() {
    var id = $(this).parent().attr('id');
    todos = todos.map(function (todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })
    render()
  }

  function deleteTodo(){
    var id = $(this).parent().attr('id')
    todos = todos.filter(function(todo) {
      return todo.id !== id;
    })
    render()
  }

  var todo1 = {
    activity: 'What to do',
    id: '0123',
    created: Date(),
    completed: false
  }

  var todo2 = {
    activity: 'Another thing to do',
    id: '0124',
    created: Date(),
    completed: true
  }


  $('#submittodo').click(function () {
    $('#todoform').submit()
  })

  $('#todoform').submit(function (e) {
    e.preventDefault();
    // console.log('Form Submitted!!!')
    var input = $('#todoinput').val();
    // console.log(input);
    if (!input) return

    var todoObj = {};
    todoObj.activity = input;
    todoObj.id = 'x' + (todos.length + 1);
    todoObj.created = Date();
    todoObj.completed = false;

    todos.unshift(todoObj);

    $('#todoinput').val('')

    render()
  })

  function addHover() {
    $('.todo').hover(function () {
      //   $(this).find('.close').css('visibility', 'visible')
      // }, function() {
      //   $(this).find('.close').css('visibility', 'hidden')
      $(this).find('.close').toggle();
    })
  }
  render()


})