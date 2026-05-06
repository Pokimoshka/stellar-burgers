import { FC, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorItems,
  getUser,
  getCurrentOrder,
  getOrderLoading
} from '@selectors';
import { createOrder, resetOrder } from '../../services/slices/ordersSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { AppDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useAppSelector(getConstructorItems);
  const user = useAppSelector(getUser);
  const orderRequest = useAppSelector(getOrderLoading);
  const orderModalData = useAppSelector(getCurrentOrder);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch(() => {});
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
