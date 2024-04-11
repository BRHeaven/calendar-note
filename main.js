import data from './data.json' with { type : 'json'};

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let nav = 0
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const query = (value) => {
    return document.querySelector(value);
}
const loadWeekdays = () => {
    for ( let i = 0 ; i < weekdays.length ; i++ ) {
        query(`#display`).innerHTML += `<div class="weekdays">${weekdays[i]}</div>`
    }
}
const loadCalendar = () => {
    const date = new Date();
    if ( nav !== 0 ) {
        date.setMonth( new Date().getMonth() + nav );
        console.log("change month !!!");
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year,month,-1);
    const daysInMonth = new Date(year,month,0).getDate();
    const stringFDOM = firstDayOfMonth.toLocaleDateString('en-us', {
        day : 'numeric',
        weekday: 'long',
        month: 'numeric',
        year: 'numeric',
    });
    const emptyDays = weekdays.indexOf(stringFDOM.split(', ')[0]);
    query(`#title`).innerHTML = date.toLocaleDateString('en-us',{month: 'long'}) + " " +year
    for ( let i = 0; i < emptyDays + daysInMonth; i++ ) {
        if ( i > emptyDays - 1) {
            const value = parseInt(`${year}${i}${month}`);
            query(`#display`).innerHTML += `<div id="${year}${i}${month}" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="${year}${i}${month}">${i}</div>`
            checkDaysTask(value);
          } else {
            query(`#display`).innerHTML += `<div class="block"></div>`
        }
    }
}
const renderDaily = () => {
  $('#exampleModal').on('show.bs.modal', function (event) {
    for ( let i = 0 ; i < data.length; i++ ) {
      if (data[i].id === parseInt(event.relatedTarget.id)) {
        const table = query(`#myModal`);
        table.innerHTML = '';
        const titleTask = document.createElement("div");
        const titleTime = document.createElement("div");
        const titleTaskChild = document.createElement("p");
        const titleTimeChild =document.createElement("p");
        titleTask.className = "left_modal title_modal";
        titleTime.className = "right_modal title_modal";
        titleTaskChild.innerHTML = "task";
        titleTimeChild.innerHTML = "time";
        titleTask.appendChild(titleTaskChild);
        titleTime.appendChild(titleTimeChild);
        table.appendChild(titleTask);
        table.appendChild(titleTime);
        for ( let j = 0; j < data[i].reminder.length ; j++ ) {
          const valueTask = data[i].reminder[j].task;
          const valueTime = data[i].reminder[j].time;
          const modalTask = document.createElement("div");
          const modalTime = document.createElement("div");
          let task = document.createElement("p");
          let time = document.createElement("p");
          modalTask.className = "left_modal";
          modalTime.className = "right_modal";
          task.className = "text";
          time.className = "time";
          task.innerHTML = valueTask;
          time.innerText = valueTime;
          modalTask.appendChild(task);
          modalTime.appendChild(time);
          table.appendChild(modalTask);
          table.appendChild(modalTime);
        }
        return;
      } else {
        const bodyModal = query(`#myModal`);
        bodyModal.innerHTML = '';
        const div = document.createElement("div");
        const p = document.createElement("p");
        div.appendChild(p)
        div.className = "modalDays";
        p.innerHTML = 'not task to day';
        bodyModal.appendChild(div);
      }
    }
  })
}
const checkDaysTask = (value) => {
  for ( let i = 0 ; i < data.length ; i++ ) {
    if ( value === data[i].id ) {
      document.getElementById(value).className += ' task_daily';
    }
  }
}
loadWeekdays()
loadCalendar();
checkDaysTask();
renderDaily();