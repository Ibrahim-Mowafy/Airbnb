import { createContext, useState } from 'react';

export const ModalContext = createContext({
  isModalOpened: false,
  openModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpened, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
