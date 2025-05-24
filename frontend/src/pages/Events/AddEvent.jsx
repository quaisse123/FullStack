import { useState } from "react";
import Sidebar from "../../components/sidebar";
import Content from "../../components/Content";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    capacite: "",
    places_dispo: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/Apievents/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          setSuccess(true);
          setFormData({
            title: "",
            date: "",
            location: "",
            description: "",
            capacite: "",
            places_dispo: "",
          });
        }
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de l'événement :", err);
      });
  };

  return (
    <>
      <Sidebar />
      <Content>
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Ajouter un événement</h1>
            <p className="text-gray-600 text-lg">Remplissez les champs ci-dessous pour créer un nouvel événement.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6 border border-gray-200"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Date et heure</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Lieu</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description (optionnelle)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Capacité</label>
                <input
                  type="number"
                  name="capacite"
                  value={formData.capacite}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">Places disponibles</label>
                <input
                  type="number"
                  name="places_dispo"
                  value={formData.places_dispo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Enregistrer l’événement
              </button>
            </div>

            {success && (
              <div className="text-green-600 font-medium text-center">
                ✅ Événement ajouté avec succès !
              </div>
            )}
          </form>
        </main>
      </Content>
    </>
  );
}

export default AddEvent;
