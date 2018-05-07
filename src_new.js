var tid = 1
var areaName = ''
var dat = new Array()
var areaId = ''
var k, b
dat = []

function showList(o) {
  hideList("dropdown-content" + o.id);
  document.getElementById("dropdown-" + o.id).classList.toggle("show");
}

function changeTo(o) {
  if (areaId != '') {
    document.getElementById(areaId).style.background = ''
    document.getElementById(areaId).style.color = ''
    document.getElementById(tid).style.background = ''
    document.getElementById(tid).style.color = ''
  }
  areaId = o.parentNode.id.replace(/[^0-9]/ig, "")
  areaName = document.getElementById(areaId).innerHTML + " → " + o.innerHTML
  tid = o.id
  document.getElementById("type-hint").innerHTML = areaName
  //document.getElementById("submit").inneropenDropdown.style.background = ""HTML = "<div><button onclick=\"buttonClick()\" class=\"btn submit-btn\">预测</button></div>"
  document.getElementById("submit").style.display = "";
  document.getElementById(areaId).style.background = '#1f75cf'
  document.getElementById(areaId).style.color = '#fff'
  document.getElementById(tid).style.background = '#1f75cf'
  document.getElementById(tid).style.color = '#fff'
}

function hideList(option) {
  var dropdowns = document.getElementsByClassName("dropdown-content");

  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.id != option) {
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    hideList("");
  }
}
Highcharts.setOptions({
  global: {
    useUTC: false
  }
});
Highcharts.dateFormat('%m-%d %H:%M')


function buttonClick() {
  $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/" + tid + ".json", function(result, status) {
    if (status == "success") {
      dat = result.sort()
      $.getJSON("https://www.wuyingddg.cn/whenPass/bilibili_data/" + tid + "_model.json", function(result2, status) {
        if (status == "success") {
          [k, b] = result2
          var aid = Number(document.getElementById("aid").value.replace(/[^0-9]/ig, ""))
          var prediction = (aid - b) / k
          var len = dat.length
          var line = [
            [dat[0][0], k * dat[0][0] + b],
            [dat[len - 1][0], k * dat[len - 1][0] + b]
          ]
          if (prediction > line[1][0]) {
            line[1] = [prediction, aid]
          }
          document.getElementById("prediction").innerHTML =
            '您的投稿 <font color="blue"><b>av{0}</b></font> 预计于 <font color="red"><b>{1}</b></font> 过审'.format(aid, Highcharts.dateFormat('%y-%m-%d %H:%M', prediction))
          Highcharts.chart('container', {
            title: {
              text: areaName
            },
            chart: {
              zoomType: 'x',
              height: 600,
              width: 840
            },
            xAxis: {
              title: {
                text: '过审时间',
                style: {
                  fontSize: "18px",
                }
              },
              min: line[0][0],
              max: Math.max(line[1][0], prediction),
              type: 'datetime',
              minTickInterval: 100,
              dateTimeLabelFormats: {
                day: '%H:%M'
              }
            },
            yAxis: {
              title: {
                text: ''
              },
              min: line[0][1],
              max: Math.max(line[1][1], aid),
              labels: {
                formatter: function() {
                  return this.value
                }
              }
            },
            tooltip: {
              formatter: function() {
                var d = new Date(this.x);
                var s = '<b>' + d.toLocaleString() + '</b>';
                s += '<br/><span style="color:' + 'black' + '">' + 'av' +
                  this.point.y.toFixed(0) + ' </span>';
                return s;
              }
            },
            series: [{
              name: '实际',
              color: 'red',
              type: 'scatter',
              events: {
                click: function(e) {
                  window.open("https://www.bilibili.com/video/av" + e.point.y);
                }
              },
              data: dat
            }, {
              name: '拟合',
              color: 'blue',
              type: 'spline',
              marker: {
                enabled: false
              },
              data: line
            }, {
              name: '预测',
              color: 'orange',
              type: 'scatter',
              marker: {
                symbol: 'square',
                radius: 10
              },
              data: [
                [prediction, aid]
              ]
            }]
          });
        } else {
          alert("网络异常，请稍后再试")
          return
        }
      })
    } else {
      alert("网络异常，请稍后再试")
      return
    }
  })
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
}