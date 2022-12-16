import HomeContainer from './HomeContainer';
import ImgShop from '../img/cityshop.png';
import Logo from '../img/logo.png';
import { AiFillPhone, AiTwotoneMail } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import { useEffect, useState } from 'react';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);
  return (
    <div>
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <HomeContainer />
        <section className="w-full   md:p-16 mt-8 ">
          <div className="w-full flex items-center justify-between">
            <p className="md:text-2xl text-lg font-semibold capitalize text-headingColor  relative before:absolute before:rounded-lg before:content before:w-20 md:before:w-28 before:h-1 before:bottom-0 before:left-0.5 before:bg-gradient-to-tr from-DarkOrange to-DarkMagenta  transition-all ease-in-out duration-100">
              Our fresh & healthy fruits
            </p>
            <div className="hidden md:flex gap-3 items-center ">
              <motion.div
                onClick={() => setScrollValue(-200)}
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-xl bg-DarkOrange flex items-center justify-center hover:bg-DarkMagenta cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg "
              >
                <MdChevronLeft className="text-lg text-white" />
              </motion.div>
              <motion.div
                onClick={() => setScrollValue(200)}
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-xl bg-DarkOrange flex items-center justify-center hover:bg-DarkMagenta cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg "
              >
                <MdChevronRight className="text-lg text-white" />
              </motion.div>
            </div>
          </div>
          <RowContainer
            scrollValue={scrollValue}
            flag={true}
            data={foodItems?.filter((n) => n.category === 'fruits')}
          />
        </section>
      </div>
      <div>
        <section>
          <MenuContainer />
        </section>
        {cartShow && <CartContainer />}
      </div>

      <div className="bg-primary mt-6 lg:mt-0 w-full h-full border-t-2 lg:flex lg:justify-between">
        <div>
          <div className="w-50 flex justify-between mt-3 gap-2">
            <img src={Logo} className="w-10 h-auto" alt="Logo" />
            <span className="flex justify-center items-center font-medium text-xl ">
              city
            </span>
          </div>
          <div>
            <p className="mt-1">
              - Hãy làm no chiếc bụng của các bạn.
            </p>
            <p className="flex  items-center gap-2 ">
              <AiFillPhone /> Tư vấn hỗ trợ:{' '}
              <span className="text-DarkMagenta">0862510104.</span>
            </p>
            <p className="flex items-center gap-2">
              <AiTwotoneMail /> Email:
              <span className="text-cartNumBg">
                {' '}
                Phuockha2852001@gmail.com.
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BiTime /> Hỗ trợ 24/7.
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-lg">- Thông tin thêm:</p>
          <div className="cursor-pointer font-medium text-textColor">
            <p>1. Giới thiệu.</p>
            <p>2. Hướng dẫn sử dụng.</p>
            <p>3. Điều Khoảng sử dụng. </p>
            <p>4. Giới thiệu nhận quà. </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="lg:text-xl text-lg font-semibold">
            - PHẦN MỀM QUẢN LÝ BÁN HÀNG CITY.
          </p>
          <p className="text-DarkGreen mt-2">
            Trụ sở: 146 Tôn Thất Bách, Hương Vân, Hương Trà, Thừa
            Thiên Huế.
          </p>
          <div className="lg:ml-28 mt-3 flex items-center justify-between gap-2 lg:w-300">
            <img src={ImgShop} className="w-100" alt="shop" />
            <p>- Oder liền tay, nhanh tay nhận quà.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
