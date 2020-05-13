class Calendar {
  currDay = document.querySelector('.currentDay');
  dots = document.querySelector('.dot-container');
  month = document.querySelector('.month');
  btns = document.querySelector('.btns');
  dropdown = document.querySelector('.drop-down');

  createEvent = document.querySelector('.create');
  editEvent = document.querySelector('.edit');
  delEvent = document.querySelector('.delete');

  saveBtn = document.querySelector('.save');
  closeBtn = document.querySelector('.close');

  forms = document.querySelector('.form-details');
  formControls = document.querySelector('.controls');

  // forms = null;
  calenderDaysTitle = document.querySelector('.title');
  main = document.querySelector('.flip');

  objectOfMonth = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 30,
    Sep: 31,
    Oct: 31,
    Nov: 30,
    Dec: 31
  }

  constructor() {
    //CALL YOUR DOM OBJECTS HERE
    this.events = {};
    this.days = ['Su','M','Tu','W','Th','F','S'];
    this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  }

  run(){
    //LISTEN TO EVENTS HERE

    this.month.innerText = `${this.storeMonth(this.getWhatMonth())},${this.storeYear(this.getWhatYear())}`;
    this.currDay.innerText = `${this.storeDay()}`;
    // console.log(this.months);
    // this.calenderDays.forEach((row) => {
    //   row.addEventListener('click',this.createAForm);
    // });
    this.populateUIdayTitle();

    this.showWeekDayOnDom(this.getWhatMonth(),this.getWhatYear());
    this.btns.addEventListener('click',this.updateMonth);
    this.dots.addEventListener('click',this.dropDown);

    this.dropdown.addEventListener('click',this.showForm);
    this.formControls.addEventListener('click',this.saveORClose)
    // this.createEvent.addEventListener('click',this.showForm);
    // this.editEvent.addEventListener('click',this.editForm);
    // this.deleteEvent.addEventListener('click',this.removeForm);

    // this.closeBtn.addEventListener('click',this.hideForm);
    // this.saveBtn.addEventListener('click',this.saveEvent);

  } // End Of Run Method

  storeYear(year){
    return year;
  }

  getWhatYear(){
    //RETURNS A YEAR IN INTEGER
    return new Date().getFullYear();
  }

  getWhatMonth(){
    //RETURNS A NUMBER(0 - 11)
    return new Date().getMonth();
  }

  getDayOfWeek(){
    return new Date().getDay();
  }

  storeDayOfWeek(){
    //TELL US THE STRING VALUE OF THE DAY OF THE WEEK(0-6)
    return this.days[this.getDayOfWeek()];
  }

  tellUsFirstDayOfMonth(month,year){
    //TELLS US THE DAY IN NUMBER VALUE
    if(month <= 11){
      return new Date(`${year},${month+1},1`).getDay();
    }
  }

  populateUIdayTitle(){
    let len = Array.from(this.calenderDaysTitle.children).length;
    let titleElem = Array.from(this.calenderDaysTitle.children);

    //POPULATE THE DOM WITH THE DAY HEADINGS
    for(let i = 0; i < len; i++){
      titleElem[i].textContent = this.days[i];
    }
  }

  showWeekDayOnDom(month,year){
    //POPULATE THE UI FROM THAT FIRST DAY OF THE WEEK
    if(this.main.children[1]){
      this.main.children[1].innerHTML = ``;
    }
      let counter = 1;
      let noOfDays = this.objectOfMonth[this.storeMonth(month)];
      let lagBehindAcc = noOfDays + this.tellUsFirstDayOfMonth(month,year);
      let shiftToDay = this.tellUsFirstDayOfMonth(month,year);
      let dateContainer = document.createElement('div');
      dateContainer.className = 'days-of-week days';
    while(counter <= lagBehindAcc){
      let links = document.createElement('a');
      links.href = '#';
      if(counter <= shiftToDay){
        links.textContent = '-';
      }else{
        links.textContent = `${counter-shiftToDay}`;
        }
      dateContainer.appendChild(links);
      counter++;
    }
    this.main.appendChild(dateContainer);

  }

  storeMonth(month){
    for(let i = 0; i < this.months.length; i++){
      if(month == i){
        return this.months[i];
      }
    }//End For Loop

  }

  storeDay(){
    //Exact Date in the Month.//RETURNS THE CURRENT DAY(0-31);
    return new Date().getDate();
  }

  fetchDomValues(){
    let monthYearShown = this.month.innerText;
    let arr = monthYearShown.split(",");
    let dateOnDom = {oldMonth: arr[0], oldYear: parseInt(arr[1])};
    return dateOnDom;
  }

  getIndexValue(monthInWords){
    return this.months.indexOf(monthInWords);
  }

  updateMonth = (e) => {
    let {oldMonth,oldYear} = this.fetchDomValues();
    let oldMonthIdx = this.getIndexValue(oldMonth);
    //empty 2nd Element Child
    this.main.removeChild(this.main.children[1]);
    //Convert Your Values to Numbers
    oldYear = Number(oldYear);

    if(e.target.className === 'btn next')
    {
      oldMonthIdx++;
      if(oldMonthIdx > 11){
        oldYear++; oldMonthIdx = 0;
      }
      this.showWeekDayOnDom(oldMonthIdx,oldYear);
      this.changeMonth(oldMonthIdx,oldYear);
    }else if(e.target.className === 'btn prev'){
      oldMonthIdx--;
      if(oldMonthIdx < 0) {
        oldYear--; oldMonthIdx = 11;
      }
      this.changeMonth(oldMonthIdx,oldYear);
      this.showWeekDayOnDom(oldMonthIdx,oldYear);
    }
  }

  changeMonth = (month,year) => {
    this.month.innerText = `${this.storeMonth(month)},${this.storeYear(year)}`;
    this.currDay.innerText = `${this.storeDay()}`;
  }

  dropDown = () => {
    this.dropdown.classList.toggle('drop');
  }

  showForm = (e) => {
    e.target.parentElement.parentElement.parentElement.classList.remove('drop');
    if(e.target.className == 'create'){
      this.forms.classList.add('popup');
    }
    if(e.target.className == 'edit'){
      // this.forms.classList.add('popup');
      //LOAD FORM
    }
    if(e.target.className == 'delete'){
      // this.forms.classList.add('popup');
      //LOAD EVENT TO DELETE
    }
  }

  saveORClose = (e) => {
    if(e.target.className == 'close'){
      this.forms.classList.remove('popup');
    }else{
      //SAVE DETAILS TO LOCAL STORAGE
      //CHECK FOR VALID INPUTS
    }
  }

  createAForm = (e) => {
    // console.log(e.target);
    e.target.href = `form.html`;
    console.log(e.target,'after');
  }

} //End of Class

let calender = new Calendar();
calender.run();

// calender.storeYear();
