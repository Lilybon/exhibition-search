$(document).ready(function(){
    var url ="https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success:function(e){
      $(e).each(function(){
      var c = "<p>" + this.title + "</p>";
      c+="<p>" + this.showUnit + "</p>";
      c+="<p>" + this.webSales + "</p>";
      c+="<p>" + this.startDate + "~"  + this.endDate + "</p>";
      $(".container").append(c);
      });
      },
      error:function(){console.log("fail")}
    })
});
