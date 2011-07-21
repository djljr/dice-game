var container;

var PlayerLocations = {};

PlayerLocations.South = {};
PlayerLocations.South.tc = {};
PlayerLocations.South.tc[0] = {left:280,top:400};
PlayerLocations.South.tc[1] = {left:320,top:400};
PlayerLocations.South.tc[2] = {left:360,top:400};
PlayerLocations.South.tc[3] = {left:400,top:400};
PlayerLocations.South.tc[4] = {left:440,top:400};
PlayerLocations.South.tc[5] = {left:480,top:400};

function TownCenter(level) {
    this.div = this.createTownCenterDiv(level);
};

TownCenter.levelClass = ['first-towncenter','second-towncenter','third-towncenter','fourth-towncenter','fifth-towncenter', 'sixth-towncenter'];  
TownCenter.prototype.createTownCenterDiv = function(level) {
    var div = document.createElement('div');
    div.setAttribute('class', TownCenter.levelClass[level]);
    div.sprite = this;
    container.appendChild(div);
    return div;
};
TownCenter.prototype.position = function(position) {
    this.x = position.left;
    this.y = position.top;
    this.div.style.webkitTransitionDuration = 5 + "s";
    this.div.style.webkitTransform = "translate3d(" + position.left + "px, " + position.top + "px, 0)";
}

function Player(locations) {
    this.locations = locations;
    //Everyone starts with the first town center
    this.tc = new TownCenter(0);
    this.tc.position(this.locations.tc[0]);
    
    this.tc = new TownCenter(1);
    this.tc.position(this.locations.tc[1]);
    
    this.tc = new TownCenter(2);
    this.tc.position(this.locations.tc[2]);
    
    this.tc = new TownCenter(3);
    this.tc.position(this.locations.tc[3]);

    this.tc = new TownCenter(4);
    this.tc.position(this.locations.tc[4]);
    
    this.tc = new TownCenter(5);
    this.tc.position(this.locations.tc[5]);    
}

window.addEventListener('load', function () {
        container = document.getElementById('sprites');
}, false);
