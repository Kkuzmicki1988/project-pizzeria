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
    
    const generateHTML = templates.bookingWidget(); console.log(generateHTML);
    thisBooking.dom = {}; 
    thisBooking.dom.wrapper = html;
    thisBooking.dom.wrapper.innerHTML = generateHTML;
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
   

  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

  }
}


export default Booking;