entityManager = function() {
    var self = {};
    let entityCount = 0;
    let newEntities = [];
    let entityArray = [];

    self.update = function() {
        entityArray = entityArray.concat(newEntities);
        newEntities = [];
        removeEntities();
    }

    self.addEntity = function(desciptor) {
        e = new entity(entityCount++,desciptor);
        newEntities.push(e)
        return e;
    }

    self.getEntities = function() {
        return entityArray;
    }

    function removeEntities() {
        entityArray.forEach(element => {
            if(!element.getStatus()){
                entityArray.splice(entityArray.indexOf(element),1);
            }
        });
    }

    return self;
}