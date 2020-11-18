/* eslint-disable linebreak-style */
import {select, settings} from '../settings.js';
import utils from '../utils.js';
import flatpickr from 'flatpickr';

class DatePicker extends BaseWidget {
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;
    
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
  
    thisWidget.initPlugin();
  }
  
  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = settings.datePicker.maxDaysInFuture;
    
    flatpickr(thisWidget.dom.input);
    
  }
}