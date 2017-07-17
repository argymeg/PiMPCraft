/*
Build metabolic network map
Will do for now but far too much code duplication!
Should be merged with the pathway builder
(and possibly the deleter as well)
*/

var Drone = require('drone');
var http = require('http');
var store = require('storage');
var data;
var pathMapSource;

function pullFromRAndBuildNetwork(bioSource, compartment){
  pathMapSource = 'http://localhost:32908/pathmap?biosource=' + bioSource;
  if(compartment){
    pathMapSource = pathMapSource + '&compartment=' + compartment
  }
  startPulling(this);
}

function startPulling(dronea){

  http.request(pathMapSource,
  function(responseCode, responseBody){
    data = JSON.parse(responseBody);
    actuallyBuild(dronea);
  });
}

function actuallyBuild(droneb){
  droneb.chkpt('pointzero');

  /*
    Main node drawing loop!
  */
  for(var i = 0; i < data.nodes.length; i++){

    //Assign material to node types, TODO: pull externally
    var material = 152; //redstone
    var dim = 2;

    //Move drone to node coordinates
    droneb.right(parseInt(data.nodes[i].x));
    droneb.fwd(parseInt(data.nodes[i].z));

    //Draw node as cube of arbitrary dimensions
    droneb.cuboidX(material, '', dim, dim, dim, true);

    droneb.up(Math.floor(dim / 2));
    droneb.fwd(Math.floor(dim / 2));
    var location = droneb.getLocation() ;
    var ars = location.world.spawnEntity(location, org.bukkit.entity.EntityType.ARMOR_STAND)
    ars.setVisible(false);
    ars.setGravity(false);
    ars.setInvulnerable(true);
    ars.setCustomName(data.nodes[i].name);
    ars.setCustomNameVisible(true);

    droneb.move('pointzero');
  }
}

Drone.extend(pullFromRAndBuildNetwork);

function buildMap(parameters, player){
  var d = new Drone(player);
  d.pullFromRAndBuildNetwork(store[player.name]['bioSource'], parameters[0]);
}

command(buildMap);
