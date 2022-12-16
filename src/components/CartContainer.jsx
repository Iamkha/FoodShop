import React, { useEffect, useState } from 'react';
import { BiArrowBack, BiPlus, BiMinus } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import EnptyCart from '../img/emptyCart.svg';

const CartContainer = () => {
  const [qty, setQty] = useState('1');
  const [items, setItems] = useState([]);
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  console.log('cart', cartItems);

  const handleCartShow = () => {
    setTimeout(() => {
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
      });
    }, 1000);
  };
  const cartDispatch = () => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    dispatch({ type: actionType.SET_CART_ITEMS, cartItems: items });
  };
  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        setItems(cartItems.filter((item) => item.id !== id));
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
          }
        });
        cartDispatch();
      }
    }
  };
  useEffect(() => {
    setItems(cartItems);
  }, [qty]);

  const handleClearAddCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-[100vh] bg-white drop-shadow-lg flex flex-col z-[101]"
    >
      <div
        className="flex justify-between items-center p-5"
        onClick={handleCartShow}
      >
        <motion.div whileTap={{ scale: 0.8 }}>
          <BiArrowBack className="text-2xl cursor-pointer shadow-ms " />
        </motion.div>

        <p className="text-DarkMagenta font-semibold text-3xl">
          Cart
        </p>

        <motion.div
          onClick={handleClearAddCart}
          whileTap={{ scale: 0.8 }}
          className="w-20 shadow-md cursor-pointer flex justify-center items-center rounded-md bg-lighttextGray font-medium duration-100 transition-all ease-in-out"
        >
          Clear <AiOutlineClear />
        </motion.div>
      </div>
      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cardBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-530 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
                >
                  <img
                    src={item?.imageURL}
                    alt="imageURL"
                    className="w-20 h-20  max-w-[60px] rounded-full object-cover"
                  />
                  {/* name section */}
                  <div className="flex flex-col gap-2">
                    <p className=" text-base text-FloralWhite">
                      {item?.title}
                    </p>
                    <p className="text-sm block text-Thistle1 font-semibold">
                      $ {parseFloat(item?.price * qty)}
                    </p>
                  </div>
                  <div className="group flex items-center gap-2 ml-auto cursor-pointer"></div>
                  {/* button section */}
                  <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                    <motion.div
                      whileTap={{ scale: 0.7 }}
                      onClick={() => updateQty('remove', item.id)}
                    >
                      <BiMinus className="text-white" />
                    </motion.div>
                  </div>
                  <p className="text-white ml-3">{item.qty}</p>
                  <div className="group flex items-center gap-2 ml-3 cursor-pointer mr-3">
                    <motion.div
                      whileTap={{ scale: 0.7 }}
                      onClick={() => updateQty('add', item.id)}
                    >
                      <BiPlus className="text-white" />
                    </motion.div>
                  </div>
                </div>
              ))}
          </div>
          {/* cart total section */}
          <div className="fixed bottom-0 w-full h-340 bg-textColor rounded-t-3xl">
            <div className="my-11">
              <div className="text-lighttextGray flex justify-between px-14">
                <p>Sub Total</p>
                <p>
                  $<span>27</span>
                </p>
              </div>
              <div className="text-lighttextGray flex justify-between px-14 mt-3">
                <p>Delivery</p>
                <p>
                  $<span>27</span>
                </p>
              </div>
            </div>
            <div>
              <div className=" text-white font-semibold  border-t border-t-headingColor mx-14   ">
                <div className="flex justify-between mt-9">
                  <div>
                    <p>Total</p>
                  </div>
                  <div>
                    <p>
                      $<span>29.5</span>
                    </p>
                  </div>
                </div>
              </div>
              {user ? (
                <motion.div
                  whileTap={{ scale: 0.7 }}
                  className="flex justify-center items-center mt-9 h-10 bg-gradient-to-tr from-DarkOrange to-DarkMagenta cursor-pointer mx-12 rounded-2xl shadow-lg transition-all ease-in-out duration-150"
                >
                  <button
                    type="button"
                    className="w-full h-full font-semibold text-card"
                  >
                    Check Out
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  whileTap={{ scale: 0.7 }}
                  className="flex justify-center items-center mt-9 h-10 bg-gradient-to-tr from-DarkOrange to-DarkMagenta cursor-pointer mx-12 rounded-2xl shadow-lg transition-all ease-in-out duration-150"
                >
                  <button
                    type="button"
                    className="w-full h-full font-semibold text-card"
                  >
                    Login to check out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="W-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EnptyCart} alt="EnptyCart" className="w-300 " />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
