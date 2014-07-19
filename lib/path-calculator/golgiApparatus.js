crossPlatformShapes.pathCalculator.golgiApparatus = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  // TODO: the commands below are just a copy of the commands for rectangle.
  // We need to convert the commented out pathData below to the HTML5 Canvas path command format.
  var pathData = [{command: 'moveTo', points: [x, y]},
    {command: 'lineTo', points: [(x + width), y]},
    {command: 'lineTo', points: [(x + width), (y + height)]},
    {command: 'lineTo', points: [(x), (y + height)]},
    {command: 'closePath', points: []}];

    /*
    var path1 = 'm58.4671,16.99297c-22.2053,-19.30712 37.3101,-19.538 25.5673,-3.1145c-8.8077,11.998 -17.0665,37.53828 -0.9417,64.06707c13.3147,17.47735 -41.7485,17.92546 -27.7555,-0.94919c11.3458,-18.99656 10.2868,-51.87342 3.1299,-60.00338l0,0z';

    var path2 = 'm31.2144,22.48219c-10.7917,-13.83614 29.8976,-12.81612 18.4075,0.4332c-4.067,4.79263 -5.7828,39.75796 1.1607,48.44653c8.5294,12.0082 -32.853,12.49764 -20.5002,-1.45349c6.9528,-11.2083 10.4738,-33.76451 0.932,-47.42624l0,0z';

    var path3 = 'm29.80396,32.77896c1.58418,7.4093 2.72346,10.80737 -1.48298,24.77019c-3.73195,8.38708 -3.6004,10.5513 -11.73233,12.53496c-6.6833,1.07092 -11.86483,-6.32111 -4.7933,-10.40477c4.85573,-3.63095 6.14109,-7.02681 6.65889,-14.82198c-0.23922,-6.14805 0.8145,-10.21755 -5.36692,-12.88742c-7.62432,-1.41744 -6.08804,-10.67651 4.82406,-8.95195c5.84935,0.66319 10.2824,5.52823 11.89258,9.76096z';


    var pathData = path1 + ' ' + path2 + ' ' + path3;
    //*/
  return pathData;
};
