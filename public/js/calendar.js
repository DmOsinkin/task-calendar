
// TODO: это недоразумение из скобок
for (let index = 0; index < months.length; index++) {
    htmlMonths[months[index]] = createCalendar(2018, index + 1);
}

for (let index = 0; index < months.length; index++) {
    $("#calendar").append(htmlMonths[months[index]]);

}

