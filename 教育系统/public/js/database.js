/**
 * 模拟数据集合
 */
var roleArr;//角色数据
var dateArr;//日历数据
var peopleArr;//人员数据
var depArr;//部门数据
var studentArr;  //学生数据
var workArr;//排课数据
var classArr;//班级基本信息
var classExpArr;//班级详细信息
var classCourseArr;//班级课程设置；
var courseArr;   //课程数据
var jieDuanArr;   //阶段数据
var stageArr;     //阶段内容数据
var userArr;//账户
/*var timesArrZ;//时间
var timesArrZs;//时间
var timesArrAd;//时间
timesArrZ=[];
timesArrZs=[];
timesArrAd=[];*/
userArr=[
    {"username":"zoujie","pwd":"123456"},
    {"username":"zhangjie","pwd":"123456"},
    {"username":"admin","pwd":"admins"}
];
/*roleNo:角色ID,roleName:角色名称,roleDes:角色描述,roleBz:角色备注*/
roleArr=[{"roleNo":1,"roleName":"项目经理","roleDes":"排课","roleBz":"经理"},
    {"roleNo":2,"roleName":"人事经理","roleDes":"学生管理","roleBz":"经理"},
    {"roleNo":3,"roleName":"管理员","roleDes":"系统管理员","roleBz":"管理人员"},
    {"roleNo":4,"roleName":"游客","roleDes":"学生管理","roleBz":"游客"}];
/*data:休假的日期*/
dateArr=[
     {"data":"2017-10-1"},
     {"data":"2017-10-2"},
     {"data":"2017-10-3"},
     {"data":"2017-10-4"},
     {"data":"2017-10-5"},
     {"data":"2017-10-6"},
     {"data":"2017-10-7"}];


/*depNo:部门编号，depName:部门名称，depDect:部门主管,depNum:部门总人数，depBz:部门备注*/
depArr=[
    {"depNo":1,"depName":"Web前端","depDect":"邹杰","depNum":0,"depBz":"前端方向"},
    {"depNo":2,"depName":"UI","depDect":"唐钰伟","depNum":0,"depBz":"UI方向"},
    {"depNo":3,"depName":"java","depDect":"杨挽岚","depNum":0,"depBz":"人事方向"}
];
/*peopleNo:人员Id,depName:部门名称,peopleName:人员姓名，peopleAcount:登录账号，peoplePhone:联系电话，peopleQQ:联系qq,peopleEmail:联系邮箱。roleName:角色名称*/
peopleArr=[
    {"peopleNo":1,"depName":"UI","peopleName":"邹杰","peopleAcount":"zoujie","peoplePhone":12345678,"peopleQQ":123950,"peopleEmail":"zoujie@westec.com","roleName":"项目经理"},
    {"peopleNo":2,"depName":"Web前端","peopleName":"张杰","peopleAcount":"zhangjie","peoplePhone":12345678,"peopleQQ":123950,"peopleEmail":"zoujie@westec.com","roleName":"人事"}
];

/*workClass:排课班级,workName:上课人姓名，workStage:阶段数*/
workArr=[
    {"workClass":"139","workName":"林依娜","workStage":"4阶段"},
    {"workClass":"140","workName":"郭丽娜","workStage":"1阶段"}
];

var myDate=new Date();
//courseNo课程id，courseName课程名称courseNum课程阶段courseDay总天数courseDate填写时间courseBei备注
courseArr=[
    {"courseNo":1,"courseName":"web前端","stageName":4,"courseDay":140,"courseDate":myDate.toLocaleDateString(),"courseBei":"专业课"},
    {"courseNo":2,"courseName":"JAVA","stageName":4,"courseDay":140,"courseDate":myDate.toLocaleDateString(),"courseBei":"专业课"},
    {"courseNo":3,"courseName":"职业素养课","stageName":2,"courseDay":140,"courseDate":myDate.toLocaleDateString(),"courseBei":"专业课"},
    {"courseNo":4,"courseName":"UI预科班","stageName":4,"courseDay":140,"courseDate":myDate.toLocaleDateString(),"courseBei":"专业课"}
];
/*
 课程对应的不同阶段
 courseNo:课程ID stageName：阶段名称   name:学习内容   day:阶段学习天数
 */
jieDuanArr=[
    {"courseNo":1,"stageName":"1"},
    {"courseNo":1,"stageName":"2"},
    {"courseNo":1,"stageName":"3"},
    {"courseNo":1,"stageName":"4"},
    {"courseNo":2,"stageName":"1"},
    {"courseNo":2,"stageName":"2"},
    {"courseNo":2,"stageName":"3"},
    {"courseNo":2,"stageName":"4"},
    {"courseNo":3,"stageName":"1"},
    {"courseNo":3,"stageName":"2"},
    {"courseNo":4,"stageName":"1"},
    {"courseNo":4,"stageName":"2"},
    {"courseNo":4,"stageName":"3"},
    {"courseNo":4,"stageName":"4"}
];
//课程id,阶段名称，阶段类容名称，内容天数
stageArr=[
    {"courseNo":1,"stageName":"1","name":"aXre","day":10},
    {"courseNo":1,"stageName":"2","name":"HTML","day":5},
    {"courseNo":1,"stageName":"2","name":"JS","day":15},
    {"courseNo":1,"stageName":"3","name":"MySQL","day":7},
    {"courseNo":1,"stageName":"4","name":"vue","day":15},

    {"courseNo":2,"stageName":"1","name":"HTML ","day":4},
    {"courseNo":2,"stageName":"2","name":"Oracle11g","day":10},
    {"courseNo":2,"stageName":"2","name":"JavaSE 7.0面向对象","day":16},
    {"courseNo":2,"stageName":"3","name":"JavaSript&Ajax","day":5},
    {"courseNo":2,"stageName":"4","name":"Struts2框架技术","day":8},
    {"courseNo":2,"stageName":"4","name":"Hibernate3/4完成 数据库ORM映射 复杂数据请求构建","day":7},

    {"courseNo":3,"stageName":"1","name":"职业素养","day":0.5},
    {"courseNo":3,"stageName":"2","name":"职业素养","day":0.5},

    {"courseNo":4,"stageName":"1","name":"素描速写","day":10},
    {"courseNo":4,"stageName":"2","name":"WEB界面设计","day":5},
    {"courseNo":4,"stageName":"2","name":"学习Axure","day":5},
    {"courseNo":4,"stageName":"3","name":"艺术设计","day":7},
    {"courseNo":4,"stageName":"4","name":"APP界面设计","day":15}
];

