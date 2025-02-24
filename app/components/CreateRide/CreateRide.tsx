"use client";

import { useState } from "react";
import CreateRideForm from "./CreateRideForm";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { CreateRideSchema } from "app/types/types";
import PopupModal from "@components/PopupModal/PopupModal";
import { ModalType } from "app/types/types";
import { useUser } from "@clerk/nextjs";

const CreateRide = () => {
  const { user } = useUser();
  const router = useRouter();
  const { locale } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<ModalType>("info");

  const createRideMutation = useMutation(api.rides.createRide);

  const showPopup = (message: string, type: ModalType) => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const onSubmit = async (data: CreateRideSchema) => {
    data.ownerUserId = user?.id || "";

    try {
      await createRideMutation(data);
      showPopup("Ride created successfully!", "success");
      setTimeout(() => {
        router.push(`/${locale}/rides`);
      }, 1000);
    } catch (error: unknown) {
      console.error("Error in createRideMutation:", error);
      showPopup("An error occurred while creating the ride", "error");
    }
  };

  return (
    <div className="mx-auto my-8 flex w-full flex-col items-center px-4">
      <div className="shadow w-full max-w-3xl rounded-lg bg-white p-8">
        <h3 className="mb-2 text-center text-2xl font-bold uppercase text-gray-800">
          Create a Ride
        </h3>
        <p className="mb-6 text-center text-xl italic text-blue-600">
          {"Your journey begins with a single ride."}
        </p>
        <CreateRideForm onSubmitForm={onSubmit} />
      </div>
      {showModal && (
        <PopupModal
          message={modalMessage}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CreateRide;
