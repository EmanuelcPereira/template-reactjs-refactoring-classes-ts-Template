import { Component, createRef, useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

interface IFoodData {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type ICreateFoodData = Omit<IFoodData, 'id' | 'available'>;

interface IModalProps {
  isOpen: boolean;
  handleUpdateFood: (food: ICreateFoodData) => void;
  editingFood: IFoodData;
  setIsOpen: () => void;
}

const ModalEditFood: React.FC<IModalProps> = ({ isOpen, handleUpdateFood, setIsOpen, editingFood }) => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: ICreateFoodData) => {
    handleUpdateFood(data);
    setIsOpen();
  }, [handleUpdateFood, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
