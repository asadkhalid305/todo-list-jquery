// import 'bootstrap';



$(document).ready(function () {
    // variables decleared
    var addtaskInput;
    var lenChecklist = 2;

    //modal add button
    $('#btnAddTask').click(function () {
        //get no of items in checklist
        // lenChecklist = $('.checklist .item').length;
        console.log('Before' + lenChecklist);

        //get user input from modal
        addtaskInput = $('#inputlg').val();
        // console.log(addtaskInput);

        //make a copy of last inserted item
        var cloneTask = $("#item" + lenChecklist).clone(true);
        cloneTask.attr('id', 'item' + (lenChecklist + 1));

        //editing content of copied item
        var editLabel = cloneTask.find('label');
        editLabel.html(addtaskInput);

        //add task in checklist
        $('.checklist').prepend(cloneTask);
        lenChecklist++;
        console.log('After' + lenChecklist);

        //close modal
        $('#exampleModalCenter').modal('toggle');
    });


    $('.btnDelete').click(function () {
        console.log('Before ' + lenChecklist);
        $(this).parent().parent().remove();
        lenChecklist--;
        console.log('After ' + lenChecklist);
        // $(this).remove();
    });
});
