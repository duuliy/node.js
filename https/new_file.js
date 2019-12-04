//方法
Vue.prototype.$closeLoading = function() {
	var html = document.getElementsByTagName("html")[0];
	html.style.height = "auto";
	document.body.style.height = "auto";
	document.body.style.overflow = "auto";
	var loading = document.getElementById("loading");
	if(!loading) {
		return
	}
	loading.style.display = "none";
}

Vue.prototype.$hideScroll = function() {
	var html = document.getElementsByTagName("html")[0];
	html.style.height = "100%";
	document.body.style.height = "100%";
	document.body.style.overflow = "hidden";
}

//用户状态控制
Vue.prototype.$userStatusManage = (function() {
	let obj = {};
	obj.__proto__ = Vue.prototype;
	//uid :用户id
	//status: 状态
	//showmsg:是否显示msg
	obj.setuserstatus =  function(uid, status, showmsg) {
		let obj1 = {
			status: status,
			userid: uid
		};

		return api.updatestatus(obj1).then(obj => {
			if(obj.code == 1) {
				
				if(showmsg){
					this.$notify({
						title: '成功！',
						message: '更新个人状态成功!',
						type: 'success'
					});
				}	
				//离线不保存上次状态
				if(status != 0) {
					var storage = window.localStorage;
					storage.userstatus = JSON.stringify(obj1);
				}
				return Promise.resolve(true);
			} else {
				if(showmsg){
					this.$message.error('更新个人状态失败!');
				}
				return Promise.reject(false);
					
			}

		}).catch(error => {
			if(showmsg){
				this.$message.error('更新个人状态失败!');
			}
			return Promise.reject(false);
		});

	}
	


	//获取当前用户状态文本
	obj.getuserstatusTxt = function(uid) {
		if(localStorage.userstatus) {
			let userstatus = JSON.parse(localStorage.userstatus);
			if(userstatus.userid == uid) {
				var result = "";
				switch(userstatus.status) {
					case "0":
						result = "离线";
						break;
					case "1":
						result = "正常";
						break;
					case "2":
						result = "忙碌中";
						break;
						case "3":
						result = "休假中";
						break;
					default:
						result = "正常";
						break;
				}
				return result;
			} else {
                return "正常";
			}

		} else {
			return "正常";
		}
	}
	//获取当前用户状态
	obj.getuserstatus = function(uid) {
		if(localStorage.userstatus) {
			let userstatus = JSON.parse(localStorage.userstatus);
			if(userstatus.userid == uid) {
			
			return userstatus.status;
			}
			else 
			{
				return "1";
			}
		} else {
			return "1";
		}
	}

	obj.login = function(uid) {
		let status = this.getuserstatus(uid);
		this.setuserstatus(uid, status, false);

	}

	obj.loginOut = function(uid) {

		this.setuserstatus(uid, 0, false);

	}

	return obj;
})()

/*Vue.prototype.$getFileType = function(fileName) {
	if(fileName) {
		let str = fileName.substring(fileName.length - 3, fileName.length);
		return str;
	}
	return "";
}*/

Vue.prototype.$getFileType = function(url) {
	if(url) {
		let index = url.lastIndexOf(".");
		let docName = url.slice(index + 1, url.length);
		return docName.toLocaleLowerCase();
	}
	return "";
}

Vue.prototype.$getClassName = function(fileName) {
	let name = this.$getFileType(fileName).trim();
	if(name === 'pdf') {
		return 'icon-pdf'
	} else if(name === 'doc' || name === 'docx') {
		return 'icon-word'
	} else if(name === 'jpg' || name === 'jpeg' || name === 'png') {
		return 'icon-jpg'
	} else {
		return ''
	}
}

Vue.prototype.$formatTime = function(timeStr) {

}

Vue.prototype.$checkLogin = function() {

}

Vue.prototype.$checkUserLogin = function() {
	if(!localStorage.userData) {
		window.location.replace("../../public/login/login.html");
	} else {
		sessionStorage.userData = localStorage.userData;
	}

}

Vue.prototype.$checkBuilderLogin = function() {
	if(!localStorage.builderData) {
		window.location.replace("../../public/builder-login/login.html");
	} else {
		sessionStorage.builderData = localStorage.builderData;
	}

}
Vue.prototype.$checkQALogin = function() {
	if(!localStorage.QAdata) {
		window.location.replace("../../public/QA-login/login.html");
	} else {
		sessionStorage.QAdata = localStorage.QAdata;
	}
}

Vue.prototype.$checkFile = function(fileName) {
	let str = fileName.substring(fileName.length - 3, fileName.length).toLocaleLowerCase();
	if(str === 'pdf' || str === 'doc' || str === 'docx') {
		return true
	} else {
		return false
	}
}

Vue.prototype.$testPhone = function(phoneNum) {
	if((/^1[3|4|5|6|7|8]\d{9}$/.test(phoneNum))) {
		return true;
	} else {
		return false;
	}
}
Vue.prototype.$testEmail = function(email) {
	if((/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email))) {
		return true;
	} else {
		return false;
	}
}

Vue.prototype.$formatViewUrl = function(url) {
	let host = document.location.protocol + '//' + window.location.host;
	if(!url) {
		return host + '/pdfall/web/viewer.html?file=' + host + '/pdf/123.pdf';
	}
	let index = url.lastIndexOf(".");
	let name = url.slice(index + 1, url.length).toLocaleLowerCase();
	//http://192.168.0.127:64407/controller/File/PreviewFile?url=User/UserUpload\1526537016237.1.pdf
	if(name === 'pdf') {
		return host + '/pdfall/web/viewer.html?file=' + '/controller/File/PreviewFile?url=' + url;
	} else if(name === 'doc' || name === 'docx') {
		return 'https://view.officeapps.live.com/op/view.aspx?src=' + 'http://file.yitu666.com/' + url; //http://yhn1989.hk1.tunnelfrp.cc/
	} else if(name === 'jpg' || name === 'jpeg' || name === 'png') {
		return 'http://file.yitu666.com/' + url;
	}
}

Vue.prototype.$downLoad = function(url, fileName) {
	let a = document.createElement("a");
	let host = document.location.protocol + '//' + window.location.host;
	let downloadUrl;
	if(fileName) {
		downloadUrl = host + '/controller/File/PreviewFile?url=' + encodeURIComponent(url) + '&name=' + encodeURIComponent(fileName);
	} else {
		downloadUrl = host + '/controller/File/PreviewFile?url=' + encodeURIComponent(url);
	}
	a.setAttribute("href", downloadUrl);
	document.body.appendChild(a);
	setTimeout(() => {
		a.click();
		document.body.removeChild(a);
	}, 500);
}

Vue.prototype.$closePage = function() {
	window.opener = null;
	window.open('', '_self');
	window.close();
}

Vue.prototype.$full = function(src) {
	let url = this.$formatViewUrl(src);
	window.open(url);
}

Vue.prototype.$getPagePrice = function(difficulty) {
	switch(difficulty) {
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 8;
		case 6:
			return 10;
		case 7:
			return 12;
		case 8:
			return 15;
		default:
			return 5;
	}

}

Vue.prototype.$getPageMins = function(difficulty) {
	switch(difficulty) {
		case 1:
			return 5;
		case 2:
			return 8;
		case 3:
			return 12;
		case 4:
			return 15;
		case 5:
			return 18;
		case 6:
			return 20;
		case 7:
			return 25;
		case 8:
			return 30;
		default:
			return 15;
	}
}

Vue.prototype.$getPages = function(price, difficulty) {
	let pages = price / this.$getPagePrice(difficulty);
	return pages;
}

Vue.prototype.$calcBaseTime = function(price, difficulty) {
	//单页需要多少分钟
	let pages = this.$getPages(price, difficulty); //页数
	console.log(pages);
	let mins = this.$getPageMins(difficulty); //每页需要的时间
	//总页数消耗多少小时
	let hours = mins * pages / 60;
	let days = Math.ceil(hours / 24);
	console.log('baseDays', days);
	return days;
}

Vue.prototype.$calcPrice = function(price, difficulty, deadline) {
	let pages = this.$getPages(price, difficulty);
	let time = deadline.getTime();
	let now = new Date();
	let timeNow = now.getTime();
	let subTime = time - timeNow;
	let hours = Math.ceil(subTime / (1000 * 60 * 60));
	let days = Math.ceil(hours / 24);
	let newPrice;
	let baseDays = this.$calcBaseTime(price, difficulty);
	if(days >= baseDays) {
		newPrice = this.$getPagePrice(difficulty) * pages;
	} else {
		newPrice = this.$getPagePrice(difficulty) * pages * Math.pow(days / baseDays, -1);
	}
	return Math.ceil(newPrice);
}

Vue.prototype.$suggestTime = function(days) {
	let time = new Date();
	let time1 = time.getTime();
	let secs = days * 1000 * 60 * 60 * 24;
	let suggestTime = new Date((time1 + secs));
	console.log(suggestTime);
	return suggestTime;
}

