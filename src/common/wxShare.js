
export default (config={})=>{
	console.log(config,global.location.href)

	fetch(global.url.wechats_share + "?url=" + global.location.href)
	.then((response)=>response.json())
	.then((data)=>{
		console.log(data);
		//process.env.NODE_ENV === "development" ?
		global.wx.config({
		    debug:  true , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: data.appid, // 必填，公众号的唯一标识
		    timestamp: data.timestamp, // 必填，生成签名的时间戳
		    nonceStr: data.noncestr, // 必填，生成签名的随机串
		    signature: data.signature,// 必填，签名，见附录1
		    jsApiList: [
			    "onMenuShareTimeline",
				"onMenuShareAppMessage",
				"onMenuShareQQ",
				"onMenuShareWeibo",
				"onMenuShareQZone",
		    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		global.wx.ready(function(){

			//发送给朋友
			global.wx.onMenuShareAppMessage({
				title: config.title || '上海儿童营养中心', // 分享标题
				desc: config.desc || '上海儿童营养中心专注儿童营养健康60年', // 分享描述
				link: config.link || 'http://scnc.mdslife.com/', // 分享链接
				imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg', // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			//分享到朋友圈
			global.wx.onMenuShareTimeline({
				title: config.title || '上海儿童营养中心',
				desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
				link: config.link || 'http://scnc.mdslife.com/',
				imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
			});
			//分享到QQ
			global.wx.onMenuShareQQ({
				title: config.title || '上海儿童营养中心',
				desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
				link: config.link || 'http://scnc.mdslife.com/',
				imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',

			});
			//分享到QQ空间
			global.wx.onMenuShareQZone({
				title: config.title || '上海儿童营养中心',
				desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
				link: config.link || 'http://scnc.mdslife.com/',
				imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',

			});
			//分享到腾讯微博
			global.wx.onMenuShareWeibo({
				title: config.title || '上海儿童营养中心',
				desc: config.desc || '上海儿童营养中心专注儿童营养健康60年',
				link: config.link || 'http://scnc.mdslife.com/',
				imgUrl: 'http://wx2.sinaimg.cn/small/908edb0egy1fktddvnok6j203o03odfp.jpg',
			});

		});

		global.wx.error(function(res){
			console.log(res)
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
	})
}

