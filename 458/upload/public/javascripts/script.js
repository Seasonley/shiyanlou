// 在 String 对象的 prototype 属性中添加我们自定义的 format() 方法
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof(args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

$(function() {
    $('#btnSub').on('click', function() {
        var fulAvatarVal = $('#fulAvatar').val(),
            errorTip = '<div id="errorTip" class="alert alert-warning">{0}</div> ';

        $("#errorTip,#alt_warning").remove();

        if (fulAvatarVal.length == 0) {
            $("#container").prepend(errorTip.format('请选择要上传的文件'));
            return false;
        }

        // 验证上传文件后缀
        var extName = fulAvatarVal.substring(fulAvatarVal.lastIndexOf('.'), fulAvatarVal.length).toLowerCase();

        if (extName != '.png' && extName != '.jpg') {
            $("#container").prepend(errorTip.format('只支持png和jpg格式图片'));
            return false;
        }

        return true;
    })
});