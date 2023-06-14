var dat = []
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
Highcharts.dateFormat('%H:%M<br/>%y/%m/%d')

function getData(mid) {
  resp = $.getJSON(
    "http://152.136.139.202/api/get_up_fans/" + mid,
	function(result, status){
		if (status == "success") {
		  up_name = result['up_name']
		  if (up_name == 'failed'){
			    alert("视频不在数据库中，请检查mid是否正确")
				return
		  }
		  dat = result['data']
		  dat.sort()
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
				text: '<a href="https://space.bilibili.com/{0}" target="_blank" rel="nofollow noopener">{1}</a>'.format(mid, up_name),
				useHTML: true
			},

			// subtitle: {
			// 	text: 'up主：{0}<span style="font-size:16px; color:#ffffff">.....</span>投稿日期：{1}'.format(info[5], info[3])
			// },
			xAxis: {
			      //min: dat[0][0],
			      //max: dat[dat.length - 1][0],
			      type: 'datetime',
			      minTickInterval: 600,
			      gridLineWidth: 1,
			  labels: {		          
					formatter: function () {						
						return Highcharts.dateFormat('%H:%M<br/>%y/%m/%d',this.value); 						
					}
				}
            },
			yAxis: [{ // Primary yAxis
				title: {
					text: '粉丝量',
					style: {
						fontSize: "18px"
					}
				},
				minTickInterval: 1,
				gridLineWidth: 1

			},
			//  { // Secondary yAxis
			// 	title: {
			// 		text: '其他',
			// 		style: {
			// 			fontSize: "18px"
			// 		}
			// 	},
			// 	opposite: true,
			// 	minTickInterval: 1,
			// 	gridLineWidth: 1
			// }
		],
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},

			series: [{
				name: '粉丝量',
				yAxis: 0,
				data: getCol(dat, 2)
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
  var mid = document.getElementById("mid").value
  getData(mid)
}
