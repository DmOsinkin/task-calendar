$("#right-title").append("Список задач");
$("#left-title").append("Календарь");

updateData();

$("body").on("click", "#send-button", function () {
    var form = $("#create-task-form");

    $.ajax({
        type: "POST",
        url: "/api/",
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            updateData();
        }
    });
});

$("body").on("click", ".btn-delete-task", function () {
    $.ajax({
        type: "DELETE",
        url: "/api/" + $(this).data("id"),
        success: function (data) {
            updateData();
        }
    });
});

$("body").on("click", ".btn-update-task", function () {

    $.ajax({
        type: "GET",
        url: "/api/" + $(this).data("id"),
        success: function (data) {
            var updateTaskForm = $("#updateTaskModal");

            updateTaskForm.find("#title").val(data.title);
            updateTaskForm.find("#description").val(data.description);
            updateTaskForm.find("#end_date").val(new Date(data.end_date).toJSON().slice(0, 19));
            updateTaskForm.find("#btn-update-send").data("id", data._id);
            updateTaskForm.modal("show");
        }
    });
});

$("body").on("click", "#btn-update-send", function () {
    var form = $("#update-task-form");
    console.log();
    $.ajax({
        type: "PUT",
        url: "/api/" + $(this).data("id"),
        data: form.serialize(),
        success: function (data) {
            updateData();
        }
    });
});