// Get Today's Date
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

// Declare Array of Months
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Declare Array of Events
eventObject1 = {date: new Date(2022, 10, 5), title: "Course 1 Assignment 2 Due"};
eventObject2 = {date: new Date(2022, 10, 10), title: "Course 2 Quiz 5 Due"};
eventObject3 = {date: new Date(2022, 10, 15), title: "Course 3 Midterm"};
eventObject4 = {date: new Date(2022, 10, 20), title: "Course 1 Assignment 3 Due"};
eventsArray = [eventObject1, eventObject2, eventObject3, eventObject4];

// Call Functions to Create Calendar
showCalendar(currentMonth, currentYear);

// Calculate Number of Days in Any Given Month
function numDaysInMonth(month, year) {
	return 32 - new Date(year, month, 32).getDate();
}

// Create Calendar
function showCalendar(month, year) {
	document.getElementById("todaysMonthYear").innerHTML = months[month] + " " + year;
	firstDay = (new Date(year, month)).getDay();
	body = document.getElementById("calendarBody");
	body.innerHTML = "";

	// Create Cells in the Calendar
	calendarDay = 1;
	for (week = 0; week < 6; week++) {
		let row = document.createElement("tr"); // for each week, create a row
		for (day = 0; day < 7; day++) {
			// Fill in empty boxes at end of month
			if (calendarDay > numDaysInMonth(currentMonth, currentYear)) {
			 	for (i = day; i < 7 && day != 0; i++) {
			 		cell = document.createElement("td");
                	cellText = document.createTextNode("");
                	cell.appendChild(cellText);
                	row.appendChild(cell);
			 	}
			 	break;
			}
			// Fill in empty boxes at beginning of month
			else if (week == 0 && day < firstDay) {
			 	cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
			}
			// Fill in boxes with dates
			else {
			 	cell = document.createElement("td");
			 	cellText = document.createTextNode(calendarDay);
			 	cell.appendChild(cellText);
			 	cell.appendChild(document.createElement("br"));
			 	// Check if there is an event that day
			 	cell.appendChild(eventToday(eventsArray, currentYear, currentMonth, calendarDay));
                row.appendChild(cell);
                calendarDay++;
			}
		}
		// Only add 6th row if needed (when first day of the week exists)
		if (row.getElementsByTagName("td")[0] != null) {
		 	body.appendChild(row);
		}
	}
}

function next() {
	currentYear = (currentMonth == 11) ? currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

function prev() {
	currentYear = (currentMonth == 0) ? currentYear - 1 : currentYear;
	currentMonth = (currentMonth == 0) ? 11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

function goToToday() {
	currentMonth = today.getMonth();
	currentYear = today.getFullYear();
	showCalendar(currentMonth, currentYear);
}

function displayEvent(eventDetails) {
    eventDisplay = document.createElement("div");
    eventDisplay.setAttribute("class", "eventDisplay");
    eventDisplay.innerHTML = eventDetails["title"];
    return eventDisplay;
}

function eventCheck(eventDetails, year, month, day) {
	if (year == eventDetails["date"].getFullYear() && month == eventDetails["date"].getMonth() && day == eventDetails["date"].getDate()) {
		return true;
	}
	return false;
}

function eventToday(eventDetails, year, month, day) {
	for (i = 0; i < eventDetails.length; i++) {
		if (eventCheck(eventsArray[i], year, month, day)) {
			return displayEvent(eventsArray[i]);
		}
	}
	return document.createElement("br");
}

function addNewEvent() {
    console.log();
    var dateString = document.getElementById("date").value.split("T");

    var day = dateString[0].split("-");
    var time = dateString[1].split(":");

    var title = document.getElementById("title").value;

    var date = new Date(parseInt(day[0]), parseInt(day[1])-1, parseInt(day[2]), parseInt(time[0]), parseInt(time[1]));

    eventObject = {date: date, title: title, description: "Description"};
    eventsArray.push(eventObject);
    showCalendar(currentMonth, currentYear);

    document.getElementById("newEventForm").reset();
    document.getElementById("createNewEventModal").style.display = "none";
}

// Set up weekly calendar
var curr = new Date;
var sunday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
var saturday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

document.getElementById("todaysWeek").innerHTML = "Week of " + sunday.getFullYear() + "-" + (sunday.getMonth()+1) + "-" + sunday.getDate() + " to " + saturday.getFullYear() + "-" + (saturday.getMonth()+1) + "-" + saturday.getDate();
showWeeklyEvents(sunday, saturday);

var currentWeek = sunday;

function toggleCalendarView() {
    if (document.querySelector('input[name="view"]:checked').value == "weeklyView") {
        document.getElementById("weeklyCalendarHeader").style.display = "block";
        document.getElementById("weekly").style.display = "block";
        document.getElementById("monthlyCalendarHeader").style.display = "none";
        document.getElementById("monthly").style.display = "none";
        goToThisWeek();
    } else {
        document.getElementById("weeklyCalendarHeader").style.display = "none";
        document.getElementById("weekly").style.display = "none";
        document.getElementById("monthlyCalendarHeader").style.display = "block";
        document.getElementById("monthly").style.display = "block";
        showCalendar(currentMonth, currentYear);
    }
}

function prevWeek() {
    var firstday = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate()-7);
    var lastday = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate()-1);
    currentWeek = firstday;
    
    document.getElementById("todaysWeek").innerHTML = "Week of " + firstday.getFullYear() + "-" + (firstday.getMonth()+1) + "-" + firstday.getDate() + " to " + lastday.getFullYear() + "-" + (lastday.getMonth()+1) + "-" + lastday.getDate();    
    showWeeklyEvents(firstday, lastday);
}

