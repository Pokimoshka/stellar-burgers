import { FC, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import {
  getFeedOrders,
  getUserOrders,
  getCurrentOrder,
  getIngredients
} from '@selectors';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchOrderByNumber } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isProfile = location.pathname.startsWith('/profile');

  const feedOrders = useAppSelector(getFeedOrders);
  const userOrders = useAppSelector(getUserOrders);
  const ingredients = useAppSelector(getIngredients);
  const singleOrder = useAppSelector(getCurrentOrder);

  const ordersSource = isProfile ? userOrders : feedOrders;
  const orderData =
    ordersSource.find((order) => order.number === Number(number)) ||
    singleOrder;

  useEffect(() => {
    if (!orderData && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [orderData, number, dispatch]);

  useEffect(() => {
    if (location.state?.background) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientWithCount = (typeof ingredients)[0] & { count: number };
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: Record<string, TIngredientWithCount>, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) acc[item] = { ...ingredient, count: 1 };
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
