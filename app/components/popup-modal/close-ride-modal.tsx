import { useState } from "react";
import { MdClose } from "react-icons/md";

type CloseRideModalProps = {
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

const CloseRideModal = ({ onClose, onSubmit }: CloseRideModalProps) => {
  const [closeReason, setCloseReason] = useState("");

  return (
    <section className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div className="shadow-xl relative mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <button
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <MdClose />
        </button>
        <h2 className="text-xl font-semibold mb-4">Close Ride</h2>
        <p>Please provide a reason for closing the ride:</p>
        <textarea
          className="w-full border rounded p-2 mt-2"
          rows={4}
          placeholder="Enter reason here..."
          value={closeReason}
          onChange={(e) => setCloseReason(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded bg-gray-300 text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border rounded bg-blue-500 text-white"
            onClick={() => onSubmit(closeReason)}
            disabled={!closeReason.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default CloseRideModal;
