define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
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

    vsSurface.add(positionMod(-imageWidth,0,0)).add(centerSpinModifier()).add(buildTeam('spinach.svg'));
    vsSurface.add(positionMod(imageWidth,0,0)).add(centerSpinModifier()).add(buildTeam('lettuce.svg'));

    vsSurface.add(positionMod(0,0,0)).add(buildText('<h1>Vs</h1>'));
});
