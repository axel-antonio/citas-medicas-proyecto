import React, { useState, useEffect } from "react";

export default function AppointmentForm(): JSX.Element {
  const [formData, setFormData] = useState({
    userId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "PENDING",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [doctors, setDoctors] = useState([]); // Lista de doctores
  const [patients, setPatients] = useState([]); // Lista de pacientes

  useEffect(() => {
    const fetchDoctorsAndPatients = async () => {
      try {
        // Obtener doctores
        const doctorsResponse = await fetch("/api/admin/users");
        const doctorsData = await doctorsResponse.json();
        const filteredDoctors = doctorsData.filter((user) => user.role === "DOCTOR");
        setDoctors(filteredDoctors);

        // Obtener pacientes
        const patientsResponse = await fetch("/api/admin/patients");
        const patientsData = await patientsResponse.json();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error al obtener doctores o pacientes:", error);
      }
    };

    fetchDoctorsAndPatients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/doctor/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parseInt(formData.userId),
          doctorId: parseInt(formData.doctorId),
          date: formData.date,
          time: formData.time,
          status: formData.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear la cita (detalles):", errorData);
        throw new Error(errorData.message || "Error al crear la cita");
      }

      setSuccessMessage("Cita creada exitosamente.");
      setFormData({
        userId: "",
        doctorId: "",
        date: "",
        time: "",
        status: "PENDING",
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      setErrorMessage("No se pudo crear la cita. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para deshabilitar solo sábados y domingos en el calendario del input de fecha
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 5 || day === 6; // Sábado (6) o domingo (0)
  };

  return (
    // codigo responsive
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg w-full max-w-lg mx-auto">
  <h2 className="text-2xl font-bold mb-4">Crear Nueva Cita</h2>

  {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
  {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

  <div className="mb-4">
    <label className="block text-gray-700">Paciente</label>
    <select
      name="userId"
      value={formData.userId}
      onChange={handleInputChange}
      className="w-full border-gray-300 rounded-md p-2"
      required
    >
      <option value="">Selecciona un paciente</option>
      {patients.map((patient) => (
        <option key={patient.id} value={patient.id}>
          {patient.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Doctor</label>
    <select
      name="doctorId"
      value={formData.doctorId}
      onChange={handleInputChange}
      className="w-full border-gray-300 rounded-md p-2"
      required
    >
      <option value="">Selecciona un doctor</option>
      {doctors.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
          {doctor.username}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Fecha</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={(e) => {
        const dateValue = e.target.value;
        if (!isWeekend(dateValue)) {
          handleInputChange(e);
          setErrorMessage(""); // Limpiar el mensaje de error si es un día válido
        } else {
          setErrorMessage("No se pueden programar citas en fines de semana.");
        }
      }}
      className="w-full border-gray-300 rounded-md p-2"
      required
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Hora</label>
    <select
      name="time"
      value={formData.time}
      onChange={handleInputChange}
      className="w-full border-gray-300 rounded-md p-2"
      required
    >
      <option value="">Selecciona una hora</option>
      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-4">
    <label className="block text-gray-700">Estado</label>
    <select
      name="status"
      value={formData.status}
      onChange={handleInputChange}
      className="w-full border-gray-300 rounded-md p-2"
      required
    >
      <option value="PENDING">Pendiente</option>
      <option value="CONFIRMED">Confirmada</option>
      <option value="COMPLETED">Completada</option>
      <option value="CANCELED">Cancelada</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Creando..." : "Crear Cita"}
  </button>
</form>

  );
}
