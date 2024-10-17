const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),

    

    prev = document.querySelector(".prev");
    next = document.querySelector(".next");

const navs = document.querySelectorAll("#prev, #next");


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
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
          days += `<div class="day today">${i}</div>`;
      } else {
          days += `<div class="day ">${i}</div>`;
      }
    }
  
//next month days
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }


    daysContainer.innerHTML = days;
  }
  
  




navs.forEach((i) => {
  i.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    initCalendar();
  });
});

initCalendar();