Vue.prototype.$uuid = function() {
	function S4() {
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//通过URL获取文档名
Vue.prototype.$getDocName = function(url) {
	let index = url.lastIndexOf(".");
	let docName = url.substring(0, index);
	return docName;
}

//通过下载链接获取文档后缀
Vue.prototype.$getDocType = function(url) {
	if(!url) {
		return ""
	}
	let index = url.lastIndexOf(".");
	let pat = url.slice(index + 1, url.length);
	return pat;
}
//showifr
Vue.prototype.$showifr = function(pat) {
	if(pat === "pdf" || pat === "doc" || pat === "docx") {
		return true
	}
	return false
}

//showimg
Vue.prototype.$showimg = function(pat) {
	if(pat === "jpg" || pat === "jpeg" || pat === "png") {
		return true
	}
	return false
}

Vue.prototype.$goTop = function() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

//过滤器

//过滤剩余交稿时间
Vue.filter('fomartDeadline', function(val) {
	if(!val) {
		return "null";
	}

	var EndTime = new Date(val); //截止时间 前端路上 http://www.51xuediannao.com/qd63/
	var NowTime = new Date();
	var t = EndTime.getTime() - NowTime.getTime();
	var d = Math.floor(t / 1000 / 60 / 60 / 24);
	var h = Math.floor(t / 1000 / 60 / 60 % 24);
	var m = Math.floor(t / 1000 / 60 % 60);
	var s = Math.floor(t / 1000 % 60);
	if(EndTime < NowTime) {
		return d + '天' + h + '小时' + m + '分钟';
	} else {
		return d + '天' + h + '小时' + m + '分钟';
	}
});

Vue.filter('fomartViewUrl', function(url) {

	let host = document.location.protocol + '//' + window.location.host;
	if(!url) {
		return host + '/pdfall/web/viewer.html?file=' + host + '/pdf/123.pdf';
	}

	let index = url.lastIndexOf(".");
	let name = url.slice(index + 1, url.length).toLocaleLowerCase();

	if(name === 'pdf') {
		return host + '/pdfall/web/viewer.html?file=' + '/controller/File/PreviewFile?url=' + url;
	} else if(name === 'doc' || name === 'docx') {
		return 'https://view.officeapps.live.com/op/view.aspx?src=' + 'http://file.yitu666.com/' + url; //http://yhn1989.hk1.tunnelfrp.cc/
	} else if(name === 'jpg' || name === 'jpeg' || name === 'png') {
		return 'http://file.yitu666.com/' + url;
	}
});

Vue.filter('toTime', function(time) {
	let dat = new Date(time);
	return dat.toLocaleString();
});

Vue.filter('toHour', function(time) {
	if(!time) {
		return ""
	}
	let dat = new Date(time);
	let year = dat.getFullYear();
	let month = dat.getMonth() + 1;
	let day = dat.getDate();
	let hour = dat.getHours();
	return `${year}年${month}月${day}日 ${hour}点`;
});

Vue.filter('formatNull', function(val) {
	if(!val) {
		return 0;
	}
	return val
});
Vue.filter('formatType', function(val) {
	if(val == 1) {
		return '标准格式';
	}
	return '自定义格式'
});

//组件
Vue.component('warn-layer', {
	template: '<transition name="fades"><div id="myLayer" v-show="flag"><div class="layerCon"><p>{{layertext}}</p></div></div></transition>',
	data: function() {
		return {}
	},
	props: {
		layertext: {
			type: String,
			default: '取消成功'
		},
		flag: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		fade: function() {}
	},
	watch: {
		flag() {
			var that = this;
			setTimeout(function() {
				that.$emit("update:flag", false);
			}, 800)
		}
	},
	created: function() {}
});

Vue.component('yhn-uploadbtn', {
	template: ` <div v-loading="flag">
				<el-button type="primary" @click="uploadFile">&nbsp;上传&nbsp;</el-button>
				<input v-show="false" type="file" @change="inpChange($event)" ref="uploadBtn"/>
			</div>`,
	props: ['flag', 'list'],
	data() {
		return {
			posturl: '/v1/file/upload',
			chunkSize: 1024 * 1024 * 2,
			flag: false,
			listNow: [],
		}
	},
	methods: {
		checkFile(file) {
			let str = file.name.substring(file.name.length - 3, file.name.length).toLocaleLowerCase();
			if(str === 'pdf' || str === 'doc' || str === 'ocx' || str === 'jpg') {
				return true
			} else {
				return false
			}
		},
		uploadFile() {
			this.$refs.uploadBtn.value = "";
			this.$refs.uploadBtn.click();
		},
		inpChange(event) {
			let file = event.currentTarget.files[0];
			if(this.$checkFile(file.name)) {
				this.flag = true;
				this.pushFile(file);
			} else {
				this.$message.error('请上传正确的文件格式！当前支持:.pdf');
			}
		},
		fomartFile(file) {
			let that = this;
			this.uploading = true;
			return pub.getMd5(file).then((md5) => {
				this.uploading = false;
				let obj = {}
				obj.name = file.name;
				obj.lastModified = file.lastModified;
				obj.type = file.type;
				obj.percentage = 0;
				obj.uploaded = false;
				obj.md5 = md5;
				return obj
			})
		},
		pushFile(file) {
			this.fomartFile(file).then(obj => {
				this.postFile(file, obj);
			})
		},
		postFile(file, obj) {
			let flag = this.list.some(item => {
				return item.md5 === obj.md5;
			})
			//this.postPart(file, 0, md5);
			//列表中如果存在 不允许上传
			if(!flag) {
				this.postPart(file, 0, obj.md5);
			} else {
				this.flag = false;
				this.$message.error('文件在列表中已存在，请勿重复上传文件~');
			}

		},
		postPart(file, index, md5) {
			let userData = {};
			if(sessionStorage.userData) {
				userData = JSON.parse(sessionStorage.userData);
			} else {
				this.$message.error('登录超时，请重新登录');
				return
			}
			console.log(md5);
			let that = this;
			let chunkSize = this.chunkSize; // Read in chunks of 2MB
			let chunks = Math.ceil(file.size / chunkSize);
			let currentChunk = index;
			let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
			let formData = new FormData();
			let start = currentChunk * this.chunkSize;
			let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

			formData.append("data", blobSlice.call(file, start, end)); //分段文件
			formData.append("phoneNumber", userData.phoneNumber); //电话
			formData.append("userId", userData.id); //USER ID
			formData.append("lastModified", file.lastModified); //上传时间
			formData.append("fileName", file.name); //文件名
			formData.append("total", chunks); //总共分成几份
			formData.append("index", currentChunk + 1); //当前传的是第几份
			formData.append("md5", md5); //md5
			let xhr = new XMLHttpRequest();
			xhr.open('post', this.posturl, true);
			xhr.onload = (event) => {
				if(xhr.status === 200) {
					let jsonData = JSON.parse(event.currentTarget.response);
					pub.checkSession(jsonData);
					if(!jsonData.state && jsonData.code == 9000) {
						this.$message.error("文件无法解析");
						this.flag = false;
						return
					}
					if(!jsonData.state && jsonData.code == 9001) {
						this.$message.error("文件格式有误!");
						this.flag = false;
						return
					}
					if((currentChunk + 1) < chunks) {
						console.log('上传' + file.name + 'part' + currentChunk + '成功....' + md5);
						currentChunk++;
						console.log('继续上传' + currentChunk);
						this.postPart(file, currentChunk, md5)
					} else {
						this.flag = false;
						this.$emit('uploaded', jsonData);
						this.$notify({
							title: '成功',
							message: '上传成功！',
							duration: 4000,
							type: 'success',
							position: "top-right"
						});
						console.log(file.name + '上传完毕');
					}　　　　　　
				} else {　　　　　　　　
					alert('上传part' + currentChunk + '失败');　　　　　　
				}　
			};
			xhr.send(formData);
		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {});
		}
	},
});

//上传的input 不需要断点续传
Vue.component('yhn-uploadinp', {
	template: `<div style="display:inline-block">
				<i @click="uploadFile" class="iconfont icon-wendangshangchuan" v-show="!flag"></i>	
				<input v-show="false" type="file" @change="inpChange($event)" id="upinp" ref="uploadBtn"/>
				</div>`,
	props: ['row', 'doc'],
	data() {
		return {
			posturl: '/controller/Builder/uploadWorkpiece',
			chunkSize: 1024 * 1024 * 2,
			flag: false,
		}
	},
	methods: {
		checkFile(file) {
			let str = file.name.substring(file.name.length - 3, file.name.length).toLocaleLowerCase();
			if(str === 'doc' || str === 'ocx') {
				return true
			} else {
				return false
			}
		},

		uploadFile() {
			this.$refs.uploadBtn.click();
		},
		inpChange(event) {
			let file = event.currentTarget.files[0];
			if(this.checkFile(file)) {
				this.flag = true;
				let str = '您即将上传' + this.doc.documentXName + '中的第' + this.row.orderNumber + '部分,确认上传?(注意:上传后无法重新上传!)';
				this.$confirm(str, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.pushFile(file);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消上传文件'
					});
					this.flag = false;
					this.$refs.uploadBtn.value = '';
				});

			} else {
				this.flag = false;
				this.$message.error('请上传word的文件格式');
			}
		},
		fomartFile(file) {
			let that = this;
			this.uploading = true;
			return pub.getMd5(file).then((md5) => {
				this.uploading = false;
				let obj = {}
				obj.name = file.name;
				obj.lastModified = file.lastModified;
				obj.type = file.type;
				obj.percentage = 0;
				obj.uploaded = false;
				obj.md5 = md5;
				return obj
			})
		},
		pushFile(file) {
			this.fomartFile(file).then(obj => {
				this.postFile(file, obj.md5);
			})
		},
		postFile(file, md5) {
			console.log(this.row);
			this.ajaxupload(file, md5);

		},
		ajaxupload(file, md5) {
			let formData = new FormData();
			formData.append("data", file);
			formData.append("builderID", this.row.builderId); //写死   this.row.builderId
			formData.append("workPieceId", this.row.workPieceId); //写死this.row.workPieceId

			pub.postData(this.posturl, formData).then(jsonData => {
				this.flag = false;
				console.log(jsonData);
				//pub.checkSession(jsonData);
				/*if(!jsonData.state && jsonData.code == 9000) {
					this.$message.error("文件无法解析");
					return
				}
				if(!jsonData.state && jsonData.code == 9001) {
					this.$message.error("文件格式有误!");
					return
				}*/

				this.$emit('uploaded', jsonData);
				this.$refs.uploadBtn.value = '';
				this.$notify({
					title: '成功',
					message: file.name + '上传成功！',
					duration: 4000,
					type: 'success',
					position: "top-right"
				});
				this.$emit('uploaded');
			}).catch(error => {
				this.flag = false;
				this.$refs.uploadBtn.value = '';
				this.$message.error('上传' + this.row.documentName + '失败!');
			})
		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {});
		}
	},
});

