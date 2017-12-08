
//获取服务器地址
function GetDataUrl() {
    if (true) {
        return 'http://fanlil.com';
    } else {
        return 'http://192.168.1.188';
    }
}
//获取AppID
function GetAppID() {
    if (true) {
        return api.appid;
    } else {
        return '';
    }
};

//获取App名称
function GetAppName() {
    if (true) {
        return api.appName;
    } else {
        return '';
    }
};

//获取淘宝客mm_id
function GetMMID() {
    if (localStorage.getItem("appwsw_mmid")) {
        return localStorage.getItem("appwsw_mmid");
    } else {
        return 'mm_59691188_0_0';
    }
};

function GetLog(framName, winName) {
    var module = api.require('hardwareInfo');
    module.getPerformanceInfo(function (ret, err) {
        console.log("framName:" + framName + "winName:" + winName + "当前app内存占用大小:" + ret.curAppMemory + "当前cpu占用率:" + ret.cpu + "cpu核心数:" + ret.cpuCount +
        "cpu最大速度:" + ret.maxCpuFreq + " " + "cpu最小速度:" + ret.minCpuFreq);
    });
};

function GetLaiYuan(status) {
    var arr = {
        1: "淘宝",
        2: "天猫",
        3: "京东",
        4: "拍拍",
        5: "购买",
    }
    if (status > 4) {
        status = 5;
    }
    return arr[status]
};

//大淘客分类ID
function GetDTKCid(status) {
    var arr = {
        0: 1,
        1: 9,
        2: 10,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
    }
    return arr[status]
};

//---所有广告模块公共代码

//打开外部链接
///_name:模块名称；
///_url: 外部链接如：http://www.baidu.com;外部链接必须带http://
function AdOpenUrl(_name, _url) {
    OpenFramWin("url" + _name, _url, _name, {});
};

//打开系统内部文章
///_id：文章ID，到后台文章列表查看，必须为数字
///_title：文章标题
function AdOpenNews(_id, _title) {
    OpenFramWin("new" + _id, "../../html/news/news_content.html", _title, { "newID": _id }, "../../html/frame/frame3.html");
};

//打开签到模块
function AdOpenSign() {
    if (localStorage.getItem('LoginState')) {
        OpenFramWin("user_sign", "../../html/user/user_sign.html", "签到有礼", {});
    } else {
        Open_User_LogIn();
    };
};

//打开有奖邀请
function AdOpenFriendInvitation() {
    if (localStorage.getItem('LoginState')) {
        OpenFramWin("friend_invitation", "../../html/user/friend_invitation.html", "有奖邀请", {});
    } else {
        Open_User_LogIn();
    };
};

//打开秒杀模块
function AdOpenSeckill() {
    OpenFramWin("product_seckill", "../../html/user/product_seckill.html", "全网秒杀", {}, "../../html/frame/frame5.html");
};

//

//---所有广告模块公共代码

//数据请求链接集合
var ApiUrl =
    {
        GetAppSetUp: GetDataUrl() + "/appwsw/index.php?mod=config&act=appbase",   //获取app配置
        GetAppHome: GetDataUrl() + "/appwsw/index.php?mod=config&act=indexall",   //App首页
        GetGoodsType: GetDataUrl() + "/appwsw/index.php?mod=goods&act=type&tag=goods",   //获取分类,淘宝
        GetUserInfo: GetDataUrl() + "/appwsw/index.php?mod=user&act=index",//获取用户信息
        GetLoginOut: GetDataUrl() + "/appwsw/index.php?mod=user&act=exit",//登出
        GetShouList: GetDataUrl() + "/appwsw/index.php?mod=user&act=mingxi&do=in&page=",//获取收入明细
        GetZhiList: GetDataUrl() + "/appwsw/index.php?mod=user&act=mingxi&do=out&page=",//获取支出明细
        GetTXJiFenBao: GetDataUrl() + "/appwsw/index.php?mod=user&act=info&sub=2&type=1",//获取集分宝提现限制
        GetTXYuE: GetDataUrl() + "/appwsw/index.php?mod=user&act=info&sub=2&type=2",//获取余额提现限制
        GetTXInfo: GetDataUrl() + "/appwsw/index.php?mod=user&act=info&sub=1",//获取提现信息信息
        GetOrderListTB: GetDataUrl() + "/appwsw/index.php?mod=user&act=order&do=taobao&page=",//获取淘宝订单
        GetOrderListSC: GetDataUrl() + "/appwsw/index.php?mod=user&act=order&do=mall&page=",//获取商城订单
        GetOrderListRW: GetDataUrl() + "/appwsw/index.php?mod=user&act=order&do=task&page=",//获取任务订单
        GetOrderListSH: GetDataUrl() + "/appwsw/index.php?mod=user&act=order&do=checked&page=",//获取审核订单
        GetUserIcon: GetDataUrl() + "/appwsw/index.php?mod=user&act=upload",//提交头像
        GetWZList: GetDataUrl() + "/appwsw/index.php?mod=goods&act=type&tag=wzfl",//文章分类
        GetQq: GetDataUrl() + "/appwsw/index.php?mod=config&act=appbase&type=qq",//qq客服
        GetMail: GetDataUrl() + "/appwsw/index.php?mod=user&act=msg&do=list&page=",//站内信
        GetAiTaoBaoType: GetDataUrl() + "/appwsw/index.php?mod=config&act=aitaobao",//爱淘宝一级分类
        GetAiTaoBaoType2: GetDataUrl() + "/appwsw/index.php?mod=config&act=aitaobao&type=url&url=",//爱淘宝二级分类
        GetMallRebate: GetDataUrl() + "/appwsw/index.php?mod=mall&act=index",//商城返利
        GetRanking: GetDataUrl() + "/appwsw/index.php?mod=user&act=jifenbang",//排行榜
        GetMobileRepeat: GetDataUrl() + "/appwsw/index.php?mod=user&act=register&registertype=test&mobile=",//验证手机号是否存在
        GetYZM: GetDataUrl() + "/appwsw/index.php?mod=user&act=getcode&telephone=",//获取验证码
        GetFans: GetDataUrl() + "/appwsw/index.php?mod=user&act=invite&rec=13&sub=1",//获取粉丝
        GetSign: GetDataUrl() + "/appwsw/index.php?mod=user&act=sign&sub=1",//签到信息
        GetGoSign: GetDataUrl() + "/appwsw/index.php?mod=user&act=sign",//签到
        GetSeckillType: GetDataUrl() + "/appwsw/index.php?mod=goods&act=type&tag=spfl",//秒杀分类
    };