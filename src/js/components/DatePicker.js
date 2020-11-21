/* eslint-disable linebreak-style */
import { select, settings } from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    flatpickr(thisWidget.dom.input, {
      defaultDate: new Date(),
      minDate: new Date(),
      maxDate: utils.addDays(utils.dateToStr(new Date()), settings.datePicker.maxDaysInFuture),
      locale: {
        firstDayOfWeek: 1
      },
      disable: [
        function (date) {
          // return true to disable
          return date.getDay() === 0;
        }
      ],
      onChange: function (_, dateStr) {
        thisWidget.value = dateStr;
      },
    });
  }

  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {

  }
}

export default DatePicker;