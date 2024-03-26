import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import CSS từ leaflet
import L from "leaflet"; // Import Leaflet

// Import hình ảnh cho biểu tượng đánh dấu
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Thay đổi đường dẫn mặc định của biểu tượng
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapWithMarkers = () => {
  const markers: any = [
    {
      position: [21.017069714364983, 105.85504793070729],
      text: `hòng khám Đa khoa Dr. Binh Tele_Clinic. <br /> Số 11-13-15 Trần Xuân Soạn, P. Phạm Đình Hổ, Q. Hai Bà Trưng, Hà Nội`,
    },
    {
      position: [21.008348248985463, 105.7960968694903],
      text: `Thu Cúc TCI Trần Duy Hưng. <br /> Số 216 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 100000, Việt Nam`,
    },
    {
      position: [21.042602314382332, 105.84463814408113],
      text: `Bệnh Viện Đa Khoa Hồng Ngọc. <br />  Số 55 P. Yên Ninh, Quán Thánh, Ba Đình, Hà Nội, Việt Nam`,
    },
  ];

  return (
    <MapContainer
      center={[21.008348248985463, 105.7960968694903]}
      zoom={13}
      style={{ height: "700px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker: any, index: any) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            <div dangerouslySetInnerHTML={{ __html: marker.text }} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarkers;
