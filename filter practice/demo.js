var person = [
    { name: '刘小华', src: '1.jpg', sex: 'female', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'female', des: '漂亮的程序猿' },
    { name: '陈军', src: '3.jpg', sex: 'male', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'male', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '陈学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '王美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽得妈妈' }
];
var oUl = document.getElementsByClassName('content')[0];
var input = document.getElementsByTagName('input')[0];
var btn = document.getElementsByClassName('btn')[0];
var timer = null;
var state = {
    text : '',
    sex : 'all'
}
renderDom(person);
function renderDom(arr){
    var len = arr.length;
    var str = '';
    for(var i = 0; i < len; i ++){
        str += '<li>\
                <img src="./img/'+ arr[i].src +'" alt="">\
                <span>'+arr[i].name+'</span>\
                <span>'+arr[i].des+'</span>\
            </li> '
    }
    oUl.innerHTML = str;
}
input.oninput = function (){
    // console.log(this.value)
    var self = this;
    clearTimeout(timer);
    timer = setTimeout(function (){
        state.text = self.value;
        console.log(self.value) 
        renderDom(addFn(objFilter, person));
    
    },500)
}
function textFilter(text, arr){
    return arr.filter(function (ele, index){
        if(ele.name.indexOf(text) !== -1){
            return true;
        }
    })
}

btn.onclick = function (e){
    if(e.target.tagName == 'SPAN'){
        state.sex = e.target.getAttribute('sex');
        renderDom(addFn(objFilter, person));
        // console.log(addFn(objFilter, state));
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
    }
}

function sexFilter(sex, arr){
    if(sex == 'all'){
        return arr;
    }else{
        return arr.filter(function (ele, index){
            if(sex == ele.sex){
                return true;
            }
        })
    }
}

var objFilter = {
    text : textFilter,
    sex : sexFilter
}

function addFn(obj, arr){
    var lastArr = arr;
    for(var prop in obj){
        var lastArr = obj[prop](state[prop], lastArr);
    }
    console.log(lastArr)
    return lastArr;
}
// addFn(objFilter, state)