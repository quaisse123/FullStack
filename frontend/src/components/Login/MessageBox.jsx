import { motion } from "framer-motion";


function MessageBox({ handleLogout, setShowMessageBox }) {
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-sm shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </h2>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowMessageBox(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Confirmer
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default MessageBox;
