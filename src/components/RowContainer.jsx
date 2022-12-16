import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  console.log('data', data);
  console.log('items', items);
  console.log('cartItems', cartItems);

  const handleAddCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    handleAddCart();
  }, [items]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3   my-12 scroll-smooth  ${
        flag
          ? 'overflow-x-scroll scrollbar-none bg-rowBg'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div
              whileHover={{ scale: 1.2 }}
              className="w-full flex items-center justify-between"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-30 h-auto max-h-[120px] drop-shadow-2xl -mt-8 cursor-pointer"
              >
                <img
                  src={item.imageURL}
                  alt="title"
                  className="w-32 h-auto object-cover"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setItems([...cartItems, item])}
                className="w-8 h-8 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer hover:shadow-md hover:bg-DarkMagenta"
              >
                <MdShoppingBasket className="text-white drop-shadow-2xl" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col  items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-Gray ">
                {item.calories} calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-DarkRed">$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="notfound" className="h-225" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
