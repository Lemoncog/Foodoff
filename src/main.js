define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    function simple_easing(how_much_time_has_passed) {
        return (1 - Math.cos(how_much_time_has_passed * Math.PI)) / 2;
    }

    imageWidth = 200;

    // create the main context
    var mainContext = Engine.createContext();

    var buildTeam = function(teamIcon) { 
        // your app here
        return new ImageSurface({
            size: [imageWidth, imageWidth],
            content: 'assets/'+teamIcon,
            classes: ['double-sided']
        });
    }

    var initialTime = Date.now();
    var centerSpinModifier = function(target) {
        return new Modifier({
            origin: [0.5, 0.5],
            transform : function(){
                elapsed = (Date.now() - initialTime);

                dist = Math.pow(((target-elapsed)/target), 4);

                //Closer to dist, slower we go!
                if(elapsed > target) {
                    dist = 0;
                }

                spin = (dist*40);
                
                return Transform.rotateY(spin);
            }
        })
    };

    var centerModifier = function() {
        return new Modifier({
            size : [100, 100],
            origin: [0.5, 0.5]
        })
    };

    var positionMod = function(x,y,z) {
        return new Modifier({
            transform : Transform.translate(x, y, z)
        });
    };

    var buildText = function(text) {
        return new Surface({
            content: text,
            properties: {
                color : 'black',
                textAlign: 'center'
            }
        });
    };

    var vsSurface = mainContext.add(centerModifier());

    vsSurface.add(positionMod(-imageWidth,0,0)).add(centerSpinModifier(10000)).add(buildTeam('spinach.svg'));
    vsSurface.add(positionMod(imageWidth,0,0)).add(centerSpinModifier(9000)).add(buildTeam('lettuce.svg'));

    vsSurface.add(positionMod(0,0,0)).add(buildText('<h1>Vs</h1>'));
});
