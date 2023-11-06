let markerSQUIDvisible = false;
let markerROBOTvisible = false;

AFRAME.registerComponent('update-distance', {
  init: function () {
    // Get the object entities
    this.objectSquid = document.querySelector('#object-squid');
    this.objectRobot = document.querySelector('#object-robot');
  },

  tick: function () {
    // Get the positions of the objects
    const positionSquid = new THREE.Vector3();
    const positionRobot = new THREE.Vector3();

    this.objectSquid.object3D.getWorldPosition(positionSquid);
    this.objectRobot.object3D.getWorldPosition(positionRobot);

    // Calculate the distance between the two objects
    const distance = positionSquid.distanceTo(positionRobot);

    // Log the distance to the console

    //console.log('Distance between object-squid and object-robot: ' + distance.toFixed(2) + ' units');

    // Check the distance and update animations
    if (markerSQUIDvisible && distance < 1000) {
      this.objectSquid.setAttribute("animation-mixer", "clip: Idle.001; loop: repeat; duration: 0; crossFadeDuration: 1");
    } else {
      this.objectSquid.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
    }
  },
});

AFRAME.registerComponent("marker-robot", {
  init: function () {
    const markerROBOT = this.el;
    const objectSQUID = document.getElementById("object-squid");
    const objectROBOT = document.getElementById("object-robot");

    markerROBOT.addEventListener("targetFound", (event) => {
      console.log("Target robot found");
      markerROBOTvisible = true;
      objectROBOT.setAttribute("animation-mixer", "clip: ''; loop: repeat; duration: 0; crossFadeDuration: 1");
      objectROBOT.setAttribute("look-at", "[camera]");

      if (markerSQUIDvisible == true) {
        objectSQUID.setAttribute("look-at", "[object-robot]");
        objectROBOT.setAttribute("look-at", "[object-squid]");
      }
    });

    markerROBOT.addEventListener("targetLost", (event) => {
      console.log("Target robot lost");
      markerROBOTvisible = false;

      objectSQUID.setAttribute("look-at", "[camera]");
    });
    this.updateDistance = function () {
      // Get the positions of the objects
      const positionSquid = new THREE.Vector3();
      const positionRobot = new THREE.Vector3();

      objectSQUID.object3D.getWorldPosition(positionSquid);
      objectROBOT.object3D.getWorldPosition(positionRobot);

      // Calculate the distance between the two objects
      const distance = positionRobot.distanceTo(positionSquid);

      // Check the distance and update animations
      if (markerROBOTvisible && distance < 1000) {
        objectROBOT.setAttribute("animation-mixer", "clip: Idle.001; loop: repeat; duration: 0; crossFadeDuration: 1");
      } else {
        objectROBOT.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
    };
  }
});

AFRAME.registerComponent("marker-squid", {
  init: function () {
    const markerSQUID = this.el;
    const objectROBOT = document.getElementById("object-robot");
    const objectSQUID = document.getElementById("object-squid");

    markerSQUID.addEventListener("targetFound", (event) => {
      console.log("Target squid found");
      objectSQUID.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
      markerSQUIDvisible = true;
      this.updateDistance(); // Call the distance update

      if (markerROBOTvisible == true) {
        objectROBOT.setAttribute("look-at", "[object-squid]");
        objectSQUID.setAttribute("look-at", "[object-robot]");
        this.updateDistance(); // Call the distance update
      }
    });

    markerSQUID.addEventListener("targetLost", (event) => {
      console.log("Target squid lost");

      markerSQUIDvisible = false;
      objectROBOT.setAttribute("look-at", "[camera]");
    });

    this.updateDistance = function () {
      // Get the positions of the objects
      const positionSquid = new THREE.Vector3();
      const positionRobot = new THREE.Vector3();

      objectSQUID.object3D.getWorldPosition(positionSquid);
      objectROBOT.object3D.getWorldPosition(positionRobot);

      // Calculate the distance between the two objects
      const distance = positionSquid.distanceTo(positionRobot);

      // Check the distance and update animations
      if (markerSQUIDvisible && distance < 1000) {
        objectSQUID.setAttribute("animation-mixer", "clip: Idle.001; loop: repeat; duration: 0; crossFadeDuration: 1");
      } else {
        objectSQUID.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
      }
    };
  }
});
