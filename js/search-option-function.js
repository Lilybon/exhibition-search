var today = new Date();
var day = today.getDay();
var yyyy = today.getFullYear();
var mm = today.getMonth() + 1; // Index 0~11
var dd = today.getDate();
mm = appendZero(mm);
dd = appendZero(dd);

function appendZero(num){
  if (num.toString().length < 2) num = '0' + num;
  return num;
}

function dateRangeFillIn(){ // Instruction: Fill in the default date range of daterangepicker initially
  var dateRangePicker = yyyy + "-" + mm + "-" + dd + " ~ " + (yyyy + 3) + "-" + mm + "-" + dd; // 3 years range default
  $('[data-id="daterangepicker"]').html(dateRangePicker);
}

function dateRangeChange(time){ // Instruction: Change date Range by Approximate Time
  var dateRange = $('[data-id="daterangepicker"]');
  var date_start = new Date();
  var date_end = new Date();
  switch(time){
    case 'undefined':
      alert("error! browser can't get approximate time string");
      break;
    case 'null':
      alert("error! browser can't get approximate time string");
      break;
    case '不限':
      dateRangeFillIn(); // default
      break;
    case '今日':
      dateRange.text(yyyy + "-" + mm + "-" + dd + " ~ " + yyyy + "-" + mm + "-" + dd);
      break;
    case '明日':
      date_end.setDate(date_end.getDate() + 1);
      dateRange.text(yyyy + "-" + mm + "-" + dd + " ~ " + date_end.getFullYear() + "-" + appendZero(date_end.getMonth() + 1) + "-" + appendZero(date_end.getDate()));
      break;
    case '本週末': // Catch this week's Fri ~ Sun
      if(day == 0){day = 7;} //以利計算
      if(day >= 5){ //本日~本周日
        date_end.setDate(date_end.getDate() + (7 - day));
        dateRange.text(yyyy + "-" + mm + "-" + dd + " ~ " + date_end.getFullYear() + "-" + appendZero(date_end.getMonth() + 1) + "-" + appendZero(date_end.getDate()));
      }else{ //本周五~本周日
        date_start.setDate(date_start.getDate() + (5 - day));
        date_end.setDate(date_end.getDate() + (7 - day));
        dateRange.text(date_start.getFullYear() + "-" + appendZero(date_start.getMonth() + 1) + "-" + appendZero(date_start.getDate()) + " ~ " + date_end.getFullYear() + "-" + appendZero(date_end.getMonth() + 1) + "-" + appendZero(date_end.getDate()));
      }
      break;
    case '下週末': // Catch next week's Fri ~ Sun
      if(day == 0){day = 7;} //以利計算
      date_start.setDate(date_start.getDate() + (12 - day));
      date_end.setDate(date_end.getDate() + (14 - day));
      dateRange.text(date_start.getFullYear() + "-" + appendZero(date_start.getMonth() + 1) + "-" + appendZero(date_start.getDate()) + " ~ " + date_end.getFullYear() + "-" + appendZero(date_end.getMonth() + 1) + "-" + appendZero(date_end.getDate()));
      break;
    case '下個月':
      var end_yyyy = yyyy;
      var end_mm = Number(mm) + 1;
      if(end_mm > 12){
        end_yyyy + 1;
        end_mm = end_mm - 12;
      }
      if (end_mm.toString().length < 2) end_mm = '0' + end_mm;
      dateRange.text(yyyy + "-" + mm + "-" + dd + " ~ " + end_yyyy + "-" + end_mm + "-" + dd);
      break;
    case '近三個月':
      var end_yyyy = yyyy;
      var end_mm = Number(mm) + 3;
      if(end_mm > 12){
        end_yyyy + 1;
        end_mm = end_mm - 12;
      }
      if (end_mm.toString().length < 2) end_mm = '0' + end_mm;
      dateRange.text(yyyy + "-" + mm + "-" + dd + " ~ " + end_yyyy + "-" + end_mm + "-" + dd);
      break;
  }
}

$(function() { // Run when the DOM is ready
  $('[data-time]').click(function() { // Instruction: Control "when to go" list item's current class
    $('[data-time], .current').removeClass("current");
    $(this).addClass("current");
    apr_time = $(this).text();
    dateRangeChange(apr_time);
  });
  $('.selected-city-dropdown').click(function() {
    $('.dropdown-menu').toggle();
  });
  $('[data-group="city"]').click(function(){
    var citySelected = $(this).html();
    $('.selected-city').html(citySelected);
    $('.dropdown-menu').toggle();
  });
});
