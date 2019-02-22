var dat = []
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
Highcharts.dateFormat('%m-%d %H:%M')

function getData(aid) {
  resp = $.getJSON(
    "https://www.wuyingddg.cn/get_video_info/" + aid,
	function(result, status){
		if (status == "success") {
		  dat = result
		}
		else {
          alert("网络异常，请稍后再试")
          return
        }
	}
  )
  return resp
}

function getCol(matrix, col){
   var column = [];
   for(var i=0; i<matrix.length; i++){
	  column.push([matrix[i][0], matrix[i][col]]);
   }
   return column;
}

function buttonClick() {
	var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
	var resp = getData(aid)
  document.getElementById("prediction").innerHTML = dat
  Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Weather Data for Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
	xAxis: {
	  title: {
		text: '时间',
		style: {
		  fontSize: "18px",
		}
	  },
	  type: 'datetime',
	  minTickInterval: 100,
	  dateTimeLabelFormats: {
		day: '%H:%M'
	  }
	},
    yAxis: [{ // Primary yAxis
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        }

    }, { // Secondary yAxis
        title: {
            text: '222',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        }

    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
    },
    series: [{
        name: 'view',
        type: 'spline',
        yAxis: 1,
        data: getCol(dat, 1)
		
    }, {
        name: 'danmaku',
        type: 'spline',
        yAxis: 1,
        data: getCol(dat, 2)
		
    }, {
        name: 'reply',
        type: 'spline',
        yAxis: 1,
        data: getCol(dat, 3)
		
    }]
    })
}