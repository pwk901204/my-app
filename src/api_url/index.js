var url = {}

let __host__ = "";

switch (window.location.host) {
	case 'localhost:3000':
		// __host__ = "https://doctor.mdsonline.cn";
		//__host__ = "http://rqiang.mynatapp.cc";

		__host__ = "http://api.xiayuanyin.cn"
		// __host__ = "http://192.168.0.111:3001";
		break;
}
url.host = __host__;

//登录
url.login = __host__ + '/api/doctor/users/login';

//注册
url.sign_up = __host__ + '/api/doctor/users/sign_up';

//注册验证码
url.sendCode = __host__ + '/api/doctor/sms/new';

//验证码验证
url.sendCodeValid = __host__ + '/api/doctor/sms/valid';

//省份
url.regions = __host__ + '/api/doctor/regions/all';

//医院
url.hospitals = __host__ + '/api/doctor/hospitals';

//学校
url.schools = __host__ + '/api/doctor/schools';

//科室
url.departments = __host__ + '/api/doctor/departments/all';

//找回密码
url.update_password = __host__ + '/api/doctor/users/update_password';

//首页 轮播图
url.carousels = __host__ + '/api/doctor/carousels';


module.exports = url;