//fomater上传 需要断点上传
Vue.component('yhn-fmupload', {
	template: `<div style="display:inline-block">
				<i @click="uploadFile" class="iconfont icon-wendangshangchuan" v-show="!flag"></i>	
				<input v-show="false" type="file" @change="inpChange($event)" id="upinp" ref="uploadBtn"/>
				</div>`,
	props: ['row'],
	data() {
		return {
			posturl: '/controller/formattor/uploadFinalDraft',
			chunkSize: 1024 * 1024 * 2,
			flag: false,
		}
	},
	methods: {
		checkFile(file) {
			let str = file.name.substring(file.name.length - 3, file.name.length).toLocaleLowerCase();
			if(str === 'doc' || str === 'ocx') {
				return true
			} else {
				return false
			}
		},

		uploadFile() {
			//console.log(this.row);
			//console.log(JSON.parse(sessionStorage.QAdata));
			this.$refs.uploadBtn.click();
		},
		inpChange(event) {
			let file = event.currentTarget.files[0];
			if(this.checkFile(file)) {
				this.flag = true;
				let nameStr = this.row.documentXName || this.row.fileName;
				console.log(this.row);
				let str = '您即将上传' + nameStr + '的转排后版本,确认上传?(注意:上传后无法重新上传!)';
				this.$confirm(str, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.pushFile(file);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消上传文件'
					});
					this.flag = false;
				});

			} else {
				this.flag = false;
				this.$message.error('请上传word的文件格式!');
			}
		},
		fomartFile(file) {
			this.uploading = true;
			return pub.getMd5(file).then((md5) => {
				let obj = {}
				obj.name = file.name;
				obj.lastModified = file.lastModified;
				obj.type = file.type;
				obj.percentage = 0;
				obj.uploaded = false;
				obj.md5 = md5;
				return obj
			})
		},
		pushFile(file) {
			this.fomartFile(file).then(obj => {
				this.postFile(file, obj.md5);
			})
		},
		postFile(file, md5) {
			let time = new Date();
			let timeStr = time.getTime() + "" + this.$uuid();
			this.postPart(file, 0, md5, timeStr);

		},

		postPart(file, index, md5, uuid) {
			let userData = {};
			if(sessionStorage.formaterData) {
				userData = JSON.parse(sessionStorage.formaterData);
			}

			let that = this;
			let chunkSize = this.chunkSize; // Read in chunks of 2MB
			let chunks = Math.ceil(file.size / chunkSize);
			let currentChunk = index;
			let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
			let formData = new FormData();
			let start = currentChunk * this.chunkSize;
			let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

			formData.append("Data", blobSlice.call(file, start, end)); //分段文件
			formData.append("QaID", userData.id); //QAID
			formData.append("TaskID", this.row.taskID); //documentId
			formData.append("UniqueID", uuid); //documentId
			formData.append("lastModified", file.lastModified); //上传时间
			formData.append("fileName", file.name); //文件名
			formData.append("Total", chunks); //总共分成几份
			formData.append("Index", currentChunk + 1); //当前传的是第几份
			formData.append("Md5", md5); //md5
			let xhr = new XMLHttpRequest();
			xhr.open('post', this.posturl, true);
			xhr.onload = (event) => {
				if(xhr.status === 200) {
					//pub.checkSession(obj);
					/*if(!obj.state && obj.code == 9000) {
						this.$message.error("文件无法解析");
						return
					}
					if(!obj.state && obj.code == 9001) {
						this.$message.error("文件格式有误!");
						return
					}*/
					let jsonData = JSON.parse(event.currentTarget.response);
					if(jsonData.state) {
						if((currentChunk + 1) < chunks) {
							console.log('上传' + file.name + 'part' + currentChunk + '成功....' + md5);
							currentChunk++;
							console.log('继续上传' + currentChunk);
							this.postPart(file, currentChunk, md5, uuid)
						} else {
							this.flag = false;
							setTimeout(() => {
								this.$emit('uploaded', jsonData);
							}, 1000);

							this.$notify({
								title: '成功',
								message: '上传成功！',
								duration: 4000,
								type: 'success',
								position: "top-right"
							});
							console.log(file.name + '上传完毕');
						}　

					}
				} else {　　　　　　　　
					alert('上传part' + currentChunk + '失败');
					this.postPart(file, 0, md5, uuid)　　　　　
				}　
			};
			//如果报错  重新从0部分上传
			xhr.onerror = (e) => {
				this.postPart(file, 0, md5, uuid);
			}

			xhr.send(formData);
		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {});
		}
	},
});
//QA上传 需要断点上传
Vue.component('yhn-qaupload', {
	template: `<div style="display:inline-block">
				<i @click="uploadFile" class="iconfont icon-wendangshangchuan" v-show="!flag"></i>	
				<input v-show="false" type="file" @change="inpChange($event)" id="upinp" ref="uploadBtn"/>
				</div>`,
	props: ['row'],
	data() {
		return {
			posturl: '/controller/Qa/uploadDocument',
			chunkSize: 1024 * 1024 * 2,
			flag: false,
		}
	},
	methods: {
		checkFile(file) {
			let str = file.name.substring(file.name.length - 3, file.name.length).toLocaleLowerCase();
			if(str === 'doc' || str === 'ocx') {
				return true
			} else {
				return false
			}
		},

		uploadFile() {
			//console.log(this.row);
			//console.log(JSON.parse(sessionStorage.QAdata));
			this.$refs.uploadBtn.click();
		},
		inpChange(event) {
			let file = event.currentTarget.files[0];
			if(this.checkFile(file)) {
				this.flag = true;
				let nameStr = this.row.documentXName || this.row.fileName;

				let str = '您即将上传' + nameStr + '的终稿,确认上传?(注意:上传后无法重新上传!)';
				this.$confirm(str, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.pushFile(file);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消上传文件'
					});
					this.flag = false;
				});

			} else {
				this.flag = false;
				this.$message.error('请上传word的文件格式!');
			}
		},
		fomartFile(file) {
			this.uploading = true;
			return pub.getMd5(file).then((md5) => {
				let obj = {}
				obj.name = file.name;
				obj.lastModified = file.lastModified;
				obj.type = file.type;
				obj.percentage = 0;
				obj.uploaded = false;
				obj.md5 = md5;
				return obj
			})
		},
		pushFile(file) {
			this.fomartFile(file).then(obj => {
				this.postFile(file, obj.md5);
			})
		},
		postFile(file, md5) {
			let time = new Date();
			let timeStr = time.getTime() + "" + this.$uuid();
			this.postPart(file, 0, md5, timeStr);

		},

		postPart(file, index, md5, uuid) {
			let userData = {};
			if(sessionStorage.QAdata) {
				userData = JSON.parse(sessionStorage.QAdata);
			}

			let that = this;
			let chunkSize = this.chunkSize; // Read in chunks of 2MB
			let chunks = Math.ceil(file.size / chunkSize);
			let currentChunk = index;
			let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
			let formData = new FormData();
			let start = currentChunk * this.chunkSize;
			let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

			formData.append("Data", blobSlice.call(file, start, end)); //分段文件
			formData.append("QaID", userData.id); //QAID
			formData.append("TaskID", this.row.taskID); //documentId
			formData.append("UniqueID", uuid); //documentId
			formData.append("lastModified", file.lastModified); //上传时间
			formData.append("fileName", file.name); //文件名
			formData.append("Total", chunks); //总共分成几份
			formData.append("Index", currentChunk + 1); //当前传的是第几份
			formData.append("Md5", md5); //md5
			let xhr = new XMLHttpRequest();
			xhr.open('post', this.posturl, true);
			xhr.onload = (event) => {
				if(xhr.status === 200) {
					//pub.checkSession(obj);
					/*if(!obj.state && obj.code == 9000) {
						this.$message.error("文件无法解析");
						return
					}
					if(!obj.state && obj.code == 9001) {
						this.$message.error("文件格式有误!");
						return
					}*/
					let jsonData = JSON.parse(event.currentTarget.response);
					if(jsonData.state) {
						if((currentChunk + 1) < chunks) {
							console.log('上传' + file.name + 'part' + currentChunk + '成功....' + md5);
							currentChunk++;
							console.log('继续上传' + currentChunk);
							this.postPart(file, currentChunk, md5, uuid)
						} else {
							this.flag = false;
							setTimeout(() => {
								this.$emit('uploaded', jsonData);
							}, 1000);

							this.$notify({
								title: '成功',
								message: '上传成功！',
								duration: 4000,
								type: 'success',
								position: "top-right"
							});
							console.log(file.name + '上传完毕');
						}　

					}
				} else {　　　　　　　　
					alert('上传part' + currentChunk + '失败');
					this.postPart(file, 0, md5, uuid)　　　　　
				}　
			};
			//如果报错  重新从0部分上传
			xhr.onerror = (e) => {
				this.postPart(file, 0, md5, uuid);
			}

			xhr.send(formData);
		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {});
		}
	},
});

//builder接任务 页面容器
Vue.component('yhn-wordbox', {
	template: `<el-dialog :fullscreen='true' class="wordbox" titile="" :visible.sync="flag" width='70%'>
					<div class="box">
						<i class="iconfont" :class="$getClassName(task.documentXName)"></i>
						<div class="ellipsis" style="display:inline-block;max-width:400px;position:relative;top:6px;">{{task.documentXName}}</div>
						<i v-for="i in task.difficulty" class="el-icon-star-on"></i>
						<el-button :plain="true" @click="full" class="full">全屏阅览</el-button>
						<div style="float:right;position:relative;margin-right:30px;">
							<el-button @click="diffFlag=true" type="primary" class="diff">难度调整</el-button>
							<el-slider v-show="diffFlag" style="width:100px;position:relative;" v-model="diff" :step="1" :min="1" :max="5"></el-slider>
						</div>
					</div>
					<iframe v-show="$showifr(type)" ref="iframeBox" src="" class="ifr"></iframe>
					<div class="ifr" v-show="$showimg(type)">
						<img style="width:100%;" :src="task.previewUrl|fomartViewUrl" />
					</div>
					
					<div class="bottomBox">
						<div class="top h-center">
							<p>转排方式:{{$getFileType(task.documentName)}}转word</p>
							<p style="width:400px;">用户需求:<b class="end">{{task.userDemand}}</b></p>
							<p>文档交稿倒计时:<b class="wrong">{{task.deadline|fomartDeadline}}</b></p>
							<p>文档总份数:{{task.workPieceCount}}</p>
							<p>当前剩余份数:<b class="working">{{task.leftPieces}}</b></p>
						</div>
						
						<div class="getBox h-center">
							<div>领取<el-input class="inp" v-model="getPaper" type="number" placeholder="请输入"></el-input>份</div>
							<el-button @click="get" type="primary" class="btn">领取</el-button>
						</div>
					</div>
			</el-dialog>`,
	props: ["flag", 'task'],
	data() {
		return {
			getPaper: 0,
			loadingFlag: true,
			diff: 0,
			diffFlag: false,
			type: "",
		}
	},
	methods: {
		full() {
			window.open(this.$formatViewUrl(this.task.preview));
		},
		get() {

			if(this.getPaper < this.task.minAmount) {
				this.$message({
					message: '领取文档不可小于' + this.task.minAmount + '份',
					type: 'warning'
				});
				this.getPaper = this.task.minAmount;
				return
			}
			if(this.getPaper > this.task.leftPieces) {

				this.$message.error('领取任务数超过最大可领取数!');
				return;
			}

			let builderData = JSON.parse(sessionStorage.builderData);
			let obj = {
				BuilderID: builderData.id, //写死
				TaskID: this.task.taskId,
				Amount: this.getPaper,
			}

			api.getMission(obj).then(data => {
				if(data.state && data.code === 100) {
					this.$message({
						message: '领取任务成功!',
						type: 'success'
					});
					this.$emit('missioned');
					this.$emit("update:flag", false);
				} else {
					this.$emit('missioned');
					this.$message.error('该任务已被领完!');
					this.$emit("update:flag", false);
				}
			})
		}
	},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
			if(this.flag) {
				this.getPaper = this.task.minAmount;
				this.diff = this.task.difficulty;
				this.$nextTick(function() {
					console.log(this.task)
					this.type = this.$getDocType(this.task.previewUrl);
					this.$refs.iframeBox.src = this.$formatViewUrl(this.task.previewUrl);
				})
			}
		},
		getPaper(val) {
			if(val < this.task.minAmount) {
				this.$message({
					message: '领取文档不可小于' + this.task.minAmount + '份',
					type: 'warning'
				});
			}
		},

	},
	mounted() {
		this.getPaper = this.task.minAmount;
	}
});

