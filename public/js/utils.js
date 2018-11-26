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

// на будущее для отображения даты задачи как "3 сентября 2018"
var monthsDate = ['января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

/**
 * получить номер дня недели, от 0(пн) до 6(вс)
 * @param {Date} date 
 */
function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

/**
 * Получить данные для конкретного года. 
 * Включает в себя перерисовку и повторную загрузку данных в списке задач и календаре.
 * @param {any} year год, за который необходимо получить данные.
 */
function updateData(year = Cookies.get("currentYear")) {
    document.getElementById("current-year-title").innerHTML = year;
    $("#task-list").empty();

    $.get('/api/', data => {
        data.forEach(task => {
            $("#task-list").append(getTask(task));
            currentDate = new Date();
            var endDate = new Date(task.end_date);
            if (year == currentDate.getFullYear()) {
                // Выделяем сегодняшний день
                $("#calendar").find('[data-month-number="' + currentDate.getMonth() + '"]')
                    .find('[data-date-number="' + currentDate.getDate() + '"]')
                    .css({
                        "border-color": "rgb(30, 255, 0)"
                    });
                // Заставляем мигать сегодняшний и/или завтрашний день, 
                // если в соответствующий день есть задача
                if (currentDate.getMonth() == endDate.getMonth()) {
                    if (endDate.getDate() == currentDate.getDate() || endDate.getDate() == currentDate.getDate() + 1) {
                        blink(dayWithTask);
                    }
                }
            }

            if (year == endDate.getFullYear()) {
                // закрашиваем красным цветом дни, содержащие задачи */
                var dayWithTask = $("#calendar")
                    .find('[data-month-number="' + endDate.getMonth() + '"]')
                    .find('[data-date-number="' + endDate.getDate() + '"]');
                dayWithTask.css({
                    "background-color": "red",
                    "color": "white"
                });
            }


        });
    });
    initCalendar(year);
}

function showFoundedData(data) {
    $("#task-list").empty();
    data.forEach(task => {
        $("#task-list").append(getTask(task));
    });
}

/**
 * Получить html-элемент, содержащий информацию о задаче
 * @param {JSON} task задача, которую необходимо завернуть в html
 * @returns {String} html-элемент, содержащий информацию о задаче
 */
function getTask(task) {
    var endDate = new Date(task.end_date);
    return '<li class="task" id="' + task._id + '">' +
        '<b>' + task.title + '</b>' +
        '<br><em class="em-date">' + 'Дата завершения: ' + endDate.toLocaleDateString() + '</em>' +
        '<hr>' +
        task.description +
        '<br><div class="flex-container">' +
        '<button type="button" class="btn btn-danger btn-delete-task" data-id="' + task._id + '">Удалить</button>' +
        '<button type="button" class="btn btn-primary btn-update-task" data-id="' + task._id + '">Редактировать</button></div>' +
        '</li>';
}

/**
 * Создать html-скелет календаря и заполнить его днями. 
 */
function initCalendar(year) {
    function createCalendarHTML(neededYear, month) {
        //var elem = document.getElementById(id);

        var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
        var d = new Date(neededYear, mon);
        var table = "<div class=\"month\"><div class=\"p-month\" data-month= " + mon + " data-date=" + d.toISOString() + ">" + months[mon] + "</div>";
        table += '<table class=\"month-table\" data-month-number=' + mon + '><tr><th class="th-month">пн</th class="th-month"><th class="th-month">вт</th class="th-month"><th class="th-month">ср</th class="th-month"><th class="th-month">чт</th class="th-month"><th class="th-month">пт</th class="th-month"><th class="th-month">сб</th class="th-month"><th class="th-month">вс</th class="th-month"></tr><tr>';

        // заполнить первый ряд от понедельника
        // и до дня, с которого начинается месяц
        // * * * | 1  2  3  4
        for (var i = 0; i < getDay(d); i++) {
            table += '<td><div class="day"></div></td>';
        }

        // ячейки календаря с датами
        while (d.getMonth() == mon) {
            table += '<td><div class="day" data-date-number=' + d.getDate() + ' data-date=' + d.toISOString() + '>' + d.getDate() + '</div></td>';

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

    $("#calendar").empty();
    var htmlMonths = {};
    // TODO: это недоразумение из скобок
    for (let index = 0; index < months.length; index++) {
        htmlMonths[months[index]] = createCalendarHTML(year, index + 1);
    }

    for (let index = 0; index < months.length; index++) {
        $("#calendar").append(htmlMonths[months[index]]);
    }
}

/**
 * Применить мигание к элементу HTML
 * @param {*} selector 
 */
function blink(selector) {
    $(selector).fadeOut('slow', function () {
        $(this).fadeIn('slow', function () {
            blink(this);
        });
    });
}