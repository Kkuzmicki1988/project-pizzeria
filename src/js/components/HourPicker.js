/* eslint-disable linebreak-style */
import { select, settings } from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input); console.log(thisWidget.dom.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output); console.log(thisWidget.dom.output);
  
    thisWidget.initPlugin();
    thisWidget.value = thisWidget.dom.input;
    
  }

  initPlugin() {
    const thisWidget = this;

    rangeSlider.create(thisWidget.dom.input);
   
    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = thisWidget.dom.input;
    });
    
  }

  parseValue(value) {
    
    utils.numberToHour(value);
    return value; /* number ? */
  }

  isVaild() {
    return true;
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.value;
  }
}
export default HourPicker;