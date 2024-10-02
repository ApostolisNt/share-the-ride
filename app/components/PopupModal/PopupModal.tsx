import { useEffect } from "react";
import { MdClose } from "react-icons/md";

type PopupModalProps = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

const PopupModal = ({ message, type, onClose }: PopupModalProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close after 3 seconds
    return () => clearTimeout(timeout);
  }, [onClose]);

  const getEmoji = () => {
    switch (type) {
      case "success":
        return "🎉"; // Celebration emoji
      case "error":
        return "❌"; // Cross mark emoji
      case "info":
        return "ℹ️"; // Information emoji
      default:
        return "";
    }
  };

  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <section className="shadow-xl relative mx-4 w-full max-w-md rounded-lg bg-white p-6 text-center">
        <button
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <MdClose />
        </button>
        <div className="text-3xl">{getEmoji()}</div>
        <p className="mt-4 text-lg font-semibold">{message}</p>
      </section>
    </section>
  );
};

export default PopupModal;
