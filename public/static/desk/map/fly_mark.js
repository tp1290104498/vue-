let requestAnimationFrameFly = window.requestAnimationFrameFly || window.webkitRequestAnimationFrame;
let cancelAnimationFrameFly  = window.cancelAnimationFrameFly || window.webkitCancelAnimationFrame;
/**
 * 可疑飞行物飞行轨迹绘制(只有存在map对象时才可以使用)
 * @param positionData 航迹数组
 * @constructor
 */

function TrackShow(positionData){
	if(!window.map || !window.BMap){
		return undefined;
	}
	this.positionData = positionData;
    var iconPath = 'static/desk/map/images/icon/';    //icon图标所在的文件夹
    var pointlygon_array = [];//折现需要的数组
    //单独设定图标的样式
    var icon_fly = new BMap.Icon(iconPath + 'fly-icon.png', new BMap.Size(16, 16), {
        anchor: new BMap.Size(10, 10)
    });

    if(Number.isNaN(this.num)){
    	return undefined;
    }//至少1个点

    for (var i = 0; i < this.positionData.length; i++) {
        var marker_p = new BMap.Marker(new BMap.Point(this.positionData[i][0],this.positionData[i][1]), {icon: icon_fly});//标创建注点
        var content = '可疑飞行物';
        map.addOverlay(marker_p);//添加覆盖物
        addClickHandler(content,this.positionData[i][0],this.positionData[i][1]);//调用点击方法
        pointlygon_array[i] = new BMap.Point(this.positionData[i][0],this.positionData[i][1])
    }
    var polygon = new BMap.Polyline(pointlygon_array,{strokeColor:"red", strokeWeight:1,strokeOpacity:0.5});//创建折线
    map.addOverlay(polygon);//添加覆盖物

    var opts = {
        width : 250,     // 信息窗口宽度
        height: 80,     // 信息窗口高度
        title : "当前位置" , // 信息窗口标题
        enableMessage:true//设置允许信息窗发送短息
       };
    function addClickHandler(content,lng,lat){
        marker_p.addEventListener("click",function(e){
            var point = new BMap.Point(lng, lat);
            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
    }
}
