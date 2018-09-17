var months = ['Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

var htmlMonths = {};

for (let index = 0; index < months.length; index++) {
    htmlMonths[months[index]] = createCalendar(2018, index + 1);
};

for (let index = 0; index < months.length; index++) {
    $("#calendar").append(htmlMonths[months[index]]);

}



function createCalendar(year, month) {
    //var elem = document.getElementById(id);

    var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);
    var table = "<div class=\"month\"><p>" + months[mon] + "</p>";
    table += '<table class=\"month-table\"><tr><th class="th-month">пн</th class="th-month"><th class="th-month">вт</th class="th-month"><th class="th-month">ср</th class="th-month"><th class="th-month">чт</th class="th-month"><th class="th-month">пт</th class="th-month"><th class="th-month">сб</th class="th-month"><th class="th-month">вс</th class="th-month"></tr><tr>';

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
    table += '</tr></table></div>';

    // только одно присваивание innerHTML
    //elem.innerHTML = table;

    return table;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}