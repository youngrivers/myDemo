/**
 * Created by youngrivers on 2016/9/22.
 */
window.onload=function () {
    var cart=document.getElementById("cartTable");
    var cartT=cart.children[1].rows;
    var checks=document.getElementsByClassName("check");
    var checksAlls=document.getElementsByClassName("check-all");
    var totalAll=document.getElementById("totalAll");
    var selectedAll=document.getElementById("selectedAll");
    var foot=document.getElementById("foot");
    var selectedViewList=document.getElementById("selected-view-list");
    var selected=document.getElementsByClassName("selected")[0];
    var deleteAll=document.getElementById("deleteAll");
    //已选商品
    selected.onclick=function () {
        if (selectedAll.innerHTML!='0') {
            var selectedClass = document.getElementsByClassName("selected-view-list")[0].className;
            var arrowClass = document.getElementsByClassName("arrow-up")[0].className;
            if (selectedClass == 'selected-view-list') {
                document.getElementsByClassName("selected-view-list")[0].className= 'selected-view-list show';
                document.getElementsByClassName("selected-view")[0].style.display='block';
            }
            else {
                document.getElementsByClassName("selected-view-list")[0].className= 'selected-view-list';
                document.getElementsByClassName("selected-view")[0].style.display='none';
            }
            if (arrowClass == 'arrow-up') {
                document.getElementsByClassName("arrow-up")[0].className = "arrow-up hide";
                document.getElementsByClassName("arrow-down")[0].className = "arrow-down";
            }
            else {
                document.getElementsByClassName("arrow-up")[0].className = "arrow-up";
                document.getElementsByClassName("arrow-down")[0].className = "arrow-down hide";
            }
        }
    };
    //删除弹出层已选项  使用事件代理
    selectedViewList.onclick=function (e) {
        e=e||window.event;
        var el=e.srcElement;
        if(el.className=='cancel'){
            var index = el.getAttribute('index');
            cartT[index].getElementsByTagName('input')[0].checked = false;
            cartT[index].getElementsByTagName('input')[0].onclick();
        }
    };
    for(var i=0;i<checks.length;i++){
        //勾选事件
        checks[i].onclick=function () {
            if(this.className==="check check-all"){//验证是否勾选全选
                for(var j=0;j<checks.length;j++){
                    checks[j].checked=this.checked;
                }
            }
            if(this.checked==false){//未全选时取消全选
                for(var k=0;k<checksAlls.length;k++){
                    checksAlls[k].checked=false;
                }
            }
            getTotal();//调用计算函数
        };
    }
    for(var i=0;i<cartT.length;i++){
        //商品数量及小计事件
        cartT[i].onclick=function (e) {//传入e得到点击的class   事件代理
            e=e||window.event;
            var el=e.srcElement,
                cls=el.className;
            if(this.getElementsByTagName('input')[1].value>1){
                this.getElementsByTagName('span')[1].innerHTML='-';
            }
            switch (cls){
                case 'add':
                    this.getElementsByTagName('input')[1].value++;
                    this.getElementsByTagName('span')[1].innerHTML='-';
                    break;
                case 'reduce':
                    if(this.getElementsByTagName('input')[1].value>1){
                        this.getElementsByTagName('input')[1].value--;
                    }
                    if(this.getElementsByTagName('input')[1].value<=1){
                        this.getElementsByTagName('span')[1].innerHTML='&nbsp;';
                    }
                    break;
                case 'delate':
                    if(confirm("是否要删除？")){//类似于alert
                        this.parentNode.removeChild(this);
                    }
                    break;
                default:
                    break;
            }
            getOneTotal(this);
            getTotal();
        };
        //键盘弹起事件
        cartT[i].getElementsByTagName('input')[1].onkeyup=function () {
            if(isNaN(this.value)||this.value<1){//现在输入的数字为正整数
                this.value=1;
            }
            if(this.value>1){
                this.parentNode.getElementsByTagName('span')[0].innerHTML='-';
            }
            if(this.value<=1){
                this.parentNode.getElementsByTagName('span')[0].innerHTML='&nbsp;';
            }
            getOneTotal(this.parentNode.parentNode);
            getTotal();
        };
        //全部删除事件
        deleteAll.onclick=function () {
            if (selectedAll.innerHTML!='0') {
                if (confirm('确定全部删除？')) {
                    for (var i = 0; i < cartT.length; i++) {
                        if (cartT[i].getElementsByTagName('input')[0].checked) {
                            cartT[i].parentNode.removeChild(cartT[i]);
                            i--;//避免数组长度发生改变
                        }
                    }
                }
            }
        };
    }
    //计算
    function getTotal() {
        var selected=0,
            price=0,
            imgSrc='';
        var j=0;
        for(var i=0;i<cartT.length;i++){
            if(cartT[i].getElementsByTagName('input')[0].checked){
                j++;
                selected+=parseInt(cartT[i].getElementsByTagName('input')[1].value);//类型转换
                price+=parseFloat(cartT[i].cells[4].innerHTML);
                /*if(i>0){
                    imgSrc+='<div><img src="'+ cartT[i].getElementsByTagName('img')[0].src +'"><span class="cancel">取消选择</span></div>'
                }*/
                imgSrc+='<div><img src="'+ cartT[i].getElementsByTagName('img')[0].src +'"><span class="cancel" index="'+i+'">取消选择</span></div>'

            }
        }
        if(j>=cartT.length){//验证是否全选
            for(var k=0;k<checksAlls.length;k++){
                checksAlls[k].checked=true;
            }
        }
        selectedAll.innerHTML=selected;
        totalAll.innerHTML=price.toFixed(2);//保留2位小数
        selectedViewList.innerHTML=imgSrc;
    }
    //小计函数
    function getOneTotal(car) {
        car.cells[4].innerHTML=(parseFloat(car.cells[2].innerHTML)*parseInt(car.getElementsByTagName('input')[1].value)).toFixed(2);

    }
    checks[0].checked=true;
    checks[0].onclick();
};