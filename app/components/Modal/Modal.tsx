import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Header/Header";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import iconClose from "../../../public/icons/close.png";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-700/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >   
          <motion.div
            className="max-w-[1024px] min-w-[400px] md:min-h-[600px] xs:min-h-[700px] w-full relative flex flex-col bg-white text-gray-950 rounded-lg shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Header className="w-full flex justify-between items-center bg-[#ff9800] p-2 rounded-t-lg h-16">
              <h2 className="text-white text-[25px]">Cadastre uma nova receita</h2>
              <Button onClick={onClose} className="cursor-pointer text-gray-600 hover:text-gray-900">
                <Icon className="w-8" src={iconClose} alt="close" />
              </Button>
            </Header>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
