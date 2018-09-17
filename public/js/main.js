$("#right-title").append("Список задач");
$("#left-title").append("Календарь");

var tasks = {};

$.get('/api', data => {
    data.forEach(task => {
        $("#task-list").append(
            "<li class=\"task\" id=\"" + task["_id"] + "\">" +
            task["title"] +
            "<hr>" +
            task["description"] +
            "</li>");
    });
});

$("#create-task-form").submit(function () {
    var form = $(this);

    $.ajax({
        type: "POST",
        url: "/api/",
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            $("#task-list").clear();
            $.get('/api', data => {
                data.forEach(task => {
                    $("#task-list").append(
                        "<li class=\"task\" id=\"" + task["_id"] + "\">" +
                        task["title"] +
                        "<hr>" +
                        task["description"] +
                        "</li>");
                });
            });
        }
    });

})