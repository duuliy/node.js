

var p=new Promise((resolve,reject)=>{
  $.ajax({
    url:"/userrejster",
    type:"post",
    success(data){
      console.log(data)
      let total=0
      let oldtotal=0

      if(data.count.length>0)
      {
        console.log("数据为fsdfdfdf",data.count[0].tolcount)
        total=data.count[0].tolcount//今年总的用户数量
      }
      if(data.oldtotal.length>0)
      {
        oldtotal=data.oldtotal[0].tolcount
      }
      var agetotal=Math.ceil((total+oldtotal)/2)

      console.log("总数量为",total,"去年总数量",oldtotal)
      //今年每月份
      let yearmonth=[]
      //去年每月份
      let oldyearmonth=[]
      let labels=[]
      //月份
      for(var i=0;i<data.evemoncount.length;i++)
      {
        labels.push(data.evemoncount[i]. mon+"月")
      }
      console.log("月份",labels)
      //今年的每个月的用户注册数量
      for(var i=0;i<data.evemoncount.length;i++)
      {
        console.log(data.evemoncount[i].everycount)
        console.log("大幅度",data.evemoncount[i].everycount/agetotal*100)
        var moncount=data.evemoncount[i].everycount/agetotal*100
        yearmonth.push(moncount)
      }
      //去年的每个月的用户注册数量
      for(var i=0;i<data.oldyearcount.length;i++)
      {
        var moncount=data.oldyearcount[i].everycount/agetotal*100
        oldyearmonth.push(moncount)
      }
      //两个折线图
      zhexian=[{
        label: "2016年",
        fillColor: "rgba(26, 18, 156,0.2)",
        strokeColor: "#1ABC9C",
        pointColor: "#1ABC9C",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#1ABC9C",
        data: oldyearmonth
      },{
        label: "My First dataset",
        fillColor: "rgba(26, 188, 156,0.2)",
        strokeColor: "#1ABC9C",
        pointColor: "#1ABC9C",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#1ABC9C",
        data: yearmonth
      }]
      console.log(yearmonth)
      var ctx, data, myLineChart, options;
      Chart.defaults.global.responsive = true;
      ctx = $('#line-chart').get(0).getContext('2d');
      options = {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: false,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 1,
        scaleStepWidth :0.5,
        datasetFill: true,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\">" +
        "</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
      };


      data = {
        labels:labels,
        datasets:zhexian};
      myLineChart = new Chart(ctx).Line(data, options);
      resolve()
    }

  })
})
p.then(()=>{
 $.ajax({
   url:"/orderzhexian",
   type:"post",
   success:ordershow,
   error(err){
     console.log(err.message)
   }
 })
}).then(()=>{
  $.ajax({
    url:"/getappoint",
    type:"post",
    success:getappoint,
    error(err){
      console.log(err.message)
    }
  })

})
//订单折线图
function ordershow(data)
{
  let total=0
  let oldtotal=0
  let bel=[];

  if(data.count.length>0)
  {
    console.log("数据为fsdfdfdf",data.count[0].tolcount)
    total=data.count[0].tolcount//今年总的用户数量
  }
  if(data.oldtotal.length>0)
  {
    oldtotal=data.oldtotal[0].tolcount
  }
  var agetotal=Math.ceil((total+oldtotal)/2)

  console.log("总数量为",total,"去年总数量",oldtotal)
  //今年每月份
  let yearmonth=[]
  //去年每月份
  let oldyearmonth=[]

  //今年的每个月的用户注册数量
  for(var i=0;i<data.evemoncount.length;i++)
  {
    console.log(data.evemoncount[i].everycount)
    console.log("大幅度",data.evemoncount[i].everycount/agetotal*100)
    var moncount=data.evemoncount[i].everycount/agetotal*100
    bel.push((i+1)+"月")
    yearmonth.push(moncount)
  }
  //去年的每个月的用户注册数量
  for(var i=0;i<data.oldyearcount.length;i++)
  {
    var moncount=data.oldyearcount[i].everycount/agetotal*100
    oldyearmonth.push(moncount)
  }
  var ctx, data, myBarChart, option_bars;
  Chart.defaults.global.responsive = true;
  ctx = $('#bar-chart').get(0).getContext('2d');
  option_bars = {
    scaleBeginAtZero: true,
   scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: false,
   barShowStroke: false,
    barStrokeWidth: 0,
    barValueSpacing: 5,
   barDatasetSpacing: 1,
   legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
 };
  data = {
    labels: bel,
   datasets: [
     {
       fillColor: "rgba(34, 167, 240,0.6)",
       strokeColor : "rgba(151,187,205,1)",
       data: oldyearmonth
     },
      {
        fillColor: "rgba(26, 188, 156,0.6)",
        strokeColor : "rgba(220,220,220,1)",
        data:yearmonth
      }
   ]
 };
 myBarChart = new Chart(ctx).Bar(data, option_bars);


}
function getappoint(data)
{
  console.log("得到预约信息",data)
  let total=0
  let bels=[];
  let belsdate=[]
  if(data.count.length>0)
  {
    total=data.count[0].tolcount
  }
  for(var i=0;i<data.evemoncount.length;i++)
  {
    var monvalue=data.evemoncount[i].everycount/total;
    bels.push(i+1+"月")
    belsdate.push(monvalue)
  }

  var ctx, data, myLineChart, options;
  Chart.defaults.global.responsive = true;
  ctx = $('#yu-chart').get(0).getContext('2d');
  options = {
    showScale: false,
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: false,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
   pointHitDetectionRadius: 20,
   datasetStroke: true,
    datasetStrokeWidth: 2,
   datasetFill: true,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  };
  data = {
    labels:bels,
    datasets: [
      {
        label: "My Second dataset",
        fillColor: "rgba(34, 167, 240,0.2)",
       strokeColor: "#22A7F0",
        pointColor: "#22A7F0",
       pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
       pointHighlightStroke: "#22A7F0",
             data:belsdate
   }
  ]
  };
  myLineChart = new Chart(ctx).Line(data, options);
}









