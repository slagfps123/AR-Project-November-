let markerSQUIDvisible = false;
let markerROBOTvisible = false;

AFRAME.registerComponent('update-distance', {
  init: function () {
    // Get the object entities
    this.objectSquid = document.querySelector('#object-squid');
    this.objectRobot = document.querySelector('#object-robot');

    // Set the default animation for objectROBOT
    //this.objectRobot.setAttribute("animation-mixer", "clip: Appearance; loop: repeat; duration: 0; crossFadeDuration: 1");
    //this.objectSquid.setAttribute("animation-mixer", "clip: Pop Up; loop: repeat; duration: 0; crossFadeDuration: 1");
  },

  tick: function () {
    // Get the positions of the objects
    const positionSquid = new THREE.Vector3();
    const positionRobot = new THREE.Vector3();

    this.objectSquid.object3D.getWorldPosition(positionSquid);
    this.objectRobot.object3D.getWorldPosition(positionRobot);

    // Calculate the distance between the two objects
    const distance = positionSquid.distanceTo(positionRobot);
    xPositionSQD = positionSquid.x; // Use positionSquid.x
    xPositionRBT = positionRobot.x; // Use positionRobot.x
    // Log the distance to the console
    // console.log('Distance between object-squid and object-robot: ' + distance.toFixed(2) + ' units');
    //console.log(xPositionRBT);

    // Check the distance and update animations for objectROBOT and objectROBOT
    const lookAtMeAShley = (pos1, pos2, dist) => {
      if (pos1 <= 0){
        this.objectSquid.setAttribute("animation", "property: rotation; to: 0 90 0; dur: 500; easing: linear");
        this.objectRobot.setAttribute("animation", "property: rotation; to: 0 -90 0; dur: 500; easing: linear");
        this.objectSquid.removeAttribute("look-at");
        this.objectRobot.removeAttribute("look-at");
      }
      if (pos2 <=0 ) {
        this.objectSquid.setAttribute("animation", "property: rotation; to: 0 -90 0; dur: 500; easing: linear");
        this.objectRobot.setAttribute("animation", "property: rotation; to: 0 90 0; dur: 500; easing: linear");
        this.objectSquid.removeAttribute("look-at");
        this.objectRobot.removeAttribute("look-at");
      }
      if (dist < 1000) {
        this.objectRobot.setAttribute("animation-mixer", "clip: Waiting; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.objectSquid.setAttribute("animation-mixer", "clip: Waiting; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
      else {
        this.objectRobot.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; duration: 0; crossFadeDuration: 1");
        this.objectSquid.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
    }

    if (markerSQUIDvisible && markerROBOTvisible) {
      lookAtMeAShley(xPositionSQD, xPositionRBT, distance)
    }       
},
});

AFRAME.registerComponent("marker-robot", {
  init: function () {
    const markerROBOT = this.el;
    const objectSQUID = document.getElementById("object-squid");
    const objectROBOT = document.getElementById("object-robot");
    let popUpPlayedRBT = false;

    markerROBOT.addEventListener("targetFound", (event) => {
      console.log("Target robot found");
      markerROBOTvisible = true;
      objectSQUID.setAttribute("look-at", "[camera]");

      if (!popUpPlayedRBT) {
        // Play Pop Up animation only if it hasn't played before
        objectROBOT.setAttribute("animation-mixer", "clip: Appearance; loop: once; duration: 0");
        popUpPlayedRBT = true;
      }
      if (popUpPlayedRBT == true) {
        // Play Idle animation if Pop Up has already played
        objectROBOT.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
    });

    markerROBOT.addEventListener("targetLost", (event) => {
      console.log("Target robot lost");
      objectROBOT.removeAttribute("animation");
      objectSQUID.removeAttribute("animation");
      markerROBOTvisible = false;
      objectROBOT.setAttribute("look-at", "[camera]");
      objectSQUID.setAttribute("look-at", "[camera]");
      objectSQUID.setAttribute("animation", "property: rotation; to: 0 0 0; dur: 500; easing: linear");
    });
  }
});

AFRAME.registerComponent("marker-squid", {
  init: function () {
    const markerSQUID = this.el;
    const objectROBOT = document.getElementById("object-robot");
    const objectSQUID = document.getElementById("object-squid");
    let popUpPlayedSQD = false;

    markerSQUID.addEventListener("targetFound", (event) => {
      console.log("Target squid found");
      markerSQUIDvisible = true;
      objectROBOT.setAttribute("look-at", "[camera]");

      if (!popUpPlayedSQD) {
        // Play Pop Up animation only if it hasn't played before
        objectSQUID.setAttribute("animation-mixer", "clip: Apperance; loop: once; duration: 0");
        popUpPlayedSQD = true;
      }
      if (popUpPlayedSQD == true) {
        // Play Idle animation if Pop Up has already played
        objectSQUID.setAttribute("animation-mixer", "clip: IDLE; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
    });

    markerSQUID.addEventListener("targetLost", (event) => {
      console.log("Target squid lost");
      objectROBOT.removeAttribute("animation");
      objectSQUID.removeAttribute("animation");
      markerSQUIDvisible = false;
      objectROBOT.setAttribute("look-at", "[camera]");
      objectSQUID.setAttribute("look-at", "[camera]");
      objectROBOT.setAttribute("animation", "property: rotation; to: 0 0 0; dur: 500; easing: linear");
    });
  }
});

