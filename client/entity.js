entity = function(i,d) {
    var self = {};
    let id = i;
    let descriptor = d;
    let active = true;
    
    self.remove = function(){
        active = false;
    }

    self.getStatus = function(){
        return active;
    }

    self.getId = function(){
        return id;
    }

    self.getDescriptor = function(){
        return descriptor;
    }

    return self;
}