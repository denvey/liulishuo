/**
 * Created by dwzjq on 14-2-23.
 */
$(function(){
    var state = window.localStorage.getItem("state") || 0;
    if(state == "0"){
        /*$("#tipsWrapper").show();*/
        window.localStorage.setItem("state","1");
    }
    //nav
    $(".footer ul").on("click","a",function(){
        var pageId = $(this).attr("id");
        console.log($("li"));
        $("#"+pageId+"Page").addClass("pt-page-cur").siblings().removeClass("pt-page-cur");
    });
    //mock往后端发送请求后返回的数据
    var url = "",
        data = {};
    $.ajax({
        url:url,
        type:"GET",
        data:data,
        dataType:"jsonp",
        success:function(json){
            console.log(json);
        },
        error:function(e){
            console.log(e);
        }
    });
    $(".list").on("click","li",function(){
        var that = $(this);
        if(that.hasClass("cur")){
            that.removeClass("cur");
        }else{
            that.addClass("cur");
        }
    });

});
