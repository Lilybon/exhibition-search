展覽資訊查詢網站
製作時間
2018/5/19~2018/5/
使用API
	https://data.gov.tw/dataset/6012

使用工具
	html css js jQuery(AJAX) Bootstrap4 FontAwesome(icon) OnlineJSONViewer 月曆套件(方便使用者選取daterange)

實作目標
	1.RWD設計-盡量讓網頁在各種尺寸的螢幕呈現上都平易近人
	2.查詢功能-依照地區、時間篩選並呈現展覽資訊
		簡易按鈕篩選
			地區: 各縣市
			時間段: 年月日~年月日(由A.外掛月曆 B.粗略選項 共同決定)
			活動類型:

	3.動態頁碼產生器

資料主要欄位
version(發行版本) -useless
UID(唯一辨識碼) -useless
	title(活動名稱) -important
	category(活動類別) -important,是給數字,但它API沒說明,要另外去查或自己定義了
	showUnit(演出單位)
	descriptionFilterHtml(簡介說明) -important
discountInfo(折扣資訊) -useless,格式雜且大多是空值
imageURL(圖片連結) - useless,沒放網址
	masterUnit(主辦單位)
subUnit(協辦單位) -useless
supportUnit(贊助單位) -useless
otherUnit(其他單位) -useless
webSales(售票網址) -useless,沒放網址
	sourceWebPromote(推廣網址) -important,可以在點擊title後連結網站
comment(備註) -useless
editModifyDate(編輯時間) -useless
	sourceWebName(來源網站名稱)
	startDate(活動起始日期) -important
	endDate(活動結束日期) -important
hitRate(點閱數) -useless,它全部給0
	showinfo(活動場次資訊) -important
	time(單場次演出時間)
	location(地址) -important,用來篩選區域
	locationName(場地名稱) -important
	onSales(是否售票) -important
	latitude(緯度) -important,可考慮設個按紐接google map api,但要注意也有很多垃圾值(null,0.0,"")
	longitude(經度) -important,可考慮設個按紐接google map api,但要注意也有很多垃圾值(null,0.0,"")
Price(售票說明) -useless,格式雜且很多空值
endTime(結束時間) -uncertain,其實有結束日期好像就夠了


	篩選過後的有價值欄位
	title
	category
	descriptionFilterHtml
	sourceWebPromote
	startDate
	endDate
	location
	locationName
	onSales
	latitude
	longitude
