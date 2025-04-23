import { useEffect } from "react";

function NotificationPopup({ notifications, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg text-left relative">
        <h2 className="text-xl font-semibold mb-4">📢 Notifications</h2>
        <ul className="list-disc pl-5 space-y-2 max-h-60 overflow-y-auto">
          {notifications.map((note, idx) => (
            <li key={idx} className="text-gray-700">{note}</li>
          ))}
        </ul>
        <button
          className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export default NotificationPopup;