//$(function() {
//
//  var ctx, data, myLineChart, options;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#line-chart').get(0).getContext('2d');
//  options = {
//    scaleShowGridLines: true,
//    scaleGridLineColor: "rgba(0,0,0,.05)",
//    scaleGridLineWidth: 1,
//    scaleShowHorizontalLines: true,
//    scaleShowVerticalLines: true,
//    bezierCurve: false,
//    bezierCurveTension: 0.4,
//    pointDot: true,
//    pointDotRadius: 4,
//    pointDotStrokeWidth: 1,
//    pointHitDetectionRadius: 20,
//    datasetStroke: true,
//    datasetStrokeWidth: 1,
//    scaleStepWidth :0.5,
//    datasetFill: true,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\">" +
//    "</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//  };
//
//
//  data = {
//    labels: ['一月', '二月', '三月', 'Apr', 'May', 'Jun', 'Jul'],
//    datasets: [
//      {
//        label: "My First dataset",
//        fillColor: "rgba(26, 188, 156,0.2)",
//        strokeColor: "#1ABC9C",
//        pointColor: "#1ABC9C",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#1ABC9C",
//        data: [65, 59, 80, 81, 56, 55, 40]
//      }, {
//        label: "My Second dataset",
//        fillColor: "rgba(34, 167, 240,0.2)",
//        strokeColor: "#22A7F0",
//        pointColor: "#22A7F0",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#22A7F0",
//        data: [28, 48, 40, 19, 86, 27, 90]
//      }
//    ]
//  };
//  myLineChart = new Chart(ctx).Line(data, options);
//});

