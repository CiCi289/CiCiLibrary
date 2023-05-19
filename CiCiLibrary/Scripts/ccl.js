$(function () {         //when document is ready...
    // Creating new book
    $('#createBook').on('click', function () {          //when this element is clicked, do the following
        $.get('/Book/Create', function (data) {
            $('#modalContent').html(data);
            $('#modal').modal('show');
        });
    });

    // Editing a book
    $(document).on('click', '.editBook', function () {
        var id = $(this).data('id');
        $.get('/Book/Edit/' + id, function (data) {
            $('#modalContent').html(data);
            $('#modal').modal('show');
        });
    });

    // Saving/Submitting a book
    $(document).on('click', '#saveBook', function () {
        var form = $('#bookForm');
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            success: function (response) {
                
                if (response.success) {
                    console.log(response);
                    $('#modal').modal('hide');
                    location.reload(); // Refresh page
                } else {
                    $('#modalContent').html(response);
                }
               
            }
        });
    });

    // Deleting a book
    $(document).on('click', '.deleteBook', function () {
        var id = $(this).data('id');
        if (confirm('Are you sure you want to delete this book?')) {
            $.post('/Book/Delete/' + id, function (response) {
                if (response.success) {
                    location.reload(); // Refresh page
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
    });
});
