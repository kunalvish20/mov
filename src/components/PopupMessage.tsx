import { useState } from "react";

export default function PopupMessage() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-red-700 text-white rounded-lg shadow-lg max-w-md w-full p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">⚠️ Important Notice</h2>
        <p className="mb-4 text-center leading-relaxed">
          This project is <strong>for learning purposes only</strong> and no profit
          is being made. Please do not misuse it for illegal streaming or
          watching movies without rights.
        </p>
        <p className="mb-6 text-center leading-relaxed">
          If a movie is not playing or you get a blank screen, please change
          your <strong>VPN</strong> or <strong>DNS settings</strong> to gain full access.
        </p>
        <button
          onClick={() => setShow(false)}
          className="px-6 py-2 bg-white text-red-700 font-semibold rounded hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
