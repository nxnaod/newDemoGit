//打开窗口
function OpenFramWin(frameName, frameUrl, frameTitle, frameParam, url) {
    var _param = {
        frameName: frameName,
        frameUrl: frameUrl,
        frameTitle: frameTitle,
        isFrame: false
    };
    if (frameParam == "undefined" || frameParam == null || frameParam == "") { } else
    {
        $.extend(_param, frameParam);
    };
    url = url || "widget://html/frame/frame.html";
    api.openWin({
        name: "frameWin_" + frameName,
        url: url,
        pageParam: _param,
        slidBackEnabled: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        bounces: false,
        allowEdit: true,
        delay: 0,
        reload: true,
        progress: {
            type: "page",
            color: "#FE5F54"
        },
        animation: {
            type: "none",                //动画类型（详见动画类型常量）
            subType: "from_right",       //动画子类型（详见动画子类型常量）
            duration: 0                //动画过渡时间，默认300毫秒
        }
    });
};

//带特效打开win
function OpenWin(_name, _url, _json, _type, _subType) {

    var type = _type || "none";
    var subType = _subType || "from_right";
    //type 取值范围：
    //none            //无动画效果  //push            //新视图将旧视图推开
    //movein            //新视图移到旧视图上面    //fade            //交叉淡化过渡（不支持过渡方向）
    //flip            //翻转效果    //reveal            //将旧视图移开,显示下面的新视图
    //ripple            //滴水效果（不支持过渡方向）  //curl            //向上翻一页
    //un_curl            //向下翻一页   //suck            //收缩效果（不支持过渡方向）
    //cube            //立方体翻滚效果
    //subType 取值范围：
    //from_right        //从右边开始动画   //from_left        //从左边开始动画
    //from_top        //从顶部开始动画    //from_bottom        //从底部开始动画

    api.openWin({
        name: _name,
        url: _url,
        bounces: false,
        allowEdit: true,
        delay: 0,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        animation: {
            type: type,
            subType: subType,
            duration: 50
        },
        pageParam: _json,
    });
}

//打开win不带下拉单页面
function OpenWinBounces(_name, _url, _json, _bounces) {
    api.openWin({
        name: _name,
        url: _url,
        pageParam: _json,
        slidBackEnabled: false,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        bounces: _bounces,
        allowEdit: true,
        delay: 0,
        reload: true,
        progress: {
            type: "page",
            color: "#FE5F54"
        },
    });
}

//判断登录状态
function GetLoginState() {
    if (localStorage.getItem('LoginState')) {
        return true;
    } else {
        return false;
    }
};

//登录
function UserLogIn(index, way, name, frameName) {
    var _way = way || "";
    var _name = name || "root";
    var _frameName = frameName || "";
    if (GetLoginState()) {
    }
    else {
        Open_User_LogIn(index, _way, _name, _frameName);
    };
}

//登出
function LoginOut() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '数据加载中...',
        modal: true
    });
    api.ajax({
        url: ApiUrl.GetLoginOut,
        method: 'get',
    }, function (ret, err) {
        if (ret) {
            if (ret.s == 1) {
                api.alert({
                    title: '提示',
                    msg: ret.r,
                }, function (ret, err) {
                    localStorage.removeItem('LoginState');
                    var alibaichuan = api.require('alibaichuan');
                    alibaichuan.logout(function (ret, err) {
                    });
                    UserLogIn(2, 'HomeMenuSwitch(4)', "root");
                });
            }
        } else {

        };
        api.hideProgress();
    });
}


//申请提现
function CashApply() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '权限判断中...',
        modal: true
    });
    api.ajax({
        url: ApiUrl.GetTXInfo,
        method: 'get',
    }, function (ret, err) {
        if (ret) {
            if (ret.s == 1) {
                OpenFramWin("tixian", "../../html/user/tixian.html", "申请提现", {}, "../../html/frame/frame3.html");
            } else {
                api.alert({
                    title: '提示',
                    msg: ret.r,
                }, function (ret, err) {
                    OpenFramWin("caiwu_set", "../../html/user/caiwu_set.html", "个人财务设置", {}, "../../html/frame/frame3.html");
                });
            };
        };
        api.hideProgress();
    });
}

