"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomModal = ({ isOpen, onClose, title, children, size }: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b">
          <h3 className="text-xl font-semibold text-black">{title}</h3>
        </ModalHeader>
        <ModalBody className="py-6 space-y-4">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
