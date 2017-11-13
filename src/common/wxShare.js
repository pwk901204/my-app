import WechatShare from 'images/WechatShare.png';
export default ({
	title="麦迪森在线",
	desc="专为医生打造的移动医疗及继续教育服务平台",
	link=window.location.href,
	imgUrl=window.location.origin + WechatShare    //据对路径地址
}={})=>{
	fetch(global.url.wechats_share + "?url=" + global.location.href)
	.then((response)=>response.json())
	.then((data)=>{
		global.wx.config({
		    debug:  false , // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
			});
			//分享到朋友圈
			global.wx.onMenuShareTimeline({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
			});
			//分享到QQ
			global.wx.onMenuShareQQ({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,

			});
			//分享到QQ空间
			global.wx.onMenuShareQZone({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,

			});
			//分享到腾讯微博
			global.wx.onMenuShareWeibo({
				title: title,
				desc: desc,
				link: link,
				imgUrl: imgUrl,
			});

		});

		global.wx.error(function(res){
			console.log(res)
		    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
	})
}