function nextWeek() {
    var firstday = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate()+7);
    var lastday = new Date(currentWeek.getFullYear(), currentWeek.getMonth(), currentWeek.getDate()+13);
    currentWeek = firstday;
    
    document.getElementById("todaysWeek").innerHTML = "Week of " + firstday.getFullYear() + "-" + (firstday.getMonth()+1) + "-" + firstday.getDate() + " to " + lastday.getFullYear() + "-" + (lastday.getMonth()+1) + "-" + lastday.getDate();
    showWeeklyEvents(firstday, lastday);
}

function goToThisWeek() {
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

    document.getElementById("todaysWeek").innerHTML = "Week of " + firstday.getFullYear() + "-" + (firstday.getMonth()+1) + "-" + firstday.getDate() + " to " + lastday.getFullYear() + "-" + (lastday.getMonth()+1) + "-" + lastday.getDate();
    showWeeklyEvents(firstday, lastday);
}

function showWeeklyEvents(firstday, lastday) {
    var weeklyDays = document.getElementsByTagName("td");
    for (weeklyDay of weeklyDays) {
        weeklyDay.innerHTML = '';
    }
    for (eventItem of eventsArray) {
        if (eventItem["date"] >= firstday && eventItem["date"] <= lastday) {
            const diffTime = Math.abs(eventItem["date"] - firstday);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            var eventDisplay = displayEvent(eventItem);
            eventDisplay.style.marginTop = (diffDays * 50) + "px";
            weeklyDays[diffDays].appendChild(eventDisplay);
        }
    }
}


// Get the modal
var modal = document.getElementById("createNewEventModal");

// Get the button that opens the modal
var btn = document.getElementById("addNewEventModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */
  now.setMilliseconds(null)
  now.setSeconds(null)

  document.getElementById('date').value = now.toISOString().slice(0, -1);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function onChangeDate() {
    if (document.getElementById("date").value.length == 0) {
        document.getElementById("invalidDate").style.display = "block";
    } else {
        document.getElementById("invalidDate").style.display = "none";
    }
}

function onChangeTitle() {
    if (document.getElementById("title").value.length == 0) {
        document.getElementById("invalidTitle").style.display = "block";
    } else {
        document.getElementById("invalidTitle").style.display = "none";
    }
}

function validateForm() {
    if (document.getElementById("date").value.length > 0 && document.getElementById("title").value.length > 0) {
        addNewEvent();
    } else {
        onChangeDate();
        onChangeTitle();
    }
}