Vue.component('qa-gettask', {
	template: `<el-dialog :fullscreen='true' class="wordbox" titile="" :visible.sync="flag" width='70%'>
					<div class="box">
						<i class="iconfont" :class="$getClassName(task.documentXName)"></i>
						<div class="ellipsis" style="display:inline-block;max-width:400px;position:relative;top:6px;">{{task.documentXName}}</div>
						<i v-for="i in task.difficulty" class="el-icon-star-on"></i>
						<el-button :plain="true" @click="full" class="full">全屏阅览</el-button>
						<div style="float:right;position:relative;margin-right:30px;">
							<el-button @click="diffFlag=true" type="primary" class="diff">难度调整</el-button>
							<el-slider v-show="diffFlag" style="width:100px;position:relative;" v-model="diff" :step="1" :min="1" :max="5"></el-slider>
						</div>
					</div>
					<iframe v-show="$showifr(type)" ref="iframeBox" src="" class="ifr"></iframe>
					<div class="ifr" v-show="$showimg(type)">
						<img style="width:100%;" :src="task.previewUrl|fomartViewUrl" />
					</div>
					
					<div class="bottomBox">
						<div class="top h-center">
							<p>转排方式:{{$getFileType(task.documentName)}}转word</p>
							<p style="width:400px;">用户需求:<b class="end">{{task.userDemand}}</b></p>
							<p>文档交稿倒计时:<b class="wrong">{{task.deadline|fomartDeadline}}</b></p>
							<p>文档总份数:{{task.workPieceCount}}</p>
						</div>
						
						<div class="getBox h-center">
							<el-button @click="get" type="primary" class="btn">领取</el-button>
						</div>
					</div>
			</el-dialog>`,
	props: ["flag", 'task'],
	data() {
		return {
			loadingFlag: true,
			diff: 0,
			diffFlag: false,
			type: "",
		}
	},
	methods: {
		full() {
			window.open(this.$formatViewUrl(this.task.previewUrl));
		},
		get() {

			let QAdata = JSON.parse(sessionStorage.QAdata);

			let obj = {
				QaId: QAdata.id, //写死
				TaskId: this.task.taskId,
			}

			api.QAsaveTask(obj).then(data => {
				if(data.state && data.code === 100) {
					this.$message({
						message: '领取任务成功!',
						type: 'success'
					});
					this.$emit('missioned');
					this.$emit("update:flag", false);
				} else {
					this.$emit('missioned');
					this.$message.error('该任务已被领完!');
					this.$emit("update:flag", false);
				}
			})
		}
	},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
			if(this.flag) {
				this.getPaper = this.task.recommendCount;
				this.diff = this.task.difficulty;
				this.$nextTick(function() {
					this.type = this.$getDocType(this.task.previewUrl);
					this.$refs.iframeBox.src = this.$formatViewUrl(this.task.previewUrl);
				})
			}
		},

	},
	mounted() {}
});

Vue.component('fm-gettask', {
	template: `<el-dialog :fullscreen='true' class="wordbox" titile="" :visible.sync="flag" width='70%'>
					<div class="box">
						<i class="iconfont" :class="$getClassName(task.documentName)"></i>
						<div class="ellipsis" style="display:inline-block;max-width:400px;position:relative;top:6px;">{{task.documentName}}</div>
						<i v-for="i in task.difficulty" class="el-icon-star-on"></i>
						<el-button :plain="true" @click="full" class="full">全屏阅览</el-button>
						<div style="float:right;position:relative;margin-right:30px;">
							<el-button @click="diffFlag=true" type="primary" class="diff">难度调整</el-button>
							<el-slider v-show="diffFlag" style="width:100px;position:relative;" v-model="diff" :step="1" :min="1" :max="5"></el-slider>
						</div>
					</div>
					<iframe  v-show="$showifr(type)" ref="iframeBox" src="" class="ifr"></iframe>
					<div class="ifr" v-show="$showimg(type)">
						<img style="width:100%;" :src="task.documentUrl|fomartViewUrl" />
					</div>
					
					<div class="bottomBox">
						<div class="top h-center">
							<p>转排方式:{{$getFileType(task.documentName)}}转word</p>
							<p style="width:400px;">用户需求:<b class="end">{{task.userDemand}}</b></p>
							<p>文档交稿倒计时:<b class="wrong">{{task.documentDeadline|fomartDeadline}}</b></p>
						</div>
						
						<div class="getBox h-center">
							<el-button @click="get" type="primary" class="btn">领取</el-button>
						</div>
					</div>
			</el-dialog>`,
	props: ["flag", 'task'],
	data() {
		return {
			loadingFlag: true,
			diff: 0,
			diffFlag: false,
			type: "",
		}
	},
	methods: {
		full() {
			window.open(this.$formatViewUrl(this.task.preview));
		},
		get() {

			let data = JSON.parse(sessionStorage.formaterData);
			console.log(this.task);
			let obj = {
				FormattorID: data.id, //写死
				TaskId: this.task.taskId,
			}

			api.formaterSaveTask(obj).then(data => {
				if(data.state && data.code === 100) {
					this.$message({
						message: '领取任务成功!',
						type: 'success'
					});
					this.$emit('missioned');
					this.$emit("update:flag", false);
				} else {
					this.$emit('missioned');
					this.$message.error('该任务已被领完!');
					this.$emit("update:flag", false);
				}
			})
		}
	},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
			if(this.flag) {
				this.getPaper = this.task.recommendCount;
				this.diff = this.task.difficulty;
				this.$nextTick(function() {
					this.type = this.$getDocType(this.task.documentUrl);
					this.$refs.iframeBox.src = this.$formatViewUrl(this.task.documentUrl);
				})
			}
		},

	},
	mounted() {}
});

//阅览单个PDF或doc容器
Vue.component('yhn-preview', {
	template: `<el-dialog :fullscreen='true' class="wordbox" titile="" :visible.sync="flag" width='80%'>
					<div class="box">
						<i class="iconfont" :class="$getClassName(url)" ></i>
						<div class="ellipsis name">{{name}}</div>
						<el-button :plain="true" :size="'small'" @click="full" class="full">全屏阅览</el-button>
					</div>
					<div class="iframeBox">
						<div>
							<div style="width:100%;height:100%;border:none;display:block;" v-show="$showimg(type)">
								<img style="max-width:1000px;display:block;margin:50px auto;"  :src="url|fomartViewUrl" />
							</div>
							<iframe v-show="$showifr(type)" ref="iframeBox" :src="url|fomartViewUrl" style="width:100%;height:100%;border:none"></iframe>
						</div>
					</div>
			</el-dialog>`,
	props: ["flag", 'url', 'name'],
	data() {
		return {
			type: "",
		}
	},
	methods: {
		full() {
			window.open(this.$formatViewUrl(this.url)); //this.$formatViewUrl
		}
	},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
			this.$nextTick(function() {
				this.type = this.$getDocType(this.url);
			})
		}
	},
	mounted() {}
});

//对比阅览 原文档与转排后文档容器
Vue.component('yhn-duibi', {
	template: `<el-dialog :fullscreen='true' class="duibi" title="" :visible.sync="flag" width='90%'>
					<p> <b class="wrong">{{docname}}</b></p>
					<div class="ifrBox">
						<div class="ifrView">
							<p class="docTitle">原文档
								<el-button :plain="true" size="mini" class="full" @click="$full(duibiurl1)">全屏阅览</el-button>
							</p>
							<iframe v-show="$showifr(leftType)" id="ifrold" class="ifr1" :class="{'wordDoc':$getFileType(duibiurl1)!=='pdf'}" :src="duibiurl1|fomartViewUrl"></iframe>
							<div v-show="$showimg(leftType)" class="ifr1">
								<img style="width:100%" src="http://192.168.0.104:9090/img/404.png" />
							</div>
						</div>
						<div class="ifrView">
							<p class="docTitle" style="border-bottom:1px solid #ddd">已转排文档
								<el-button :plain="true" size="mini" class="full" @click="$full(duibiurl2)">全屏阅览</el-button>
							</p>
							<iframe  id="ifrnew" class="ifr2" :class="{'wordDoc':$getFileType(duibiurl2)!=='pdf'}" :src="duibiurl2|fomartViewUrl"></iframe>
						</div>
					</div>
				</el-dialog>`,
	data: function() {
		return {
			leftType: '',
		}
	},
	props: ['flag', 'duibiurl1', 'duibiurl2', 'docname'],
	methods: {
		close() {

		},
	},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
			this.$nextTick(() => {
				this.leftType = this.$getDocType(this.duibiurl1);
			})
		}
	},
	created: function() {}
});

