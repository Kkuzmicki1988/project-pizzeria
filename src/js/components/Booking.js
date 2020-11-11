/* eslint-disable linebreak-style */
import {templates, select} from '../settings.js';

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
    //thisBooking.dom.wrapper = 
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount); console.log(thisBooking.dom.peopleAmount);
   

  }

  initWidgets() {
    const thisBooking = this;

    console.log(thisBooking);


  }
}


export default Booking;