//签到有礼
function Sign(_title) {
    if (localStorage.getItem('LoginState')) {
        OpenFramWin("user_sign", "../../html/user/user_sign.html", _title, {});
    } else {
        Open_User_LogIn("", "Sign()", "root", "jingxuan");
    };
};
//推广邀请
function OpenInvite() {
    if (localStorage.getItem('LoginState')) {
        OpenFramWin("friend_invitation", "../../html/user/friend_invitation.html", "有奖邀请", {});
    } else {
        Open_User_LogIn("", "OpenInvite()", "root", "jingxuan");
    };
};

//推送开关
function Push() {
    var push = api.require('push');
    var tfpush = localStorage.getItem("Push");
    if (tfpush == "false") {
        push.setPreference({
            notify: false,
        });
    } else {
        push.setPreference({
            notify: true,
        });
    };
};

//分享
function Share(_title, _description, _img, _url) {
    var wx = api.require('wx');
    var qq = api.require('qq');
    var sinaWeiBo = api.require('sinaWeiBo');
    var dialogBox = api.require('dialogBox');
    dialogBox.share({
        rect: {
            w: 300,
            h: 220
        },
        items: [{
            text: '微信',
            icon: 'widget://image/share/weifriend.png'
        }, {
            text: '朋友圈',
            icon: 'widget://image/share/friend.png'
        }, {
            text: 'QQ',
            icon: 'widget://image/share/QQ.png'
        }, {
            text: 'QQ空间',
            icon: 'widget://image/share/Qzone.png'
        }, {
            text: '微博',
            icon: 'widget://image/share/weibo64.png'
        }, {
            text: '复制链接',
            icon: 'widget://image/share/copy.png'
        }],
        styles: {
            bg: 'rgba(255,255,255,0.9)',
            corner: 6,
            column: 3,
            horizontalSpace: 15,
            verticalSpace: 15,
            itemText: {
                color: '#000',
                size: 15,
                marginT: 10
            },
            itemIcon: {
                size: 45
            }
        },
        tapClose: true
    }, function (ret) {
        if (ret.index == 0) {
            wx.shareWebpage({
                scene: 'session',
                title: _title,
                description: _description,
                thumb: _img,
                contentUrl: _url
            }, function (ret, err) {
                if (ret.status) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "分享成功",
                        duration: 2000,
                        location: 'middle'
                    });
                };
            });
        };
        if (ret.index == 1) {
            wx.shareWebpage({
                scene: 'timeline',
                title: _title,
                description: _description,
                thumb: _img,
                contentUrl: _url
            }, function (ret, err) {
                if (ret.status) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "分享成功",
                        duration: 2000,
                        location: 'middle'
                    });
                };
            });
        };
        if (ret.index == 2) {
            qq.shareNews({
                url: _url,
                title: _title,
                type: 'QFriend',
                description: _description,
                imgUrl: _img
            }, function (ret, err) {
                if (ret.status) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "分享成功",
                        duration: 2000,
                        location: 'middle'
                    });
                } else {
                    api.toast({
                        msg: "分享失败" + err.msg,
                        duration: 2000,
                        location: 'middle'
                    });
                }
            });
        };
        if (ret.index == 3) {
            qq.shareNews({
                url: _url,
                title: _title,
                type: 'QZone',
                description: _description,
                imgUrl: _img
            }, function (ret, err) {
                if (ret.status) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "分享成功",
                        duration: 2000,
                        location: 'middle'
                    });
                } else {
                    api.toast({
                        msg: "分享失败" + err.msg,
                        duration: 2000,
                        location: 'middle'
                    });
                };
            });
        };
        if (ret.index == 4) {
            sinaWeiBo.sendRequest({
                contentType: 'webpage',
                text: _title,
                imageUrl: _img,
                media: {
                    title: _title,
                    description: _description,
                    thumbUrl: _img,
                    webpageUrl: _url
                }
            }, function (ret, err) {
                if (ret.status) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "分享成功",
                        duration: 2000,
                        location: 'middle'
                    });
                } else {
                    api.toast({
                        msg: "分享失败",
                        duration: 2000,
                        location: 'middle'
                    });
                }
            });
        };
        if (ret.index == 5) {
            var clipBoard = api.require('clipBoard');
            clipBoard.set({
                value: _title + "【" + _description + "】" + _url
            }, function (ret, err) {
                if (ret) {
                    dialogBox.close({
                        dialogName: 'shareWebpage'
                    });
                    api.toast({
                        msg: "复制成功，粘贴给好友",
                        duration: 2000,
                        location: 'middle'
                    });
                } else {
                    api.toast({
                        msg: "复制失败" + err.msg,
                        duration: 2000,
                        location: 'middle'
                    });
                }
            });
        };
    });
};