Vue.component('yhn-header', {
	template: `<header class="baseHeader">
			<div class="logo h-center"></div>
			<div class="balance h-center">
				<div class="userHead h-center">
					<div class="hoverBox"></div>
				</div>
				<div class="balanceMessage h-center">
					<p class="fs13">用户：{{userData.phoneNumber}}</p>
					<p class="fs13">余额：¥{{yue}}</p>
				</div>
			</div>
			<div class="h-center rt0">
				<div style="margin-top:10px;">
					<el-button @click="quit" type="danger" plain>退出登录</el-button>
				</div>
			</div>
		</header>`,
	props: ["name", 'balance'],
	data() {
		return {
			userData: {},
			yue: 0,
		}
	},
	methods: {
		quit() {
			this.$confirm("确认退出,返回登录界面?", '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				localStorage.removeItem("userData");
				sessionStorage.removeItem("activeName");
				window.location.replace("../../public/login/login.html");
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});
			});

		}
	},
	created() {
		if(sessionStorage.userData) {
			this.userData = JSON.parse(sessionStorage.userData);
			api.getyue({
				userId: this.userData.id
			}).then(data => {
				if(data.state) {
					this.yue = data.ext.credit;
				}
			})
		}

	}
});

Vue.component('user-header', {
	template: `<div id="header">
				<div class="newHead">
					<div class="logo  h-center"></div>
					<div class="txt h-center">智能图文识别与排版平台</div>
					<div class="nav">
						<ul class="navUl">
							<li>
								<div class="hoverBox" :class="{'active':active==='home'}" @click="goTo(1)">
									<span class="base">首页</span>
									<span class="hover">首页</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox" :class="{'active':active==='yiqian'}"  @click="goTo(2)">
									<span class="base">译前排版</span>
									<span class="hover">译前排版</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox" :class="{'active':active==='yihou'}" @click="goTo(3)">
									<span class="base">译后排版</span>
									<span class="hover">译后排版</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox">
									<span class="base">工具中心</span>
									<span class="hover">工具中心</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox">
									<span class="base">解决方案</span>
									<span class="hover">解决方案</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox">
									<span class="base">常见问题</span>
									<span class="hover">常见问题</span>
		
								</div>
							</li>
							<li>
								<div class="hoverBox">
									<span class="base">知识技巧</span>
									<span class="hover">知识技巧</span>
								</div>
							</li>
						</ul>
						
						<div class="loginBox" v-show="!logined">
							<!--<div class="loginBtn ml20 zc">
								<div class="hoverBox">
									<span class="base">注册</span>
									<span class="hover">注册</span>
								</div>
							</div>-->
							<div class="loginBtn">
								<div class="hoverBox" @click="goTo(6)">
									<span class="base">登录</span>
									<span class="hover">登录</span>
								</div>
							</div>
						</div>
						<div class="center" v-show='logined'  :class="{'active':active==='orderCenter'}"  @click="goTo(4)">
							<div class="order">
								<i class="iconfont icon-tubiaolunkuo-"></i>
								我的订单
							</div>
						</div>
						
						<div class="person h-center"  v-show='logined' :class="{'active':active==='userCenter'}">
							<div class="headBox" @click="goTo(5)"></div>
							<span class="text" @click="goTo(5)">个人中心</span>
							<div class="hoverBox w-center">
								<div class="dot w-center"></div>
								<div class="list">
									<p @click="goTo('zh')"><i class="iconfont icon-gerenzhongxin"></i>我的账户</p>
									<p @click="goTo('cz')"><i class="iconfont icon-wodezhanghu"></i>充值</p>
									<h1>我的余额</h1>
									<h1 class="wrong bold">¥{{userDetail.balance}}</h1>
									<p class="bottom" @click.stop="quit"><i class="iconfont icon-icon" ></i>退出登录</p>
								</div>
							</div>
							
							
						</div>
						
						
					</div>
				</div>
			</div>`,
	props: ['active'],
	data() {
		return {
			userData: {},
			userDetail: {},
			yue: 0,
			logined: false,
		}
	},
	methods: {
		goTo(num) {
			switch(num) {
				case 1:
					window.location.href = "../../user/home/home.html";
					break;
				case 2:
					window.location.href = "../../user/upload/before-upload.html";
					break;
				case 3:
					window.location.href = "../../user/upload/after-upload.html"
					break;
				case 4:
					window.location.href = "../../user/order/orderCenter.html"
					break;
				case 5:
					window.location.href = "../../user/user-center/userCenter.html"
					break;
				case 6:
					window.location.href = "../../public/login/userLogin.html"
					break;
				case 'zh':
					window.location.href = "../../user/user-center/userCenter.html"
					break;
				case 'cz':
					window.location.href = "../../user/user-center/recharge.html"
					break;
				default:
					break;
			}

		},
		quit() {
			localStorage.removeItem("userData");
			sessionStorage.removeItem("activeName");
			this.logined = false;
			window.location.href = '../../user/home/home.html';

			//			this.$confirm("确认退出,返回登录界面?", '提示', {
			//				confirmButtonText: '确定',
			//				cancelButtonText: '取消',
			//				type: 'warning'
			//			}).then(() => {
			//				localStorage.removeItem("userData");
			//				sessionStorage.removeItem("activeName");
			//				this.logined=false;
			//			}).catch(() => {
			//				this.$message({
			//					type: 'info',
			//					message: '已取消退出'
			//				});
			//			});

		},
		getUserMsg() {
			api.getUserMsg({
				UserID: this.userData.id
			}).then(data => {
				this.userDetail = data.ext;
			})
		},
	},
	created() {
		if(localStorage.userData) {
			sessionStorage.userData = localStorage.userData;
			this.logined = true;
			this.userData = JSON.parse(sessionStorage.userData);
			this.getUserMsg();

		}

	}
});

Vue.component('builder-header', {
	template: `<header class="baseHeader">
			<div class="logo h-center"></div>
			<div class="balance h-center">
				<div class="userHead h-center">
					<div class="hoverBox w-center">
						<div class="dot w-center"></div>
					</div>
				</div>
				<div class="balanceMessage h-center">
					<p class="fs13">用户：{{builderData.name||builderData.telephoneNumber}}</p>
					<p class="fs13"></p>
				</div>
			</div>
		<div class="h-center" style="right:100px;">
	<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     <i :class="{'el-icon-success':userstatus==='正常','el-icon-warning':userstatus==='忙碌中','el-icon-error':userstatus==='休假中'}"></i>{{userstatus}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
  	<el-dropdown-item command="1"><i class="el-icon-success"></i>正常</el-dropdown-item>
    <el-dropdown-item command="2"><i class="el-icon-warning"></i>忙碌中</el-dropdown-item>
    <el-dropdown-item command="3"><i class="el-icon-error"></i>休假</el-dropdown-item>
    
  </el-dropdown-menu>
</el-dropdown>
		</div>
			<el-button @click="quit" type="danger" size="small" plain class="h-center rt0">退出登录</el-button>
		</header>`,
	props: ["name", 'balance'],
	data() {
		return {
			builderData: {},
			userstatus: '正常'
		}
	},
	methods: {
		quit() {
			this.$confirm("确认退出,返回登录界面?", '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				
				var data=localStorage.builderData;
				if(data)
				{
					 var obj=JSON.parse(data);
				     this.$userStatusManage.loginOut(obj.id);
				}
			
				
				localStorage.removeItem("builderData");
				
				window.location.replace("../../public/builder-login/login.html");
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});
			});
			

		},
		handleCommand(status) {
			let userData=JSON.parse(sessionStorage.builderData);
			this.$userStatusManage.setuserstatus(userData.id, status, true).then(data=>{
				if(status === '1'){
					this.userstatus = '正常';
				}else if(status === '2'){
					this.userstatus = '忙碌中';
				}else if(status === '3'){
					this.userstatus = '休假中';
				}
			});
		}
	},
	created() {
		if(sessionStorage.builderData) {
			this.builderData = JSON.parse(sessionStorage.builderData);
			this.userstatus=this.$userStatusManage.getuserstatusTxt(this.builderData.id);
		}
	
	}
});

Vue.component('formater-header', {
	template: `<header class="baseHeader">
			<div class="logo h-center"></div>
			<div class="balance h-center">
				<div class="userHead h-center">
					<!--<div class="hoverBox w-center">
						<div class="dot w-center"></div>
					</div>-->
				</div>
				<div class="balanceMessage h-center">
					<p class="fs13">用户：{{formaterData.name||formaterData.telephoneNumber}}</p>
					<p class="fs13"></p>
				</div>
			</div>
			<div class="h-center" style="right:100px;">
	<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    <i :class="{'el-icon-success':userstatus==='正常','el-icon-warning':userstatus==='忙碌中','el-icon-error':userstatus==='休假中'}"></i>{{userstatus}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
     <el-dropdown-item command="1"><i class="el-icon-success"></i>正常</el-dropdown-item>
   	 <el-dropdown-item command="2"><i class="el-icon-warning"></i>忙碌中</el-dropdown-item>
     <el-dropdown-item command="3"><i class="el-icon-error"></i>休假</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
		</div>
			<el-button @click="quit" type="danger" size="small" plain class="h-center rt0">退出登录</el-button>
		</header>`,
	props: ["name", 'balance'],
	data() {
		return {
			formaterData: {},
			userstatus: '正常'
		}
	},
	methods: {
		quit() {
			this.$confirm("确认退出,返回登录界面?", '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				
				var data=localStorage.formaterData;
				if(data)
				{
					 var obj=JSON.parse(data);
				     this.$userStatusManage.loginOut(obj.id);
				}
			
				
				localStorage.removeItem("formaterData");
				window.location.replace("../../public/formater-login/formater-login.html");
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});
			});

		},
		handleCommand(status) {
			let userData=JSON.parse(sessionStorage.formaterData);
			this.$userStatusManage.setuserstatus(userData.id, status, true).then(data=>{
				if(status === '1'){
					this.userstatus = '正常';
				}else if(status === '2'){
					this.userstatus = '忙碌中';
				}else if(status === '3'){
					this.userstatus = '休假中';
				}
			});
		}
	},
	created() {
		if(sessionStorage.formaterData) {
			this.formaterData = JSON.parse(sessionStorage.formaterData);
				this.userstatus=this.$userStatusManage.getuserstatusTxt(this.formaterData.id);
		}
			
	}
});




