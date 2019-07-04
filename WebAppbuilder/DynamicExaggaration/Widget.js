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
        "esri/layers/BuildingSceneLayer",
        "dojo/_base/declare",
        "jimu/BaseWidget",
        "esri/widgets/Slice",
        "esri/widgets/LayerList",
        "esri/core/Collection"
      ], function(
        WebScene,
        SceneView,
        BuildingSceneLayer,
        declare,
        BaseWidget,
        Slice,
        LayerList,
        Collection
      ) {

          var scene = new WebScene({
            portalItem: { // autocasts as new PortalItem()
              id: "0698526ee1b546b5a8bff3389a0b5f53"  // ID of the WebScene on arcgis.com
            }
          });

          var view = new SceneView({
            map: scene,  // The WebScene instance created above
            container: "viewDiv"
          });

          return declare([BaseWidget], {

            name: "DynamicExaggaration",

            onOpen: function(){
              view.when(function() {
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
          }
        });
      });
