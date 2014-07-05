define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');

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
    var centerSpinModifier = function() {
        return new Modifier({
            origin: [0.5, 0.5],
            transform : function(){
                return Transform.rotateY(.002 * (Date.now() - initialTime));
            }
        })
    };

    var positionMod = function(x,y,z) {
        return new Modifier({
            transform : Transform.translate(x, y, z)
        });
    };

    mainContext.add(positionMod(-imageWidth,0,0)).add(centerSpinModifier()).add(buildTeam('spinach.svg'));
    mainContext.add(positionMod(imageWidth,0,0)).add(centerSpinModifier()).add(buildTeam('lettuce.svg'));
});
