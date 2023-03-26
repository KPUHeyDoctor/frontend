// import { useState } from "react";

// function HospitalModal({ isOpen, handleClose, hospital }) {
//   return (
//     <div
//       className={`modal ${isOpen ? "is-active" : ""}`}
//       onClick={() => handleClose()}
//     >
//       <div className="modal-content">
//         <p>{hospital.name}</p>
//         <p>{hospital.address}</p>
//         <p>{hospital.phone}</p>
//       </div>
//     </div>
//   );
// }

// function HospitalMap() {
//   const [selectedHospital, setSelectedHospital] = useState(null);

//   function handleMarkerClick(hospital) {
//     setSelectedHospital(hospital);
//   }

//   function closeModal() {
//     setSelectedHospital(null);
//   }

//   return (
//     <div>
//       {/* MapMarker 컴포넌트 */}
//       {selectedHospital && (
//         <HospitalModal
//           isOpen={true}
//           handleClose={closeModal}
//           hospital={selectedHospital}
//         />
//       )}
//     </div>
//   );
// }
