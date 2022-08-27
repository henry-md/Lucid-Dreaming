// get elements
var start_time_label = document.getElementsByClassName("input-text")[0];
var end_time_label = document.getElementsByClassName("input-text")[1];
var interval_label = document.getElementsByClassName("input-text")[2];
var start_time = document.querySelector('#start-time');
var end_time = document.querySelector('#end-time');
var interval = document.querySelector('#interval');
var message = document.querySelector('#message');
var messageContainer = document.querySelector('#message_container');

// reset values if available
if (localStorage.getItem('start_time')) {
    start_time.value = String(localStorage['start_time']);
    end_time.value = String(localStorage['end_time']);
    interval.value = String(localStorage['interval']);
    console.log('[loaded local storage]');
}

// don't refresh on submission
$('#form').submit(function (e) {
    e.preventDefault();
});

// print date helper function
function get_date(str) {
    var d = new Date(str);
    return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) 
    + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) 
    + ":" + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
};

function postfix(start_day) {
    if (start_day % 10 == 1) return "st";
    else if (start_day % 10 == 2) return "nd";
    else if (start_day % 10 == 3) return "rd";
    else return "th";
}

// given a string like "12:34", return "12:34 AM" or "12:34 PM"
function display_time(date_str) {
    var hr = parseInt(date_str.slice(0, 2)); // will automatically strip leading 0's
    var min = date_str.slice(3, 5);
    var am_pm = hr < 12 ? "am" : "pm";
    var hr_12_hr_time = hr > 12 ? hr - 12 : hr; // can't mod by 12 b/c 12 -> 0
    if (parseInt(min) == 0) return `${hr_12_hr_time} ${am_pm}`;
    return `${hr_12_hr_time}:${date_str.slice(3, 5)} ${am_pm}`;
}

// checks if the given hour and minute is before now
function date_before_now(start_hr, start_min) {
    var now = new Date();
    var date = new Date();
    date.setHours(start_hr);
    date.setMinutes(start_min);
    return date < now;
}

// on submit
function log_submit(event) {

    // update local storage
    localStorage.setItem('start_time', String(start_time.value));
    localStorage.setItem('end_time', String(end_time.value));
    localStorage.setItem('interval', String(interval.value));
    console.log('[updated local storage]');

    // set the timer
    var now = new Date();
    var start_hr = parseInt(localStorage['start_time'].slice(0, 2));
    var start_min = parseInt(localStorage['start_time'].slice(3, 5));
    var start_day = date_before_now(start_hr, start_min) ? now.getDate() + 1 : now.getDate(); // basically, start timer at next available start time.
    var future = new Date(now.getFullYear(), now.getMonth(), start_day, start_hr, start_min, 0);
    var ms_until_start = future - Date.now(); // in ms
    var ms_interval = parseInt(localStorage['interval']) * 60 * 1000; // 1 min is 60*1000 ms
    setTimeout( () => { // doesn't currently shut off at stop time
        setInterval( () => {
            var audio = new Audio("Assets/dream_check.mp3");
            audio.play();
            var d = new Date(); // because you didn't have new you fuck
            console.log("[played sound at " + get_date(d.toString()) + "]");
        }, ms_interval);
    }, ms_until_start);

    // write confirmation message
    final_msg = `Will play sound every ${localStorage['interval']} min starting ${display_time(localStorage['start_time'])} on the ${start_day}${postfix(start_day)}`; // take out leading 0's from time.
    message.innerText = final_msg;
    messageContainer.classList.remove('hidden');
}
form = document.querySelector('#form');
form.addEventListener('submit', log_submit);