import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";

const MapComponent = () => {
  useEffect(() => {
    const markerFeature = new Feature({
      geometry: new Point(fromLonLat([105.85504793070729, 21.017069714364983])),
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [markerFeature],
      }),
      style: new Style({
        image: new Icon({
          src: "https://openlayers.org/en/latest/examples/data/icon.png",
          anchor: [0.5, 1],
        }),
      }),
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markerLayer,
      ],
      view: new View({
        center: fromLonLat([105.85504793070729, 21.017069714364983]),
        zoom: 15,
      }),
    });

    const popupContainer = document.getElementById("popup");
    if (popupContainer) {
      const popup = new Overlay({
        element: popupContainer,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -10],
      });
      map.addOverlay(popup);

      markerFeature.addEventListener("click", (evt: any) => {
        if (evt && evt.coordinate) {
          const coordinate = evt.coordinate;
          popup.setPosition(coordinate);
          popupContainer.innerHTML =
            "<div>Phòng khám Đa khoa Dr. Binh Tele_Clinic<br/>Số 11-13-15 Trần Xuân Soạn, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội</div>";
        }
      });
    }

    return () => {
      map.dispose();
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div
        id="popup"
        style={{
          display: "none",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
