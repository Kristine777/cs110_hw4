
const todolist = $('#todo-list');
    const search_text = $('#srch').val();
    
    const get_list = function(){
        const search_text = $('#srch').val();
        $('#todo-list').html('');
        $.ajax({
        url      : "/todos",
        type     : 'get',
        dataType : 'json',
        data     : {
            searchtext : search_text
        },
        success  : function(data) {
                data.items.forEach(function(todoItem){
                const li = $('<li>'+todoItem.message+'<input type="checkbox"><button class="delete" id='+todoItem.id+'>Delete</button></li>')
                const input = li.find('input');
                input.prop('checked', todoItem.completed);
                input.on('change', function(){
                    todoItem.completed = input.prop('checked');
                    $.ajax({
                     url         : "/todos/" + todoItem.id,
                     type        : 'put',
                      dataType    : 'json',
                      data        : JSON.stringify(todoItem),
                     contentType : "application/json; charset=utf-8",
                     success     : function(data) {
  
                      },
                      error       : function(data) {
                     alert('Error creating todo');
                      }
                 });

                });
                
                todolist.append(li);
            });},
        error    : function(data) {
            alert('Error searching');
        }
    });

};
$("#search").on('click', function(){
            get_list();
        });
    

$("#save").on('click', function(){
    const val = $('#txt').val();
    $('#txt').val(''); 

    $.ajax({
        url         : "/todos",
        type        : 'post',
        dataType    : 'json',
        data        : JSON.stringify({
            message   : val,
            completed : false
        }),
        contentType : "application/json; charset=utf-8",
        success     : function(data) {
           
           get_list(); 
            
        },
        error       : function(data) {
            alert('Error creating todo');
        }
    }); 

});

    get_list();
    
$(document).on('click','.delete',function(){
             $.ajax({
        url     : "/todos/" + $(this).prop('id') ,
        type    : 'delete',
        success : function(data) {
          location.reload();
          get_list();  // remove the rendering of that item from the UI
        },
        error   : function(data) {
            alert('Error deleting the item');
        }
    });
});