Vue.component('qa-header', {
	template: `<header class="baseHeader">
			<div class="logo h-center"></div>
			<div class="balance h-center">
				<div class="userHead h-center"></div>
				<div class="balanceMessage h-center">
					<p class="fs13">用户：{{QAdata.name||QAdata.telephoneNumber}}</p>
					<p class="fs13"></p>
				</div>
			</div>
			<div class="h-center" style="right:100px;">
	<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     <i :class="{'el-icon-success':userstatus==='正常','el-icon-warning':userstatus==='忙碌中','el-icon-error':userstatus==='休假中'}"></i>{{userstatus}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
	  <el-dropdown-item command="1"><i class="el-icon-success"></i>正常</el-dropdown-item>
      <el-dropdown-item command="2"><i class="el-icon-warning"></i>忙碌中</el-dropdown-item>
      <el-dropdown-item command="3"><i class="el-icon-error"></i>休假</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
		</div>
			<el-button @click="quit" type="danger" size="small" plain class="h-center rt0">退出登录</el-button>
		</header>`,
	props: ["name", 'balance'],
	data() {
		return {
			QAdata: {},
			userstatus: '正常'
		}
	},
	methods: {
		quit() {
			this.$confirm("确认退出,返回登录界面?", '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				
				var data=localStorage.QAdata;
				if(data)
				{
					 var obj=JSON.parse(data);
				     this.$userStatusManage.loginOut(obj.id);
				}
				
				localStorage.removeItem("QAdata");
				window.location.replace("../../public/QA-login/login.html");
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消退出'
				});
			});

		},
		handleCommand(status) {
			let userData=JSON.parse(sessionStorage.QAdata);
			this.$userStatusManage.setuserstatus(userData.id, status, true).then(data=>{
				if(status === '1'){
					this.userstatus = '正常';
				}else if(status === '2'){
					this.userstatus = '忙碌中';
				}else if(status === '3'){
					this.userstatus = '休假中';
				}
			});
		}
	},

	created() {
		if(sessionStorage.QAdata) {
			this.QAdata = JSON.parse(sessionStorage.QAdata);
			console.log("11111111", this.QAdata);
			this.userstatus=this.$userStatusManage.getuserstatusTxt(this.QAdata.id);
		}
		
		
		
	}
});

Vue.component('yhn-dragupload', {
	template: ` <div>
				<div class="uploadAlot w-center" style="top:170px;z-index: 100;">
					<input v-show="false" @change="uploadFile($event)" type="file" name="file" id="inp" />
					<div class="fileListBox" v-show="fileList.length">
						<h1 class="title">上传文件 <i class="el-icon-close right" @click="close"></i></h1>
						<div class="tableBox" @dragover.prevent.stop="" @drop.prevent.stop="drop($event)">
							<table>
								<tr v-for="file,index in fileList">
									<td style="width:400px;"><i class="iconfont icon-pdf"></i><p class="name ellipsis">{{file.name}}</p></td>
									<td style="width:220px;"><el-progress :text-inside="true" :stroke-width="14" :percentage="file.percentage" status="success"></el-progress></el-progress></td>
									<td style="text-align: right;width:200px"><span class="del" v-show="checkshow(index,true)" @click="del(index)">删除</span><span v-show="checkshow(index)" class="del" @click="huifu(index)">恢复</span></td>
								</tr>
							</table>	
						</div>
					</div>
					<div v-loading="uploading" class="dragBox" @dragover.prevent.stop="" @drop.prevent.stop="drop($event)" :class="{'active':fileList.length}">
						将文件或文件夹拖到这里，或者<span @click="upload">点击上传</span>文件   (文件夹内不可超过100个文件)
					</div>
					<yhn-pricebox :list="checkedList"/>
				</div>
			</div>`,
	props: ['flag', 'list'],
	data() {
		return {
			title: "",
			listFlag: false,
			uploading: false,
			fileList: [],
			checkedList: [],
			posturl: '/v1/file/upload',
			chunkSize: 1024 * 1024 * 2,
			transType: false,
			abc: "",
			currentIndex: 0,
		}
	},
	methods: {
		upload() {
			inp.value = "";
			inp.click();
		},
		close() {
			this.$confirm('<div><h1 style="font-weight:bold;">是否离开迅捷下单?</h1><p>文档已上传,可在未支付文档中继续选择支付</p></div>', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				dangerouslyUseHTMLString: true,
				type: 'warning'
			}).then(() => {
				this.fileList = [];
				this.checkedList = []
				this.$emit("close");
			}).catch(() => {
				//	          this.$message({
				//	            type: 'info',
				//	            message: '已取消删除'
				//	          });          
			});

			console.log(this.checkedList);
			console.log(this.fileList);
		},

		del(index) {
			console.log(index);
			this.$nextTick(() => {
				this.$set(this.checkedList, index, null)
			})

		},
		huifu(index) {
			this.$nextTick(() => {
				this.$set(this.checkedList, index, this.fileList[index]);
			})
		},

		checkshow(index, flag) {
			if(flag) {
				if(this.checkedList[index] !== null) {
					return true
				} else {
					return false
				}
			} else {
				if(this.checkedList[index] !== null) {
					return false
				} else {
					return true
				}
			}
		},

		checkFile(file) {
			let url = file.name;
			let index = url.lastIndexOf(".");
			let str = url.slice(index + 1, url.length).toLocaleLowerCase();
			if(str === 'pdf' || str === 'docx' || str === 'jpg' || str === 'jpeg' || str === 'png') {
				return true
			} else {
				return false
			}
		},
		check(file) {
			if(this.checkFile(file)) {
				this.pushInlist(file);
			} else {
				this.$message.error('请上传正确的文件格式！当前支持:.pdf,.doc,.docx,.jpg,.jpeg,.png');
			}
		},

		pushInlist(file) {
			let obj = {}
			obj.name = file.name;
			obj.fileName = file.name;
			obj.lastModified = file.lastModified;
			obj.type = file.type;
			obj.percentage = 0;
			obj.uploaded = false;
			obj.price = 0; //写死
			obj.file = file;
			this.checkedList.push(obj);
			this.fileList.push(obj);
		},
		startUpload() {
			setTimeout(() => {
				let file = this.checkedList[this.currentIndex].file;
				if(file) {
					this.fomartFile(file).then((obj) => {
						this.checkedList[this.currentIndex].md5 = obj.md5;
						this.postFile(file, obj.md5);
					})
				}
			}, 50);
		},

		fomartFile(file) {
			let that = this;
			this.uploading = true;
			return pub.getMd5(file).then((md5) => {
				this.uploading = false;
				let obj = {}
				obj.name = file.name;
				obj.fileName = file.name;
				obj.lastModified = file.lastModified;
				obj.type = file.type;
				obj.percentage = 0;
				obj.uploaded = false;
				obj.md5 = md5;
				obj.deadline = null;
				obj.price = 0; //写死
				return obj
			})
		},

		pushinList(file) {
			let obj = {}
			obj.name = file.name;
			obj.fileName = file.name;
			obj.lastModified = file.lastModified;
			obj.type = file.type;
			obj.percentage = 0;
			obj.price = 0;
			obj.deadline = null;
			this.checkedList.push(obj);
			this.fileList.push(obj);
		},

		includeFile(obj) {
			let flag = false;
			this.fileList.forEach(function(item) {
				if(item.name === obj.name && item.md5 === obj.md5) {
					flag = true;
				}
			})
			return flag;
		},
		pushFile(file) {
			this.fomartFile(file).then((obj) => {
				if(this.includeFile(obj)) {
					this.$message.error('请勿重复上传');
				} else {
					this.checkedList.push(obj);
					this.fileList.push(obj);
					this.checkMd5().then(() => {
						this.postFile(file, obj.md5);
					})
				}
			})
		},
		uploadFile(event) {
			let file = event.currentTarget.files[0];
			this.pushFile(file);
		},
		drop(event) {
			//let files = event.dataTransfer.files;
			let files = event.dataTransfer.files;

			if(files && files[0]) {
				if(pub.isIE()) {
					this.check(files[0])
				} else {
					this.chromeDrop(event);
				}
			}

		},

		chromeDrop(evt) {
			let that = this;
			let items = evt.dataTransfer.items;

			function folderRead(entry) {
				entry.createReader().readEntries(function(entries) {
					console.log("entries", entries.length);
					for(let i = 0; i < entries.length; i++) {
						let entry = entries[i];
						if(entry.isFile) {
							entry.file(function(file) {
								that.check(file)
							})
						} else {
							//folderRead(entry);
						}
						if(i === entries.length - 1) {
							that.startUpload();
						}
					}
				});
			}

			for(let i = 0; i < items.length; i++) {
				let entry = items[i].webkitGetAsEntry();
				if(!entry) {
					return;
				}
				if(entry.isFile) {
					entry.file(function(file) {
						that.check(file)
					})
				} else {
					folderRead(entry);
				}
			}

			setTimeout(() => {
				that.startUpload();
			}, 1000);

		},
		postFile(file, md5) {
			let time = new Date();
			let userData = JSON.parse(sessionStorage.userData);
			let timeStr = time.getTime() + "" + this.$uuid();
			this.postPart(file, 0, md5, timeStr);
		},
		postPart(file, index, md5, timeStr) {
			let that = this;
			let chunkSize = this.chunkSize; // Read in chunks of 2MB
			let chunks = Math.ceil(file.size / chunkSize);
			let currentChunk = index;
			let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
			let formData = new FormData();
			let start = currentChunk * this.chunkSize;
			let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
			let userData = {};
			if(sessionStorage.userData) {
				userData = JSON.parse(sessionStorage.userData);
			} else {
				this.$message.error('登录超时，请重新登录');
				return
			}

			let time = new Date();
			let timestr = time.getTime() + Math.random().toString(36).substr(2);
			formData.append("data", blobSlice.call(file, start, end)); //分段文件
			formData.append("phoneNumber", userData.phoneNumber); //电话
			formData.append("userId", userData.id); //USER ID
			formData.append("lastModified", timeStr); //上传时间
			formData.append("fileName", file.name); //文件名
			formData.append("total", chunks); //总共分成几份
			formData.append("index", currentChunk + 1); //当前传的是第几份
			formData.append("md5", md5); //md5
			console.log("ssssssssssssssssssss", timeStr);

			//			formData.append("test-upload", file); //分段文件blobSlice.call(file, start, end)
			//			formData.append("lastModified", file.lastModified); //上传时间
			//			formData.append("fileName", file.name); //文件名
			//			formData.append("total", chunks); //总共分成几份
			//			formData.append("index", currentChunk + 1); //当前传的是第几份
			//			formData.append("md5", md5); //md5
			let xhr = new XMLHttpRequest();
			xhr.open('post', this.posturl, true);
			xhr.onload = (event) => {
				if(xhr.status === 200) {
					let obj = JSON.parse(event.currentTarget.response);
					pub.checkSession(obj);
					console.log("ooooooooooo", obj);
					if(!obj) {
						this.postPart(file, currentChunk, md5, timeStr);
					}

					if(!obj.state && obj.code == 9000) {
						this.$message.error("文件无法解析,请检查您的文件");
						this.fileList = [];
						this.checkedList = []
						return
					}
					if(!obj.state && obj.code == 9001) {
						this.$message.error("文件格式有误!");
						this.fileList = [];
						this.checkedList = []
						return
					}

					//pub.console(event.currentTarget.response);
					if((currentChunk + 1) < chunks) {
						pub.console('上传' + file.name + 'part' + currentChunk + '成功....' + md5);
						currentChunk++;
						pub.console('继续上传' + currentChunk);
						this.postPart(file, currentChunk, md5, timeStr)
					} else {
						let doc;
						if(obj.state && obj.message === "文件上传成功") {
							doc = obj.ext;
						}

						this.fileList.forEach(item => {
							if(doc.fileName && item.name === doc.fileName) {
								item = Object.assign(item, doc);
								item.uploaded = true;
								item.percentage = 100;
								item.baseTime = this.$calcBaseTime(item.price, item.difficulty);
							}
						})
						console.log(this.fileList);
						this.currentIndex++;
						this.startUpload();
						pub.console(event.currentTarget.response);
						pub.console(file.name + '上传完毕');
					}　　　　　　
				} else {
					this.postPart(file, currentChunk, md5, timeStr);　　　　　　　
					//alert('上传part' + currentChunk + '失败');　　　　　　
				}　
			};

			xhr.onerror = (e) => {
				this.postPart(file, 0, md5, timeStr);
			}

			xhr.upload.onprogress = (e) => {
				if(e.lengthComputable) {
					var complete = (e.loaded / e.total * 100 | 0);
					that.fileList.forEach(function(item) {
						if(item.name === file.name) {
							item.percentage = (100 / (chunks).toFixed(2) * (currentChunk + 1)).toFixed(2) - 0.5;
						}
					})
				}　
			}

			xhr.send(formData);

		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {
				resovle(true)
			});
		}
	},
	created() {
		if(pub.isIE()) {
			this.title = "请将单个文件拖拽至此,如需上传大文件或多个文件建议使用谷歌浏览器,只支持pdf和word文件";
		} else {
			this.title = "请拖拽单个文件或文件夹,只支持pdf和word文件";
		}
	}
});

