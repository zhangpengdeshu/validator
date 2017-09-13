var strategies = {
    isNotEmpty: function(value,errMsg){
        if( value === '' || value === null || value === undefined ){
            return errMsg
        }
    },
    minLength: function(value,length,errMsg){
        if( value.length < length ){
            return errMsg
        }
    },
    isPhone: function(value,errMsg){
        var reg = /^1(3|5|7|8)\d{9}$/;
        if( !reg.test(value) ){
            return errMsg
        }
    }
}

var Validator = function(){
    this.cache = [];
}

Validator.prototype.add = function(dom,rules){
    var self = this;
    var value = dom.value;
    rules.forEach(function(rule){
        var errMsg = rule.errMsg;
        var strategyAry = rule.strategy.split(":");
        var strategy = strategyAry.shift()
        strategyAry.unshift(value)
        strategyAry.push(errMsg)
        var temp = strategies[strategy].apply(null,strategyAry);
        if(temp){
            self.cache.push(temp)
        }
    })
}

Validator.prototype.start = function(){
    console.log(this.cache)
    var i = 0;
    return this.cache[i];
}



