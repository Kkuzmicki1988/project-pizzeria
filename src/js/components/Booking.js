/* eslint-disable linebreak-style */
import {templates, select} from '../settings.js';
import AmountWidget from './AmountWidget.js';
class Booking {
  constructor(bookingContainer) {
    const thisBooking = this;
    thisBooking.render(bookingContainer);
    thisBooking.initWidgets();
  }

  render(html) {
    const thisBooking = this;
    
    const generateHTML = templates.bookingWidget(); 
    thisBooking.dom = {}; 
    thisBooking.dom.wrapper = html;
    thisBooking.dom.wrapper.innerHTML = generateHTML;
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper); //console.log(thisBooking.dom.datePicker);

  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    
    thisBooking.datePicker = new AmountWidget(thisBooking.dom.datePicker);
  }
}


export default Booking;