//$(function() {
//  var ctx, data, myBarChart, option_bars;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#bar-chart').get(0).getContext('2d');
//  option_bars = {
//    scaleBeginAtZero: true,
//    scaleShowGridLines: true,
//    scaleGridLineColor: "rgba(0,0,0,.05)",
//    scaleGridLineWidth: 1,
//    scaleShowHorizontalLines: true,
//    scaleShowVerticalLines: false,
//    barShowStroke: true,
//    barStrokeWidth: 1,
//    barValueSpacing: 5,
//    barDatasetSpacing: 3,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//  };
//  data = {
//    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//    datasets: [
//      {
//        label: "My First dataset",
//        fillColor: "rgba(26, 188, 156,0.6)",
//        strokeColor: "#1ABC9C",
//        pointColor: "#1ABC9C",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#1ABC9C",
//        data: [65, 59, 80, 81, 56, 55, 40]
//      }, {
//        label: "My Second dataset",
//        fillColor: "rgba(34, 167, 240,0.6)",
//        strokeColor: "#22A7F0",
//        pointColor: "#22A7F0",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#22A7F0",
//        data: [28, 48, 40, 19, 86, 27, 90]
//      }
//    ]
//  };
//  myBarChart = new Chart(ctx).Bar(data, option_bars);
//});
//
//$(function() {
//  var ctx, data, myBarChart, option_bars;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#radar-chart').get(0).getContext('2d');
//  option_bars = {
//    scaleBeginAtZero: true,
//    scaleShowGridLines: true,
//    scaleGridLineColor: "rgba(0,0,0,.05)",
//    scaleGridLineWidth: 1,
//    scaleShowHorizontalLines: true,
//    scaleShowVerticalLines: false,
//    barShowStroke: false,
//    barStrokeWidth: 0,
//    barValueSpacing: 5,
//    barDatasetSpacing: 1,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//  };
//  data = {
//    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//    datasets: [
//      {
//        label: "My First dataset",
//        fillColor: "rgba(26, 188, 156,0.2)",
//        strokeColor: "#1ABC9C",
//        pointColor: "#1ABC9C",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#1ABC9C",
//        data: [65, 59, 80, 81, 56, 55, 40]
//      }, {
//        label: "My Second dataset",
//        fillColor: "rgba(34, 167, 240,0.2)",
//        strokeColor: "#22A7F0",
//        pointColor: "#22A7F0",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#22A7F0",
//        data: [28, 48, 40, 19, 86, 27, 90]
//      }
//    ]
//  };
//  myBarChart = new Chart(ctx).Radar(data, option_bars);
//});
//
//$(function() {
//  var ctx, data, myPolarAreaChart, option_bars;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#polar-area-chart').get(0).getContext('2d');
//  option_bars = {
//    scaleShowLabelBackdrop: true,
//    scaleBackdropColor: "rgba(255,255,255,0.75)",
//    scaleBeginAtZero: true,
//    scaleBackdropPaddingY: 2,
//    scaleBackdropPaddingX: 2,
//    scaleShowLine: true,
//    segmentShowStroke: true,
//    segmentStrokeColor: "#fff",
//    segmentStrokeWidth: 2,
//    animationSteps: 100,
//    animationEasing: "easeOutBounce",
//    animateRotate: true,
//    animateScale: false,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
//  };
//  data = [
//    {
//      value: 300,
//      color: "#FA2A00",
//      highlight: "#FA2A00",
//      label: "Red"
//    }, {
//      value: 50,
//      color: "#1ABC9C",
//      highlight: "#1ABC9C",
//      label: "Green"
//    }, {
//      value: 100,
//      color: "#FABE28",
//      highlight: "#FABE28",
//      label: "Yellow"
//    }, {
//      value: 40,
//      color: "#999",
//      highlight: "#999",
//      label: "Grey"
//    }, {
//      value: 120,
//      color: "#22A7F0",
//      highlight: "#22A7F0",
//      label: "Blue"
//    }
//  ];
//  myPolarAreaChart = new Chart(ctx).PolarArea(data, option_bars);
//});
//
//$(function() {
//  var ctx, data, myLineChart, options;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#pie-chart').get(0).getContext('2d');
//  options = {
//    showScale: false,
//    scaleShowGridLines: false,
//    scaleGridLineColor: "rgba(0,0,0,.05)",
//    scaleGridLineWidth: 0,
//    scaleShowHorizontalLines: false,
//    scaleShowVerticalLines: false,
//    bezierCurve: false,
//    bezierCurveTension: 0.4,
//    pointDot: false,
//    pointDotRadius: 0,
//    pointDotStrokeWidth: 2,
//    pointHitDetectionRadius: 20,
//    datasetStroke: true,
//    datasetStrokeWidth: 4,
//    datasetFill: true,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//  };
//  data = [
//    {
//      value: 300,
//      color: "#FA2A00",
//      highlight: "#FA2A00",
//      label: "Red"
//    }, {
//      value: 50,
//      color: "#1ABC9C",
//      highlight: "#1ABC9C",
//      label: "Green"
//    }, {
//      value: 100,
//      color: "#FABE28",
//      highlight: "#FABE28",
//      label: "Yellow"
//    }
//  ];
//  myLineChart = new Chart(ctx).Pie(data, options);
//});
//
//$(function() {
//  var ctx, data, myLineChart, options;
//  Chart.defaults.global.responsive = true;
//  ctx = $('#jumbotron-line-chart').get(0).getContext('2d');
//  options = {
//    showScale: false,
//    scaleShowGridLines: true,
//    scaleGridLineColor: "rgba(0,0,0,.05)",
//    scaleGridLineWidth: 1,
//    scaleShowHorizontalLines: true,
//    scaleShowVerticalLines: true,
//    bezierCurve: false,
//    bezierCurveTension: 0.4,
//    pointDot: true,
//    pointDotRadius: 4,
//    pointDotStrokeWidth: 1,
//    pointHitDetectionRadius: 20,
//    datasetStroke: true,
//    datasetStrokeWidth: 2,
//    datasetFill: true,
//    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//  };
//  data = {
//    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//    datasets: [
//      {
//        label: "My Second dataset",
//        fillColor: "rgba(34, 167, 240,0.2)",
//        strokeColor: "#22A7F0",
//        pointColor: "#22A7F0",
//        pointStrokeColor: "#fff",
//        pointHighlightFill: "#fff",
//        pointHighlightStroke: "#22A7F0",
//        data: [28, 48, 40, 45, 76, 65, 90]
//      }
//    ]
//  };
//  myLineChart = new Chart(ctx).Line(data, options);
//});
