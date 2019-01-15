// import 'bootstrap';

$(function () {
    $('#addTaskAlert').hide();
    $('#editTaskAlert').hide();


    // variables decleared
    var taskCount = 1;
    var tasks = ['item1'];
    var editItemId = '';


    //global work starts

    //modal Add Task - Done button
    function clickAndEnterAdd() {
        //atleast one task already present
        if (tasks.length > 0) {
            //increase no of tasks in checklist
            taskCount++;

            //make a clone of last inserted item
            var cloneTask = $('#' + tasks[tasks.length - 1]).clone(true);
            console.log('Cloned item: ' + cloneTask);
            cloneTask.attr('id', 'item' + (taskCount));

            //editing content of cloned item
            var userInput = $('#addInput').val();
            var editLabel = cloneTask.find('label');
            if (userInput === '') {
                alert("Please enter some content");
            } else {
                editLabel.html(userInput);

                //add cloned task in checklist
                $('.checklist').prepend(cloneTask);

                //update tasks array with cloned item
                tasks.push('item' + taskCount)

                // console.log('After: ' + taskCount);
                // console.log('After: ' + tasks);

                //close modal
                $('#addModal').modal('toggle');

                //show alert success
                $('#addTaskAlert').show();
            }

        } else {
            alert('Cannot cloned item');

            //close modal
            $('#addModal').modal('toggle');
        }
    }

    //modal Edit Task - Done button
    function clickAndEnterEdit() {
        //get user input
        var userInput = $('#editInput').val();
        //editing content of edit item
        if (userInput === '') {
            alert("Please enter some content");
        } else {
            $('#' + editItemId).find('label').html(userInput);

            //close modal
            $('#editModal').modal('toggle');

            //show alert success
            $('#editTaskAlert').show();

        }
    }

    //get id of clicked item for edit and option popover 
    $(document).on('click', '.btnEdit, .btnOptionPop', function () {
        editItemId = $(this).parent().parent().attr('id');
        console.log(editItemId);
    });

    //initialize and set content of option popover
    $('#btnPopover').popover({
        tabIndex: 0,
        placement: 'left',
        trigger: 'hover',
        title: 'Options',
        container: 'body',
        html: true,
        content: '<div class=""><button type="button" class="btn btn-success btnEditPop" data-toggle="modal" data-target="#editModal">Edit</button><button type="button" class="btn btn-danger" id="btnDeletePop">Delete</button></div>'
    });

    //global work ends


    //Edit and Add Task done button click and enter event start
    $('#btnAddTask').click(
        function () {
            clickAndEnterAdd();
        }
    );

    $('#btnEditTask').click(
        function () {
            clickAndEnterEdit();
        }
    );

    $('#addInput').keypress(
        function (e) {
            if (e.which === 13) {
                clickAndEnterAdd();
            }
        }
    );

    $('#editInput').keypress(
        function (e) {
            if (e.which === 13) {
                clickAndEnterEdit();
            }
        }
    );
    //Edit and Add Task done button click and enter event end


    //delete buttons start
    //delete button from large screen
    $('.btnDelete').click(
        function () {
            var itemId = $(this).parent().parent().attr('id');

            var temp = tasks.indexOf(itemId);
            tasks.splice(temp, 1);

            $(this).parent().parent().remove();
            console.log('After deletion: ' + tasks);
        }
    );

    //delete button from small screen
    $('#btnPopover').on('shown.bs.popover', function () {
        // set what happens when user clicks on the button
        $("#btnDeletePop").on('click', function () {
            var temp = tasks.indexOf(editItemId);
            tasks.splice(temp, 1);
            $('#' + editItemId).remove();
        });
    });
    //delete buttons end 
});