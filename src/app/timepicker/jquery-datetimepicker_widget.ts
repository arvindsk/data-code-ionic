
// @ts-ignore
import * as moment from 'moment';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions,@typescript-eslint/naming-convention
export function init(Survey: any,$) {
  const widget = {
    name: 'datetimepicker',
    title: 'Date time picker',
    iconName: '',
    widgetIsLoaded: () => true,
    isFit: question => question.getType() === 'datetimepicker',
    isDefaultRender: false,
    //You should use it if your set the isDefaultRender to false
    //htmlTemplate: '<input class=\'form-control widget-datetimepicker\' type=\'text\'>',
    htmlTemplate: '<input class=\'form-control widget-datetimepicker\' type=\'text\'>',
    activatedByChanged: activatedBy => {
      Survey.JsonObject.metaData.addClass(
        'datetimepicker',
        [
          { name: 'inputType', visible: false },
          { name: 'inputFormat', visible: false },
          { name: 'inputMask', visible: false }
        ],
        null,
        'text'
      );
      Survey.JsonObject.metaData.addProperty('datetimepicker', {
        name: 'dateFormat'
      });
    },
    afterRender: (question, el) => {

      el.placeholder = question.placeHolder;
      const datepickerElement = $(el).is('.widget-datetimepicker')
        ? $(el)
        : $(el).find('.widget-datetimepicker');
     // const datepickerElement = el.getElementsByClassName('widget-datetimepicker');
      const config = question.config || {};
     const pickerWidget = $('.widget-datetimepicker').datetimepicker({
       format: question.inputFormat,
       // timezone
       timeZone: '',

// Date format. See moment.js' docs for valid formats.
     // format: false,

// Changes the heading of the datepicker when in "days" view.
       dayViewHeaderFormat: 'MMMM YYYY',

// Allows for several input formats to be valid.
       extraFormats: false,

// Number of minutes the up/down arrow's will move the minutes value in the time picker
       stepping: 1,

// Prevents date/time selections before this date
       minDate: false,

// Prevents date/time selections after this date
       maxDate: false,

// On show, will set the picker to the current date/time
       useCurrent: false,

// Using a Bootstraps collapse to switch between date/time pickers.
       collapse: true,

// See moment.js for valid locales.
       locale: moment.locale(),

// Sets the picker default date/time.
       //defaultDate: false,
       defaultDate:question.value,

// Disables selection of dates in the array, e.g. holidays
       disabledDates: false,

// Disables selection of dates NOT in the array, e.g. holidays
       enabledDates: false,

// Change the default icons for the pickers functions.
       icons: {
         time: 'bi bi-clock-fill',
         date: 'bi bi-calendar-fill',
         up: 'bi bi-caret-up-fill text-success',
         down: 'bi bi-caret-down-fill text-success',
         previous: 'bi bi-caret-left-fill',
         next: 'bi bi-caret-right-fill',
         today: 'bi bi-calendar-check',
         clear: 'bi bi-trash',
         close: 'bi bi-x'
       },

// custom tooltip text
       tooltips: {
         today: 'Go to today',
         clear: 'Clear selection',
         close: 'Close the picker',
         selectMonth: 'Select Month',
         prevMonth: 'Previous Month',
         nextMonth: 'Next Month',
         selectYear: 'Select Year',
         prevYear: 'Previous Year',
         nextYear: 'Next Year',
         selectDecade: 'Select Decade',
         prevDecade: 'Previous Decade',
         nextDecade: 'Next Decade',
         prevCentury: 'Previous Century',
         nextCentury: 'Next Century',
         pickHour: 'Pick Hour',
         incrementHour: 'Increment Hour',
         decrementHour: 'Decrement Hour',
         pickMinute: 'Pick Minute',
         incrementMinute: 'Increment Minute',
         decrementMinute: 'Decrement Minute',
         pickSecond: 'Pick Second',
         incrementSecond: 'Increment Second',
         decrementSecond: 'Decrement Second',
         togglePeriod: 'Toggle Period',
         selectTime: 'Select Time'
       },
       // Defines if moment should use scrict date parsing when considering a date to be valid
       useStrict: false,

// Shows the picker side by side when using the time and date together
       sideBySide: false,

// Disables the section of days of the week, e.g. weekends.
       daysOfWeekDisabled: [],

// Shows the week of the year to the left of first day of the week
       calendarWeeks: false,

// The default view to display when the picker is shown
// Accepts: 'years','months','days'
       viewMode: 'days',

// Changes the placement of the icon toolbar
       toolbarPlacement: 'default',

// Show the "Today" button in the icon toolbar
       showTodayButton: true,

// Show the "Clear" button in the icon toolbar
       showClear: true,

// Show the "Close" button in the icon toolbar
       showClose: true,

// On picker show, places the widget at the identifier (string) or jQuery object if the element has css position: 'relative'
       widgetPositioning: {
         horizontal: 'auto',
         vertical: 'auto'
       },

// On picker show, places the widget at the identifier (string) or jQuery object **if** the element has css `position: 'relative'`
       widgetParent: null,

// Allow date picker show event to fire even when the associated input element has the `readonly="readonly"`property.
       ignoreReadonly: false,

// Will cause the date picker to stay open after selecting a date if no time components are being used
       keepOpen: false,

// If `false`, the textbox will not be given focus when the picker is shown.
       focusOnShow: true,

// Will display the picker inline without the need of a input field. This will also hide borders and shadows.
       inline: false,

// Will cause the date picker to **not** revert or overwrite invalid dates.
       keepInvalid: false,

// CSS selector
       datepickerInput: '.datepickerinput',

// Debug mode
       debug: false,

// If `true`, the picker will show on textbox focus and icon click when used in a button group.
       allowInputToggle: false,

// Must be in 24 hour format. Will allow or disallow hour selections (much like `disabledTimeIntervals`) but will affect all days.
       disabledTimeIntervals: false,

// Disable/enable hours
       disabledHours: false,
       enabledHours: false,

// This will change the `viewDate` without changing or setting the selected date.
       viewDate: false
     });
      // .on("changeDate", function (e) {
      //   question.value = moment(e.date).format("DD/MM/YYYY");
      //   // `e` here contains the extra attributes
      // });

      //Update question value on value change
      pickerWidget.on('dp.change', e => {
        //question.value = e.time.value;
        console.log(e.date);
        if (e.date) {
          question.value = moment(e.date).format('MM/DD/YYYY HH:mm');
        } else {
          question.value = '';
        }

        console.log(question.value);
      });
      question.valueChangedCallback = () => {
        $('.widget-datetimepicker').datetimepicker({
          format: question.inputFormat,
          defaultDate:question.value
        });
      };
      question.valueChangedCallback();
      question.readOnlyChangedCallback = () => {
        if(question.isReadOnly) {
          datepickerElement.prop('readonly', true);
        }
        else {
          datepickerElement.removeAttr('readonly');
        }
      };
      question.readOnlyChangedCallback();

    },
    willUnmount: (question, el) => {
      const $el = $(el).is('.widget-datetimepicker')
        ? $(el)
        : $(el).find('.widget-datetimepicker');
      $el.datepicker('destroy');
      question.readOnlyChangedCallback = undefined;
      question.valueChangedCallback = undefined;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, 'customtype');
}

/*if (typeof Survey !== 'undefined') {
  init(Survey, window.$);
}*/
