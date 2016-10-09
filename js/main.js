$(function(){
    
    var lastUpdate = 0;
    //摇动时间
    var duringTime = 300;
    var last_x = 0,
        last_y = 0,
        last_z = 0;
    //速度阈值
    var shake = 800;
    var currentList = window.cityList.sohumedia;

    //注册摇一摇事件
    var initRock = function(){
        if(window.DeviceMotionEvent){
            window.addEventListener('devicemotion', function(e){
                deviceMotionHandler(e);
            });
        }      
    };

    //初始化选择城市
    var initChangeCity = function(){
        $('.ccBtn select').change(function(){
            var cityName = $(this).val();
            currentList = window.cityList[cityName];
        });
    };

    //摇一摇函数体
    var deviceMotionHandler = function(e){
        var curTime = new Date().getTime();
        var diffTime = curTime - lastUpdate;
        var acceleration = e.accelerationIncludingGravity;
        var x, y, z, speed;

        if(diffTime > duringTime){
            lastUpdate = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            speed = Math.abs(x + y + z - last_x - last_y - last_z)/diffTime * 10000;
            //摇动速度大
            if(speed > shake){
                alert('这顿咱们吃' + getRandom() + '！');
            }
        }
    };

    //获取随机答案
    var getRandom = function(){
        var length = currentList.length;
        var answer = currentList[ Math.floor( Math.random() * length) ];
        return answer;
    };

    //弹窗提示答案
    //TODO


    function init(){
        initRock();
        initChangeCity();
    }
    init();
});
