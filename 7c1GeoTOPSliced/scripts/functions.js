///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////


require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Slice",
  "esri/widgets/LayerList",
  "esri/core/Collection",
  "esri/renderers/SimpleRenderer",
  "esri/renderers/Renderer",
  "esri/widgets/Legend"
], function(
  WebScene,
  SceneView,
  Slice,
  LayerList,
  Collection,
  SimpleRenderer,
  Renderer,
  Legend
) {

  //create webscene and host GeoTOP dataset and display in SceneView, also link to data
  var scene = new WebScene({
    portalItem: { // autocasts as new PortalItem()
      id: "0698526ee1b546b5a8bff3389a0b5f53" // ID of the WebScene on arcgis.com
    }
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene // The WebScene instance created above
  });

  // add a legend
  var legend = new Legend({
    view: view
  });
  view.ui.add(legend, "bottom-left");

  // Start function when all layers are loaded
  view.when(function() {
    // Try to get layer from WebScene

    // WRONG METHOD OF CALLING WEBSCENE LAYERS //
    // var geoTOP = scene.allLayers.filter(function(elem){
    //   return elem.title === "3a1GeoTOP_generalised";
    // });
    // geoTOP.parent.ground.opacity = 0;
    // console.log(geoTOP);

    // Second method -> CORRECT METHOD
    var geoTOPv2 = scene.layers.getItemAt(0);
    geoTOPv2.parent.ground.opacity = 0.5;
    console.log(geoTOPv2);

    // add layerlist functionality to toggle layers
    var layerList = new LayerList({
      view: view
    })

    // add layerlist to view
    view.ui.add(layerList, "top-right");

    // Slice button and functionality
    const sliceButton = document.getElementById("slice");
    view.ui.add(sliceButton, "top-right");
    var sliceWidget = null;

    sliceButton.addEventListener("click", function() {
      if (sliceWidget) {
        sliceWidget.destroy();
        sliceWidget = null;
        sliceButton.classList.remove("active");
      } else {
        sliceWidget = new Slice({
          view: view
        });
        sliceWidget.viewModel.newSlice();
        view.ui.add(sliceWidget, "top-right");
        sliceButton.classList.add("active");
      }
    });
  });

  // Dynamic exaggaration button
  view.when(function() {
    const dynaexButton = document.getElementById("dynaex");
    view.ui.add(dynaexButton, "bottom-right");
    var dynaexWidget = null;

    dynaexButton.addEventListener("click", function() {
      if (dynaexWidget) {
        dynaexWidget.destroy();
        dynaexWidget = null;
        dynaexButton.classList.remove("active");
      } else {
        // create popup for Slider
        var slider = document.getElementById("vertexVal");
        if (slider.style.display === "none") {
          slider.style.display = "block";
        } else {
          slider.style.display = "none";
        }
      }
    });
  });


  //--------------------- VISUALIZATION -------------------//
  //
  //
  //
  //-------------------------------------------------------//
  document.getElementById("vertexVal").onchange = updateVisualisation;

  function updateVisualisation() {
    // get slider value for vertical exxagaration value
    var SliderVal = document.getElementById("vertexVal");
    var ViewVal = document.getElementById("slider_value");

    // listen to changing values and trigger functions
    SliderVal.onchange = updateValueView(ViewVal);

  }

  // update view value
  function updateValueView(ViewVal) {
    var value = parseInt(document.getElementById("vertexVal").value);
    // update value on screen to show current value
    ViewVal.innerHTML = value;
    updateVerticalExag(value);
  }

  // this function updates the symbology based on the value of the slider
  function updateVerticalExag(value) {
    // get scene layer for alteration
    var geoTOP = scene.layers.getItemAt(0);

    // Initiate renderer
    console.log(geoTOP.renderer);

    var symbol = {
      type: "point-3d", // autocasts as new PolygonSymbol3D()
      symbolLayers: [{
        type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
        size: value, // 100,000 meters in height
      }]
    };

    console.log(geoTOP);
  }

});
