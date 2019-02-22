var dat = []
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
Highcharts.dateFormat('%m-%d<br/>%H:%M')

function getData(aid) {
  resp = $.getJSON(
    "https://www.wuyingddg.cn/get_video_info/" + aid,
	function(result, status){
		if (status == "success") {
		  info = result['video_info']
		  if (info == 'failed'){
			    alert("视频不在数据库中，请检查aid是否正确")
				return
		  }
		  dat = result['data']
		  //document.getElementById("prediction").innerHTML = info
		  Highcharts.chart('container', {
			chart: {
                zoomType: 'xy',
                height: 600,
                width: 840
            }, 
			credits: {
				enabled: false
			},
			title: {
				text: '<a href="https://www.bilibili.com/video/av{0}" target="_blank" rel="nofollow noopener">{1}</a>'.format(aid, info[8]),
				useHTML: true
			},

			subtitle: {
				text: 'up主：{0}<span style="font-size:16px; color:#ffffff">.....</span>投稿日期：{1}'.format(info[5], info[3])
			},
			xAxis: {
              min: dat[0][0],
              max: dat[dat.length - 1][0],
              type: 'datetime',
              minTickInterval: 600,
              dateTimeLabelFormats: {
                day: '%H:%M<br/>%y/%m/%d'
              },
				gridLineWidth: 1
            },
			yAxis: [{ // Primary yAxis
				title: {
					text: '播放',
					style: {
						fontSize: "18px"
					}
				},
				minTickInterval: 1,
				gridLineWidth: 1

			}, { // Secondary yAxis
				title: {
					text: '其他',
					style: {
						fontSize: "18px"
					}
				},
				opposite: true,
				minTickInterval: 1,
				gridLineWidth: 1
			}],
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},

			series: [{
				name: '播放',
				yAxis: 0,
				data: getCol(dat, 1)
			}
			, {
				name: '弹幕',
				yAxis: 1,
				data: getCol(dat, 2),
				visible: false
			}, {
				name: '评论',
				yAxis: 1,
				data: getCol(dat, 3),
				visible: false
			}, {
				name: '收藏',
				yAxis: 1,
				data: getCol(dat, 4),
				visible: false
			}, {
				name: '硬币',
				yAxis: 1,
				data: getCol(dat, 5),
				visible: false
			}, {
				name: '分享',
				yAxis: 1,
				data: getCol(dat, 6),
				visible: false
			}, {
				name: '点赞',
				yAxis: 1,
				data: getCol(dat, 7),
				visible: false
			}],

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}

		});
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
  String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
      return result;
    }
    var data = arguments;
    if (arguments.length == 1 && typeof(args) == "object") {
      data = args;
    }
    for (var key in data) {
      var value = data[key];
      if (undefined != value) {
        result = result.replace("{" + key + "}", value);
      }
    }
    return result;
  }
function buttonClick() {
  var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
  getData(aid)
}