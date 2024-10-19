const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next");
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


const eventsArr = [
  {
    day: 19,
    month: 10,
    year: 2024,
    events: [
      {
        title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
];

//add days function
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
  
    date.innerHTML = months[month] + " " + year;
  
    let days = "";
  
    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
  
    for (let i = 1; i <= lastDate; i++) {
      //check if event is present on that day

      let event = false;
      eventsArr.forEach((eventObj) => {
        if(eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year)
        {
          event = true;
        }
      })

      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        activeDay = i;
        getActiveDay(i);
        //if event found
        //add active on startup day
          if(event) days += `<div class="day today active event">${i}</div>`;
          else days += `<div class="day today">${i}</div>`;

        } else {
          if(event) days += `<div class="day event">${i}</div>`;
          else days += `<div class="day">${i}</div>`;
      }
    }
  
//next month days
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }


    daysContainer.innerHTML = days;

    //add listner after calendar initialized
    addListener();
  }

initCalendar();

function prevMonth()
{
  month--;
  if(month < 0)
  {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth()
{
  month++
  if(month > 11)
  {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),

    addEventCloseBtn = document.querySelector(".close");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  //if click outside
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target))
  {
    addEventContainer.classList.remove("active");
  }
});

//allow 50 char
addEventTitle.addEventListener("input", () => {
  addEventTitle.value = addEventTitle.value.slice(0,50);
});

//format time from and to
addEventFrom.addEventListener("input", (e) => {

  addEventFrom,value = addEventFrom.value.replace(/[^0-9:]/g, "");

  if(addEventFrom.value.length===2)
  {
    addEventFrom.value += ":";
  }

  if(addEventFrom.value.length > 5)
  {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {

  addEventTo,value = addEventTo.value.replace(/[^0-9:]/g, "");

  if(addEventTo.value.length===2)
  {
    addEventTo.value += ":";
  }

  if(addEventTo.value.length > 5)
  {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});


function addListener()
{
  const days = document.querySelectorAll(".day");

  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      activeDay = Number(e.target.innerHTML);

      //call active day after click
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));


      //remove active from already active day
      days.forEach((day) => {
        day.classList.remove("active");});

      if(e.target.classList.contains("prev-date"))
      {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(!day.classList.contains("prev-date") && day.innerHTML===activeDay)
            {
              day.classList.add("active");
            }
            
          });
        }, 100);
      }
      else 
      if(e.target.classList.contains("next-date"))
        {
          nextMonth();
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
  
            days.forEach((day) => {
              if(!day.classList.contains("next-date") && day.innerHTML===activeDay)
              {
                day.classList.add("active");
              }
              
            });
          }, 100);
        }

        else
        {
          //remaining days
          e.target.classList.add("active");
        }


    });
  });
}



function getActiveDay(date)
{
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];

  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date+" " + months[month] + " " + year;
}


//show event of that day
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
}


