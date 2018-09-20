$("#right-title").append("Список задач");
$("#left-title").append("Календарь");

updateData();

$("#send-button").click(function () {
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