//打开登录页
function Open_User_LogIn(index, way, name, frameName) {
    var url = "";
    if (index == 1) {
        url = "./html/loginregister/login.html";
    } else {
        url = "../../html/loginregister/login.html";
    }
    OpenWin('login', url, { "way": way, "wayname": name, "wayframeName": frameName }, 'movein', 'from_bottom');
}

//判断空
function checkEmpty(str) {
    if (str === undefined) {
        return false;
    }
    if (str == "" || str == null) {
        return false;
    }
    return true;
};

//清除缓存
function ClearCache() {
    var size = api.getCacheSize({
        sync: true
    });
    api.clearCache(function (e) {
        api.toast({
            msg: '清除缓存：' + (size / (1024 * 1024)).toFixed(2) + 'MB',
        });
        $(".cache-size").text(0 + "MB");
    });
};

//打开外部链接
function IndexToUrl(title, url) {
    OpenFramWin(title, url, title, {}, "../html/frame/frame2.html");
};

function ReturnTop() {
    $('html,body').animate({ scrollTop: 0 }, 500);
};

function ReturnTop() {
    $('html,body').animate({ scrollTop: 0 }, 500);
};

// 判断打开欢迎页还是直接进首页调出indexframegroup
function indexOrWelcome() {
    if (localStorage.getItem("firstStart")) {
        api.execScript({
            name: 'root',
            script: 'funIniGroup();'
        });
    } else {
        api.execScript({
            name: 'root',
            script: 'Welcome();'
        });
    };
};

function LoadImage(img, url) {
    var _url;
    if (url.indexOf("http") >= 0) {
        _url = url;
    } else {
        _url = "http:" + url;
    }
    //api.imageCache({
    //    url: _url
    //}, function (ret, err) {
    //    img.src = ret.url;
    //});
    img.src = _url;
};

/*新闻滚动*/
function startmarquee(lh, speed, delay, id) {
    var t;
    var p = false;
    var o = document.getElementById(id);
    o.innerHTML += o.innerHTML + o.innerHTML + o.innerHTML;
    o.onmouseover = function () {
        p = true;
    }
    o.onmouseout = function () {
        p = false;
    }
    o.scrollTop = 0;

    function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.scrollTop += 1;
    }

    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 1;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
};


//Unicode 转换 ASCII  
function UnicodeToAscii(content) {
    var code = content.match(/&#(\d+);/g);
    result = '';
    for (var i = 0; i < code.length; i++)
        result += String.fromCharCode(code[i].replace(/[&#;]/g, ''));
    return result;
};


//插入浏览记录
function BrowseLog(_id, keyword) {
    api.ajax({
        url: GetDataUrl() + '/appwsw/index.php?mod=user&act=buyview&id=' + _id + '&&keyword=' + keyword,
        method: 'get',
    }, function (ret, err) {

    })
};