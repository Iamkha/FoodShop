import React, { useEffect, useState } from 'react';
import { MdFastfood } from 'react-icons/md';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const categories = [
  {
    id: 1,
    name: 'Chicken',
    urlParamName: 'chicken',
  },
  {
    id: 2,
    name: 'Curry',
    urlParamName: 'curry',
  },
  {
    id: 3,
    name: 'Rice',
    urlParamName: 'rice',
  },
  {
    id: 4,
    name: 'Fish',
    urlParamName: 'fish',
  },
  {
    if: 5,
    name: 'Fruits',
    urlParamName: 'fruits',
  },
  {
    id: 6,
    name: 'Icecream',
    urlParamName: 'icecream',
  },
  {
    id: 7,
    name: 'Soft Drinks',
    urlParamName: 'drinks',
  },
];
const MenuContainer = () => {
  const [filter, setFields] = useState('chicken');
  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full my-6 md:p-16 -mt-14" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="md:text-2xl md:mt-0 mt-24 text-lg font-semibold capitalize text-headingColor  relative before:absolute before:rounded-lg before:content before:w-16 md:before:w-20 before:h-1 before:bottom-0 before:left-0 md:before:left-0 before:right-auto before:bg-gradient-to-tr from-DarkOrange to-DarkMagenta mr-auto  transition-all ease-in-out duration-100">
          Our Hot Dishes
        </p>
        <div className="w-full flex mt-10  items-center justify-start lg:justify-center gap-8 md:mt-6 overflow-x-scroll  scrollbar-none">
          {categories &&
            categories.map((categorie) => (
              <motion.div
                whileTap={{ scale: 0.3 }}
                key={categorie.id}
                onClick={() => setFields(categorie.urlParamName)}
                className={`group ${
                  filter === categorie.urlParamName
                    ? 'bg-Salmon'
                    : 'bg-card'
                } w-24 min-w-[94px] hover:bg-Salmon h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col  gap-3 items-center justify-center duration-150 transition-all ease-in-out `}
              >
                <div
                  className={`${
                    filter === categorie.urlParamName
                      ? 'bg-card'
                      : 'bg-Salmon'
                  } w-10 h-10  rounded-full group-hover:bg-card flex items-center justify-center`}
                >
                  <MdFastfood
                    className={`${
                      filter === categorie.urlParamName
                        ? 'text-textColor'
                        : 'text-white'
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === categorie.urlParamName
                      ? 'text-white'
                      : 'text-DarkRed'
                  } group-hover:text-white`}
                >
                  {categorie.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full ">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
