function cityFilter(data, selected_city){ // Filter by city
  var result = [];

  if(selected_city != "全台灣"){
    var re = /^(台|臺)(東|西|中|北)(市|縣)$/;
    if(re.test(selected_city)){ //處理台/臺兩字共通的尷尬狀況
      var selected_city_fix = selected_city;
      if(selected_city_fix[0] == "台"){
        selected_city_fix[0] = "臺";
      }else{
        selected_city_fix[0] = "台";
      }
      $(data).each(function(){
        var address = this.showInfo[0].location;
        if(address.indexOf(selected_city) > -1 || address.indexOf(selected_city_fix) > -1) result.push(this);
      });
    }else{
      $(data).each(function(){
        var address = this.showInfo[0].location;
        if(address.indexOf(selected_city) > -1) result.push(this);
      });
    }
  }else{
    result = data;
  }

  return result;
}

function timeFilter(data, start_date, end_date){ // Filter by time range
  var result = [];

  start_date = new Date(start_date);
  end_date = new Date(end_date);
  $(data).each(function(){
    var exhibition_start = new Date(this.startDate);
    var exhibition_end = new Date(this.endDate);
    if(!(exhibition_end < start_date || exhibition_start > end_date)) result.push(this);
  });

  return result;
}

function paginationGenerator(data, pn){
  $(".pagination").empty();
  var totalCount = data.length;
  var pageSize = 10;
  var pageTotal = Math.ceil(totalCount / pageSize);
  var pageRow = 9; // 以pn為中心點向左右延伸達到長度pageRow
  var leftRow = Math.ceil((pageRow - 1)/2);
  var rightRow = pageRow - 1 - leftRow;
  if(totalCount > pageSize){ // start generating pagination
    var p_start, p_end;
    if(pageTotal <= pageRow){
      p_start = 1;
      p_end = pageTotal;
    }else if(pn - leftRow < 1){ // 頁碼太左側導致不正確頁碼,數字需要往右初始
      p_start = 1;
      p_end = pn + rightRow + (1 - (pn - leftRow));
    }else if(pn + rightRow > pageTotal){ // 頁碼太右側導致不正確頁碼,數字需要往左初始
      p_start = pn - leftRow - ((pn + rightRow) - pageTotal);
      p_end = pageTotal;
    }else{ // 正常狀況 頁碼數字沒有超過1和最大頁碼
      p_start = pn - leftRow;
      p_end = pn + rightRow;
    }
    $('.pagination').append('<li class="page-next" data-id="pager-first-btn"><strong alt="分頁-">第一頁</strong></li>');
    $('.pagination').append('<li class="page-next" data-id="pager-previous-btn"><strong alt="分頁-">上一頁</strong></li>');
    for(var i=p_start;i<=p_end;i++){
      $('.pagination').append('<li class="page-number" data-value="' + i + '"><strong alt="分頁-' + i + '">'+ i +'</strong></li>');
    }
    $('.pagination').append('<li class="page-next" data-id="pager-next-btn"><strong alt="分頁-">下一頁</strong></li>');
    $('.pagination').append('<li class="page-next" data-id="pager-last-btn"><strong alt="分頁-">最後頁</strong></li>');
  }else{ //unnecessary to pagination
    $('.pagination').append('<li class="page-number" data-value="1"><strong alt="分頁-1">1</strong></li>');
  }
}

