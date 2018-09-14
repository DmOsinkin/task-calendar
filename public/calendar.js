$("#right-title").append("Список задач");
$("#left-title").append("Календарь");

function createCalendar(id, year, month) {
    var elem = document.getElementById(id);

    var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);

    var table = '<table><tr><th class="th-month">пн</th class="th-month"><th class="th-month">вт</th class="th-month"><th class="th-month">ср</th class="th-month"><th class="th-month">чт</th class="th-month"><th class="th-month">пт</th class="th-month"><th class="th-month">сб</th class="th-month"><th class="th-month">вс</th class="th-month"></tr><tr>';

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (var i = 0; i < getDay(d); i++) {
        table += '<td><div class="day"></div></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() == mon) {
        table += '<td><div class="day">' + d.getDate() + '</div></td>';

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td><div class="day"></div></td>';
        }
    }

    // закрыть таблицу
    table += '</tr></table>';

    // только одно присваивание innerHTML
    elem.innerHTML = table;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

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