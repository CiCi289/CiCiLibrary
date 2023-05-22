$(function () {                                             //when document is ready...
    // Creating new book
    $('#createBook').on('click', function () {              //when this element is clicked, do the following
        $.get('/Book/Create', function (data) {             //make GET req to create url, get data, 
            $('#modalContent').html(data);                  //insert into modalContent element
            $('#modal').modal('show');                      //show up modal
        });
    });

    // Editing a book
    $(document).on('click', '.editBook', function () {      //when this button is clicked, do the following
        let id = $(this).data('id');                        //get data-id's value aka book Id 
        $.get('/Book/Edit/' + id, function (data) {         //make GET req to edit+id url, get data,
            $('#modalContent').html(data);                  //insert into modalContent element
            $('#modal').modal('show');                      //show up modal
        });
    });

    // Saving/Submitting a book
    $(document).on('click', '#saveBook', function () {      //when this button is clicked, do the following
        let form = $('#bookForm');                          //select element with id of bookForm
        $.ajax({                                            //make AJAX form POST request 
            url: form.attr('action'),                       //according to action, method, and serialize data
            type: form.attr('method'),
            data: form.serialize(),
            success: function (response) {                  //if success property is received from response
                if (response.success) {                     
                    console.log(response);
                    $('#modal').modal('hide');              //modal gets hidden
                    //location.reload(); // Refresh page
                } else {
                    $('#modalContent').html(response);      //else, response data is added into modal 
                }
               
            }
        });
    });

    // Deleting a book
    $(document).on('click', '.deleteBook', function () {    //when this button is clicked, do the following
        let id = $(this).data('id');                        //select element with id of book 
        if (confirm('Are you sure you want to delete this book?')) {//show confirm deletion modal 
            $.post('/Book/Delete/' + id, function (response) {      //make AJAX POST request to delete+id url, get response
                if (response.success) {                             //if success
                    alert('Deleted successfully!');
                    updateBookList();                               //update page (bookList) with fresh data , w/o reload
                    //location.reload(); // Refresh page
                }
            });
        }
    });

    // Handle "Cancel button" click event
    $(document).on('click', '.cancel-button', function () {
        console.log(`hit cancel!`);
        $("#modal").modal("hide");
    });

    //Handle "X" button click event
    $(document).on('click', '.x-button', function () {
        console.log(`hit X!`);
        $("#modal").modal("hide");
    });

    // Handle modal closed event (reset form, clear out inputs)
    $('.modal').on('hidden.bs.modal', function () {
        console.log(`input was cleared!`);
        $(this).find("form")[0].reset();
        updateBookList();
    });


     //to update the bookList div
    function updateBookList() {
        $.get('/Book/Index', function (data) {                          //make GET req to Index url, get data
            let bookListContent = $(data).find('#bookList').html();     //select element with id of bookList from data $() is wrapped for Jquery funcs
            $('#bookList').html(bookListContent);                       //insert into bookList with selected data element
        });     
    }
});