function renderDataOnPage(data, pn){ //Render on HTML elements
  console.log("進入第" + pn + "頁");
  $('.page-number.active').removeClass("active");
  $('.page-number[data-value="' + pn + '"]').addClass("active");
  $('html,body').scrollTop(0);
  $(".search-content").empty(); //Empty all search content first
  var totalCount = data.length;
  var pageSize = 10;
  var pageTotal = Math.ceil(totalCount / pageSize);
  if(totalCount > 0){
    if(pn == pageTotal){
      var last_index = Math.min(totalCount - 1, pageSize*pn - 1);
    }else{
      var last_index = pageSize*pn - 1; // Render full page by pn
    }

    for(var i = (pn-1)*pageSize; i <= last_index; i ++){
      var c ='';
      var link = ((data[i].sourceWebPromote != "") ? data[i].sourceWebPromote : "javascript: void(0)");
      var desc_fix = data[i].descriptionFilterHtml.replace(/(?:\\[rn])+/g, " ");
      c += '<!--一項 start-->' +
            '<section>' +
              '<div class="row" data-id="event-list">' +
                '<div class="col-sm-12">' +
                  '<div class="media">' +
                    '<div class="col-sm-3 pic">' +
                      '<image src="./images/not_found.jpg"/>' + //No image URL in all the API database
                    '</div>' +
                    '<div class="col-sm-9 row">' +
                      '<div class="col-sm-10 content">' +
                        '<h3 class="media-heading"><a href=' + link +  ' target="_blank">' + data[i].title + '</a></h3>' +  //media-heading
                        '<p class="media-top">' +
                          '<span><i class="fas fa-map-marker-alt"></i>' + data[i].showInfo[0].location + '</span>' +
                          '<span>' +
                            '<i class="far fa-clock"></i>' +
                            '<span>' + data[i].startDate + '</span>' +
                            '<span> ~ </span>' +
                            '<span>' + data[i].endDate + '</span>' +
                          '</span>' +
                        '</p>' +
                        '<p class="desc">' + desc_fix +'</p>' +
                      '</div>' +
                      '<div class="col-sm-2 extra-area">' +
                        '<div><img src="./images/google-maps.png" alt="點我查看地圖" title="點我查看地圖" style="max-width: 50px;" /></div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</section>'+
          '<!--一項 end-->';
      $(".search-content").append(c);
    }
  }else{
    alert("很抱歉，在您查詢的特定時間段及地點中目前沒有活動！\n請嘗試重新輸入要求。");
  }
}

function getAPIData(){
  var url ="https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
  console.log("Ajax準備發送要求...");

  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success:function(data){
      console.log("Ajax請求發出且成功收到伺服器回應！");

      var selected_city = $('.selected-city').text();
      var drp = $('[data-id="daterangepicker"]').text();
      var start_date = drp.substr(0,10);
      var end_date = drp.substr(13,10);

      data = cityFilter(data, selected_city);
      data = timeFilter(data, start_date, end_date);

      paginationGenerator(data, pn = 1); // First time pagination made
      renderDataOnPage(data, pn = 1); // First time render

      $(document).on("click", 'li.page-number', function(e){ //原本使用click(...), 但改變後的DOM無法被點選(頁碼失效),改用on(click,...)
        var number = parseInt($(this).attr('data-value'));
        paginationGenerator(data, pn = number);
        renderDataOnPage(data, pn = number);
      });

      $(document).on("click", 'li.page-next', function(e){
        var pn = parseInt($('.page-number.active').attr('data-value')); // 即將跳轉頁數, 以目前所在頁數初始化
        var totalCount = data.length;
        var pageSize = 10;
        var pageTotal = Math.ceil(totalCount / pageSize);
        if($(this).attr('data-id') == "pager-first-btn"){pn = 1;}
        else if($(this).attr('data-id') == "pager-last-btn"){pn = pageTotal;}
        else if($(this).attr('data-id') == "pager-previous-btn"){pn = ((pn == 1)? pn : pn - 1);}
        else if($(this).attr('data-id') == "pager-next-btn"){pn = ((pn == pageTotal)? pn : pn + 1);}
        else{alert("頁碼發生問題，請回報至我的github"); return false;}
        paginationGenerator(data, pn);
        renderDataOnPage(data, pn);
      });
    },
    error:function(){
      alert("Ajax請求失敗，請重新整理頁面！");
    }
  });
}

$(document).ready(function(){
    getAPIData();
    $('[data-group="city"]').click(getAPIData);
    $('[data-time]').click(getAPIData);
    $('.applyBtn.btn.btn-sm.btn-primary').click(getAPIData);
});
