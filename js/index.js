$(function(){
    setTimeout(function(){
        $(".start").slideUp(1000);

    },3000)
    setTimeout(function(){
        $(".main").slideDown(1000);
    },4000)

    //拖拽事件
    var W = $(document).width()-260;
    var H = $(document).height()-$(".detail").height()-70;
    $(document).on("mousedown",function(e){
        var x = e.offsetX;
        var y = e.offsetY;
        $(document).on("mousemove",function(e){
            var ev = e.target;
            var nx = e.pageX;
            var ny = e.pageY;
            if(nx-x<0&&ny-y<0){
                $(ev).trigger("drag",{left:0,top:0});
            }else if(nx-x<0&&ny-y>H){
                $(ev).trigger("drag",{left:0,top:H});
            }else if(nx-x>W&&ny-y<0){
                $(ev).trigger("drag",{left:W,top:0});
            }else if(nx-x>W&&ny-y>H){
                $(ev).trigger("drag",{left:W,top:H});
            }else if(nx-x<0){
                $(ev).trigger("drag",{left:0,top:ny-y});
            }else if(ny-y<0){
                $(ev).trigger("drag",{left:nx-x,top:0});
            }else if(nx-x>W){
                $(ev).trigger("drag",{left:W,top:ny-y});
            }else if(ny-y>H){
                $(ev).trigger("drag",{left:nx-x,top:H});
            }else{
                $(ev).trigger("drag",{left:nx-x,top:ny-y});
            }
        })
        $(document).on("mouseup",function(){
            $(document).off("mousemove");
            $(document).off("mouseup");
        })
    })

    //输入框的动画
    var add = $(".add");
    var form = $("form");
    var close = $(".close");

    var flag = true;
    add.click(function(){
        if(flag){
            form.css({display:"block",animation:"b 1s ease"});
            flag = false;
        }else{
            form.finish().css("display","none");
            flag = true;
        }
    })
    close.click(function(){
        form.finish().css("display","none");
        flag = true;
    })

    //表单的异步验证
    $(".btn").click(function(){
        var title = $(".title").val();
        var content = $(".content").val();
        var time = $("#time").val();
        if(title == ""){
            $(".warn").css("display","block");
            $(".warn h5").html("请输入标题");
            $(".anniu").click(function(){
                $(".warn").css("display","none");
            })
            return;
        }
        if(content == ""){
            $(".warn").css("display","block");
            $(".warn h5").html("请输入内容");
            $(".anniu").click(function(){
                $(".warn").css("display","none");
            })
            return;
        }
        if(time == ""){
            $(".warn").css("display","block");
            $(".warn h5").html("请输入时间");
            $(".anniu").click(function(){
                $(".warn").css("display","none");
            })
            return;
        }

        //存储信息
        var oldInfo = localStorage.message==null?[]:JSON.parse(localStorage.message);
        var obj = {title:title,content:content,time:time,id:new Date().getTime()};
        oldInfo.push(obj);
        var str = JSON.stringify(oldInfo);
        localStorage.message = str;

        $(".title").val("");
        $(".content").val("");
        $("#time").val("");

        var copy = $(".detail:first").clone().appendTo(".main").css({
            left:($(window).width()-$("form").outerWidth())*Math.random(),
            top:($(window).height()-$("form").outerHeight())*Math.random(),
            display:"block"
        }).attr({"data-sport":"fd","id":obj.id});

        copy.find(".detail-title").html(title);
        copy.find(".detail-con").html(content);
        copy.find(".detail-time").html(time);

    })

    //将本地存储的数据读出来
    var message = localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i = 0;i<message.length;i++){
        copy = $(".detail:first").clone().appendTo(".main").css({
            left:($(window).width()-$("form").outerWidth())*Math.random(),
            top:($(window).height()-$("form").outerHeight())*Math.random(),
            display:"block"
        }).attr({"id":message[i].id});

        copy.find(".detail-title").html(message[i].title);
        copy.find(".detail-con").html(message[i].content);
        copy.find(".detail-time").html(message[i].time);
    }



  /*  $(".change").dblclick(function(){
        alert(1);
    })*/

    //进行拖拽
    $(document).delegate(".detail","drag",function(e,data){
       $(this).css({
           left:data.left,
           top:data.top
       })
    })

    $(document).delegate(".detail","mousedown",function(e){
        $(".detail").css({
            zIndex:0
        })
        $(this).css({
            zIndex:10
        })
        e.preventDefault();
    })

    //删除信息
    $(document).delegate(".off","click",function(){
        var id = $(this).parent().attr("id");
        var arr = JSON.parse(localStorage.message);
        for(var i = 0;i<arr.length;i++){
            if(id == arr[i].id){
                arr.splice(i,1);
                localStorage.message = JSON.stringify(arr);

                $(this).parent().remove();
            }
        }
    })



    //时间
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var date = d.getDate();
    var nd = year+"-"+month+"-"+date;
    $(".todyTime").html(nd);

    setInterval(function(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var date = d.getDate();
        var nd = year+"-"+month+"-"+date;
        $(".todyTime").html(nd);
    },24*60*60*1000);

})