Vue.component('yhn-dragupload', {
	template: ` <div>
				<div class="uploadAlot w-center" style="top:170px;z-index: 100;">
					<input v-show="false" @change="singleUpload($event)" type="file" name="file" ref="inp" />
					<div class="fileListBox" v-show="readyUploadList.length">
						<h1 class="title">上传文件 <i class="el-icon-close right" @click="close"></i></h1>
						<div class="tableBox" @dragover.prevent.stop="" @drop.prevent.stop="drop($event)">
							<table>
								<tr v-for="file,index in readyUploadList">
									<td style="width:400px;"><i class="iconfont" style="font-size:20px;" :class="$getClassName(file.name)"></i><p class="name ellipsis">{{file.name}}</p></td>
									<td style="width:220px;"><el-progress :text-inside="true" :stroke-width="14" :percentage="file.percentage" status="success"></el-progress></el-progress></td>
									<td style="text-align: right;width:200px">
									<span v-show="file.uploaded!==true">等待上传</span>
									<span v-show="file.uploaded===true">
										<span class="del" v-show="file.needPay" @click="file.needPay=false">删除</span>
										<span class="del" v-show="!file.needPay" @click="file.needPay=true">恢复</span>
									</span>
									</td>
								</tr>
							</table>	
						</div>
					</div>
					<div v-loading="uploading" class="dragBox" @dragover.prevent.stop="" @drop.prevent.stop="drop($event)" :class="{'active':readyUploadList.length}">
						将文件或文件夹拖到这里，或者<span @click="clickUpload">点击上传</span>文件   (文件夹内不可超过100个文件)
					</div>
					<yhn-pricebox :list="readyUploadList"/>
				</div>
			</div>`,
	props: ['flag', 'list'],
	data() {
		return {
			title: "",
			listFlag: false,
			uploading: false,
			readyUploadList: [],
			posturl: '/v1/file/upload',
			chunkSize: 1024 * 1024 * 2,
			transType: false,
			abc: "",
			currentIndex: 0,
		}
	},
	methods: {
		upload() {
			inp.value = "";
			inp.click();
		},
		close() {
			this.$confirm('<div><h1 style="font-weight:bold;">是否离开迅捷下单?</h1><p>文档已上传,可在未支付文档中继续选择支付</p></div>', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				dangerouslyUseHTMLString: true,
				type: 'warning'
			}).then(() => {
				this.readyUploadList = [];
				this.$emit("close");
			}).catch(() => {
				//	          this.$message({
				//	            type: 'info',
				//	            message: '已取消删除'
				//	          });          
			});

			console.log(this.readyUploadList);
		},

		drop(event) {
			//let files = event.dataTransfer.files;
			let files = event.dataTransfer.files;

			if(files && files[0]) {
				if(pub.isIE()) {
					this.check(files[0])
				} else {
					this.chromeDrop(event);
				}
			}

		},

		//拖拽入谷歌浏览器
		chromeDrop(evt) {
			let that = this;
			let items = evt.dataTransfer.items;

			function folderRead(entry) {
				entry.createReader().readEntries(function(entries) {
					console.log("entries", entries.length);
					for(let i = 0; i < entries.length; i++) {
						let entry = entries[i];
						console.log(i);

						if(entry.isFile) {
							entry.file(function(file) {
								that.check(file)
							})
						} else {
							//folderRead(entry);
						}
					}
				});
			}

			for(let i = 0; i < items.length; i++) {
				let entry = items[i].webkitGetAsEntry();
				if(!entry) {
					return;
				}
				if(entry.isFile) {
					entry.file(function(file) {
						that.check(file)
					})
				} else {
					folderRead(entry);
				}
			}

		},

		//检查文件格式
		check(file) {
			let str = this.$getFileType(file.name);
			if(str === 'pdf' || str === 'docx' || str === 'jpg' || str === 'jpeg' || str === 'png') {
				this.pushInReady(file);

			} else {
				this.$message.error('请上传正确的文件格式！当前支持:.pdf,.doc,.docx,.jpg,.jpeg,.png');
			}
		},
		//检查是否开始上传状态    
		checkStartUpload(obj) {
			//如果是第一个文件 第一次上传 2秒后 直接开始上传

			if(obj.uploaded === 'first') {
				console.log("fffffffffff");
				setTimeout(() => {
					this.startUpload();
				}, 2000);
			}

			//取数组0~length-1, 如果所有的文档上传状态都为TRUE 说明所有文档都上传完毕 可以再开始上传了

			let arr = this.readyUploadList.slice(0, this.readyUploadList.length - 1);
			let flag1 = false;
			if(arr.length) {
				flag1 = arr.every(item => {
					return item && item.uploaded === true;
				})
			}

			if(flag1) {
				setTimeout(() => {
					this.startUpload();
				}, 2000);
			}
		},

		//暂时不考虑MD5重复
		hadMd5(md5) {
			let flag = this.readyUploadList.some(item => {
				return item.md5 === md5
			});
			return flag;
		},
		//获取MD5
		getMd5() {
			return pub.getMd5(file).then((md5) => {
				return md5
			})
		},
		includeFile(obj) {
			let flag = false;
			this.readyUploadList.forEach(function(item) {
				if(item.name === obj.name && item.uploaded === true) {
					flag = true;
				}
			})
			return flag;
		},
		//放入待上传的数组
		pushInReady(file) {
			let obj = this.formatFile(file);
			if(this.includeFile(obj)) {
				this.$message.error("请勿重复上传");
				console.log(123);
			} else {
				if(!this.readyUploadList.length) {
					obj.uploaded = 'first';
				}
				this.readyUploadList.push(obj);
			}
			this.checkStartUpload(obj);
		},
		//预处理单个文件
		formatFile(file) {
			let obj = {};
			obj.file = file;
			obj.progress = 0;
			obj.percentage = 0;
			obj.hasUpload = false;
			obj.name = file.name;
			obj.fileName = file.name;
			obj.lastModified = file.lastModified;
			obj.type = file.type;
			obj.uploaded = false;
			obj.deadline = null;
			obj.needPay = true;
			return obj;
		},
		//触发点击
		clickUpload() {
			this.$refs.inp.click();
		},
		//点击上传
		singleUpload(event) {
			let file = event.currentTarget.files[0];
			this.check(file);
		},

		//开始给后端传
		startUpload() {
			let obj = this.readyUploadList[this.currentIndex];
			if(obj) {
				this.pushOneFile(obj);
			}
		},

		//传给后端一个文件
		pushOneFile(obj) {
			let time = new Date();
			let timeStr = time.getTime() + "" + this.$uuid();
			pub.getMd5(obj.file).then(md5 => {
				obj.md5 = md5;
				this.postPart(obj, 0, timeStr);
			})
		},
		postPart(data, index, timeStr) {
			let md5 = data.md5;
			let file = data.file;
			let that = this;
			let chunkSize = this.chunkSize; // Read in chunks of 2MB
			let chunks = Math.ceil(file.size / chunkSize);
			let currentChunk = index;
			let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
			let formData = new FormData();
			let start = currentChunk * this.chunkSize;
			let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
			let userData = {};
			if(sessionStorage.userData) {
				userData = JSON.parse(sessionStorage.userData);
			} else {
				this.$message.error('登录超时，请重新登录');
				return
			}

			formData.append("data", blobSlice.call(file, start, end)); //分段文件
			formData.append("phoneNumber", userData.phoneNumber); //电话
			formData.append("userId", userData.id); //USER ID
			formData.append("lastModified", timeStr); //上传时间
			formData.append("fileName", file.name); //文件名
			formData.append("total", chunks); //总共分成几份
			formData.append("index", currentChunk + 1); //当前传的是第几份
			formData.append("md5", md5); //md5
			console.log("ssssssssssssssssssss", timeStr);
			let xhr = new XMLHttpRequest();
			xhr.open('post', this.posturl, true);
			xhr.onload = (event) => {
				if(xhr.status === 200) {
					let obj = JSON.parse(event.currentTarget.response);
					pub.checkSession(obj);
					if(!obj) {
						this.postPart(data, currentChunk, timeStr);
					}

					if(!obj.state && obj.code == 9000) {
						this.$message.error("文件无法解析,请检查您的文件");
						this.readyUploadList = [];
						return
					}
					if(!obj.state && obj.code == 9001) {
						this.$message.error("文件格式有误!");
						this.readyUploadList = [];
						return
					}

					//pub.console(event.currentTarget.response);
					if((currentChunk + 1) < chunks) {
						pub.console('上传' + file.name + 'part' + currentChunk + '成功....' + md5);
						currentChunk++;
						pub.console('继续上传' + currentChunk);
						this.postPart(data, currentChunk, timeStr)
					} else {
						let doc;
						if(obj.state && obj.message === "文件上传成功") {
							doc = obj.ext;
						}

						//this.readyUploadList.forEach(item => {
						//	if(doc.fileName && item.name === doc.fileName) {
						data = Object.assign(data, doc);
						data.percentage = 100;
						data.baseTime = this.$calcBaseTime(data.price, data.difficulty);
						//	}
						//})
						console.log(this.readyUploadList);
						data.uploaded = true;
						this.currentIndex++;
						this.startUpload();
						pub.console(event.currentTarget.response);
						pub.console(file.name + '上传完毕');
					}　　　　　　
				} else {
					this.postPart(data, 0, timeStr);　　　　　　　
					//alert('上传part' + currentChunk + '失败');　　　　　　
				}　
			};

			xhr.onerror = (e) => {
				this.postPart(data, 0, timeStr);　
			}

			xhr.upload.onprogress = (e) => {
				if(e.lengthComputable) {
					var complete = (e.loaded / e.total * 100 | 0);
					data.percentage = (100 / (chunks).toFixed(2) * (currentChunk + 1)).toFixed(2);
				}　
			}

			xhr.send(formData);

		},

		checkMd5(file) {
			return new Promise((resovle, reject) => {
				resovle(true)
			});
		}
	},
	created() {
		if(pub.isIE()) {
			this.title = "请将单个文件拖拽至此,如需上传大文件或多个文件建议使用谷歌浏览器,只支持pdf和word文件";
		} else {
			this.title = "请拖拽单个文件或文件夹,只支持pdf和word文件";
		}
	}
});

