var container;

var PlayerLocations = {};

PlayerLocations.South = {};
PlayerLocations.South.tc = [];
PlayerLocations.South.tc[0] = {left:535,top:365};
PlayerLocations.South.tc[1] = {left:575,top:365};
PlayerLocations.South.tc[2] = {left:535,top:405};
PlayerLocations.South.tc[3] = {left:575,top:405};
PlayerLocations.South.tc[4] = {left:535,top:445};
PlayerLocations.South.tc[5] = {left:575,top:445};

PlayerLocations.North = {};
PlayerLocations.North.tc = [];
PlayerLocations.North.tc[0] = {left:535,top:5};
PlayerLocations.North.tc[1] = {left:575,top:5};
PlayerLocations.North.tc[2] = {left:535,top:45};
PlayerLocations.North.tc[3] = {left:575,top:45};
PlayerLocations.North.tc[4] = {left:535,top:83};
PlayerLocations.North.tc[5] = {left:575,top:83};

PlayerLocations.West = {};
PlayerLocations.West.tc = [];
PlayerLocations.West.tc[0] = {left:5,top:75};
PlayerLocations.West.tc[1] = {left:45,top:75};
PlayerLocations.West.tc[2] = {left:85,top:75};
PlayerLocations.West.tc[3] = {left:5,top:115};
PlayerLocations.West.tc[4] = {left:45,top:115};
PlayerLocations.West.tc[5] = {left:85,top:115};

PlayerLocations.East = {};
PlayerLocations.East.tc = [];
PlayerLocations.East.tc[0] = {left:675,top:75};
PlayerLocations.East.tc[1] = {left:715,top:75};
PlayerLocations.East.tc[2] = {left:755,top:75};
PlayerLocations.East.tc[3] = {left:675,top:115};
PlayerLocations.East.tc[4] = {left:715,top:115};
PlayerLocations.East.tc[5] = {left:755,top:115};

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
};
TownCenter.prototype.onClick = function() {
    alert('click!');
};

function Player(locations) {
    this.locations = locations;
    this.tc = []
    for(var i=0; i<this.locations.tc.length; i++) {
        this.tc[i] = new TownCenter(i);
        this.tc[i].position(this.locations.tc[i]);
    }    
}

Player.prototype.repositionTc = function(idx, loc) {
    this.tc[idx].position(loc);
};

var p1, p2, p3;
window.addEventListener('load', function () {
        container = document.getElementById('sprites');
        
        p1 = new Player(PlayerLocations.North);
        p2 = new Player(PlayerLocations.South);
        p3 = new Player(PlayerLocations.West);
        p4 = new Player(PlayerLocations.East);
        
        var findTarget = function(target) {
            if (target === container) {
                return;
            }
            if (target.sprite) {
                return target.sprite;
            }
            if (!target.parentNode) {
                return;
            }
            return findTarget(target.parentNode);
        };
        
        var eventTarget;
        var onDown = function(event) {
            eventTarget = findTarget(event.target);
            if (!eventTarget) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            if (eventTarget.onDown) {
                eventTarget.onDown(event);
            }
        };

        var onUp = function(event) {
            if (!eventTarget) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            if (eventTarget.onUp) {
                eventTarget.onUp(event);
            }
            else if (eventTarget.onClick) {
                var end = findTarget(event.target);
                if (eventTarget === end) {
                    eventTarget.onClick(event);
                }
            }
            start = undefined;
        };

        container.addEventListener('mousedown', onDown, false);
        document.addEventListener('mouseup', onUp, false);        
}, false);