/**
 *classNo:班级编号,No:学号,name：姓名,sex：性别，phone:联系电话，QQ：联系qq，gradTime:毕业时间，edu:学历,gradSchool:毕业学校，conNum:紧急联系电话，fiPre:添加人，fiTime:添加时间
 */
studentArr=[
    {"classNo":"126","No":1,"name":"雷云凯","phone":"12345896321","gradTime":"2017","edu":"本科","gradSchool":"四川大学","conNum":"12348963457","fiPre":"娜姐","fiTime":"2017-7-17"},
    {"classNo":"126","No":2,"name":"袁铭","phone":"25134258965","gradTime":"2017","edu":"本科","gradSchool":"农业大学","conNum":"45677852365","fiPre":"娜姐","fiTime":"2017-7-17"},
    {"classNo":"126","No":3,"name":"岳勇静","phone":"13645789632","gradTime":"2017","edu":"专科","gradSchool":"四川大学","conNum":"56784852103","fiPre":"娜姐","fiTime":"2017-7-17"},
    {"classNo":"126","No":4,"name":"李红燕","phone":"22534456231","gradTime":"2017","edu":"专科","gradSchool":"农业大学","conNum":"20132501369","fiPre":"娜姐","fiTime":"2017-7-17"},
    {"classNo":"126","No":5,"name":"武文斌","phone":"14527896321","gradTime":"2017","edu":"本科","gradSchool":"四川大学","conNum":"12347852140","fiPre":"娜姐","fiTime":"2017-7-17"},
    {"classNo":"126","No":6,"name":"杨胜","phone":"85663796254","gradTime":"2017","edu":"本科","gradSchool":"农业大学","conNum":"12348635475","fiPre":"娜姐","fiTime":"2017-7-17"},
];


//班级编号：classNo 班级名字：className 班级开班日期：classStartDay  班级总人数:classStuUs 班级qq群名字：classQQ 班级备注：classBz
classArr = [
    {"classNo": "126", "className": "web前端","classRoom":"15","classStartDay": "2017/9/27","classStuAll": 0, "classQQ": 1234567,"classZt":"在读", "classBz": "这是百杰125班","creater":"管理员","createTime":"2017/9/27"},
    {"classNo": "125", "className": "JAVA", "classRoom":"16","classStartDay": "2017/9/27","classStuAll": 0, "classQQ": 54545457,"classZt":"预科", "classBz": "这是百杰126班","creater":"管理员","createTime":"2017/9/26"},
];
//班级总人数：classStuAll 班级男生人数：classStumale 班级女生人数：classStuFamale 班级专科学历人数：classStuColl 班级本科人数学历：classStuUs 班级高中及以下人数:classStuHigh
classExpArr = [
    {"classStuAll": 0, "classStuMale": 0, "classStuFamale": 0, "classStuColl": 0, "classStuUs": 0, "classStuHigh": 0}
];
//班级编号：classNo 班级课程名称：courseName 班级课程开始时间:classCourseTime 班级阶段：stageName 班级授课人：peopleName 班级授课人重复周期：classRepeat
classCourseArr = [
    [
        {"classNo": "126", "courseName": "web前端", "classCourseTime": "2017/9/27", "stageName": "一阶段", "peopleName": "邹杰", "classRepeat": "星期五"},
        {"classNo": "125", "courseName": "JAVA", "classCourseTime": "2017/9/28", "stageName": "一阶段", "peopleName": "邹杰", "classRepeat": "每天"},
    ],
    [
        {"classNo": "126", "courseName": "web前端", "classCourseTime": "2017/9/27", "stageName": "2阶段", "peopleName": "王芳", "classRepeat": "每天"},
        {"classNo": "125", "courseName": "JAVA", "classCourseTime": "2017/9/28", "stageName": "2阶段", "peopleName": "王芳", "classRepeat": "每天"},
    ],
    [
        {"classNo": "126", "courseName": "web前端", "classCourseTime": "2017/9/27", "stageName": "3阶段", "peopleName": "林毅娜", "classRepeat": "每天"},
        {"classNo": "125", "courseName": "JAVA", "classCourseTime": "2017/9/26", "stageName": "3阶段", "peopleName": "林毅娜", "classRepeat": "每天"},
    ],
    [
        {"classNo": "126", "courseName": "web前端", "classCourseTime": "2017/9/27", "stageName": "4阶段", "peopleName": "唐钰伟", "classRepeat": "每天"},
        {"classNo": "125", "courseName": "JAVA", "classCourseTime": "2017/9/26", "stageName": "4阶段", "peopleName": "杨阳", "classRepeat": "每天"},
    ]
];