//计算价格容器
Vue.component('yhn-pricebox', {
	template: `<div class="priceBox" v-show="showFlag"  element-loading-text="正在计算文件价格,请耐心等待~">
						<h1 class="title">
							下单支付
						</h1>
						<div class="pricePiece">
							<div class="card doc">
								<h1><i class="el-icon-document icon"></i>文档</h1>
								<div class="content" v-show="showFlag">
									<p class="ellipsis names">
										{{flieNames}}
									</p>
									等{{nums}}个文件
								</div>
							</div>
							<div class="card typ">
								<h1><i class="el-icon-sort icon"></i>选择文档转换方式</h1>
								<div style="margin-top:20px;">
									<el-radio v-model="transType" label="0" border>精简格式</el-radio>
									<el-radio v-model="transType" label="1" border>标准格式</el-radio>
								</div>
							</div>
							<div class="card time">
								<!--<h1><i class="el-icon-time icon hide"></i>推荐交稿时间</h1>
								<p style="margin-top:10px;hide"><span style="color:red">{{suggestTime|toTime}}</span></p>
								-->
								<h1><i class="el-icon-time icon"></i>自定交稿时间</h1>
								<el-date-picker  style="position:relative;margin-top:10px" @change="" :editable="false" v-model="time"  type="datetime" format="yyyy年MM月dd日 HH点" placeholder="选择日期时间">
								</el-date-picker>
								
							</div>
							<div class="card detail">
								<h1><i class="el-icon-edit-outline icon"></i>需求说明:</h1>
								<el-input type="textarea" v-model="userDemand" style="width:400px;margin-top:10px;"></el-input>
							</div>
						</div>
						<div class="totalPrice">
							<div class="h-center">
								<b class="num">合计：{{total}}</b> <el-button type="danger" @click="goPay">去支付</el-button>
							</div>
						</div>
					</div>`,
	props: ['list'],
	data() {
		return {
			transType: '0',
			abc: '',
			time: '',
			userDemand: ''
		}
	},
	computed: {
		showFlag() {
			if(this.list.length > 0) {
				return true
			} else {
				return false
			}
		},
		loadingFlag() {
			let flag = this.list.every(item => {
				if(!item) {
					return true
				}
				return item.uploaded === true
			});
			return !flag;
		},

		flieNames() {
			let str = '';
			this.list.forEach(file => {
				if(file && file.needPay) {
					console.log("iiiiiiiii", file);
					str += (file.fileName + ',');
				}
			})
			return str;
		},
		suggestTime() {
			let time = 0;
			this.list.forEach(file => {
				if(file && file.price) {
					if(file.baseTime > time) {
						time = file.baseTime;
					}
				}
			});
			this.time = this.$suggestTime(time);
			return this.$suggestTime(time);
		},
		total() {
			let num = 0;
			this.list.forEach(file => {
				if(file && this.time && file.price) {
					num += this.$calcPrice(file.price, file.difficulty, this.time);
				}
			})
			return 10
		},
		nums() {
			let num = 0;
			this.list.forEach(file => {
				if(file && file.needPay) {
					num++;
				}
			})
			return num
		},
		totalPages() {
			let pages = 0;
			this.list.forEach(file => {
				if(file) {
					pages += this.$getPages(file.price, file.difficulty);
				}
			});
			return pages;
		},
	},

	watch: {
		time() {
			//this.getPrice();
		}
	},
	methods: {
		getPrice() {
			let userData = JSON.parse(sessionStorage.userData);
			let dat = new Date('1999', '1', 0);
			console.log(dat);
			let time = dat;
			if(this.time) {
				time = this.time;
			}
			//			let flag=this.list.some(item=>{
			//				return !item.id
			//			});
			//			
			//			if(flag){
			//				return
			//			}
			let idList = [];
			this.list.forEach(file => {
				if(file && file.id) {
					idList.push(file.id);
				}
			});
			let obj = {
				userId: userData.id,
				deadline: time,
				documentIds: idList,
			}
			api.getPrice(obj).then(data => {
				console.log(data);
			})
		},
		checkTime() {
			console.log(this.time);
			let markTime = new Date(this.time);
			let timeNow = new Date();
			let markStr = markTime.getTime();
			let nowStr = timeNow.getTime();
			let daytime = 1000 * 60 * 60 * 24 - 1000 * 60 * 2;
			if(!this.time) {
				this.time = null
				this.$message.error('选择日期距离现在时刻需大于24小时，请重新选择！');
			}
			if(markStr - nowStr > daytime) {
				return true;
			} else {
				this.time = null
				this.$message.error('选择日期距离现在时刻需大于24小时，请重新选择！');
			}
		},
		formatToPay(arr) {
			console.log(arr);
		},
		goPay() {
			if(!this.time) {
				this.$message.error('请先选择交稿时间!');
				return
			}
			let userData = JSON.parse(sessionStorage.userData);
			let obj = {};
			obj.phoneNumber = userData.phoneNumber;
			obj.userId = userData.id;
			obj.type = this.transType;
			obj.userDemand = this.userDemand;
			let oldArr = JSON.parse(JSON.stringify(this.list));

			let arr = [];

			oldArr.forEach(item => {
				if(item.needPay) {
					arr.push(item)
				}
			});
			arr.forEach(item => {
				if(item) {
					item.deadline = this.time;
				}
			});

			obj.documentList = arr;

			api.makeOrder(obj).then(data => {
				if(data.state) {
					sessionStorage.payArr = JSON.stringify(arr);
					sessionStorage.orderData = JSON.stringify(data.ext);
					sessionStorage.orderPrice = this.total;
					window.location.href = "../pay/pay.html";
				} else {
					this.$message.error('下单失败,请稍后再试!');
				}
			}).catch(error => {
				this.$message.error('请求失败,请稍后再试!');
			})

		},
		useSugTime() {
			let time = new Date(this.suggestTime);
			this.time = time;
		}

	},
	created() {},
	mounted() {}
});

Vue.component('yhn-showimg', {
	template: `<el-dialog class="wordbox" :title="name" :visible.sync="flag" width='70%' center>
					<img style="display:block;margin: 0 auto" :src="url"/>
			   </el-dialog>`,
	props: ["url", 'name', 'flag'],
	data() {},
	methods: {},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
		}
	},

	created() {}
});

Vue.component('yhn-demand', {
	template: `<el-dialog class="wordbox" :title="name" :visible.sync="flag" width='70%' center>
					<div>客户需求:{{demand}}</div>
			   </el-dialog>`,
	props: ['demand', 'flag'],
	data() {},
	methods: {},
	watch: {
		flag(val) {
			this.$emit("update:flag", val);
		}
	},
	created() {}
});

Vue.component('yhn-uploadline', {
	template: `<div class="uploadLine">
				<div ref="line" class="inside"></div>
				<span class="num">{{progress}}%</span>
			  </div>`,
	props: ['progress'],
	data() {},
	methods: {},
	watch: {
		progress(val) {
			this.$nextTick(() => {
				this.$refs.line.style.width = '' + val + '%';
			})
		}
	},
	created() {
		this.$nextTick(() => {
			this.$refs.line.style.width = '' + this.progress + '%';
		})
	}
});