import React from 'react';
import HeroBg from '../img/heroBg.png';
import I1 from '../img/i1.png';
import F1 from '../img/f1.png';
import C3 from '../img/c3.png';
import Fi1 from '../img/fi1.png';
import Delivery from '../img/delivery.png';

const heropData = [
  {
    id: 1,
    name: 'Icecream',
    decp: 'Chocloate & Vanilla',
    price: '10.1',
    imageSrc: I1,
  },
  {
    id: 2,
    name: 'Strawberries',
    decp: 'Fresh Strawberries',
    price: '28.5',
    imageSrc: F1,
  },
  {
    id: 3,
    name: 'Chicken Kebab',
    decp: 'Mixed Fish Plate',
    price: '15.1',
    imageSrc: C3,
  },
  {
    id: 4,
    name: 'Fish Kebab',
    decp: 'Mixed Fish Kebab',
    price: '15.7',
    imageSrc: Fi1,
  },
];

function HomeContainer() {
  return (
    <div
      className="mt-8 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 "
      id="home"
    >
      <div className=" py-2 flex-1 flex flex-col items-start md:items-center justify-center gap-5">
        <div className="p-1 px-3 flex items-center justify-center gap-2 bg-Khaki1 rounded-full ">
          <p className="text-base text-DarkOrange font-semibold ">
            Bike Delivery
          </p>
          <div className="w-10 h-10 bg-white rounded-full overflow-hidden shadow-ms">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2rem] font-bold  ">
          The Fastest Delivery in
          <span className="text-DarkOrange text-[3rem] ">
            {' '}
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Minima velit eaque fugit distinctio est nam voluptatum
          architecto, porro iusto deserunt recusandae ipsa minus eos
          sunt, dolores illo repellat facere suscipit!
        </p>
        <button
          type="button"
          className=" md:w-auto text-white font-medium bg-DarkOrange from-DarkOrange  to-DarkOrange  w-full px-4 py-2 rounded-md hover:shadow-lg translate-all ease-in-out duration-100"
        >
          Oder Now
        </button>
      </div>
      <div className=" relative py-2  flex-1 flex items-center">
        <img
          src={HeroBg}
          className="ml-auto lg:mr-12  h-420 w-auto lg:h-650 lg:w-auto "
          alt="HeroBg"
        />
        <div className="absolute lg:w-60 w-93  h-full top-5 lg:left-48 left-0 flex items-center justify-center lg:gap-4 gap-8 flex-wrap">
          {heropData &&
            heropData.map((n) => (
              <div className=" w-120 lg:w-210  bg-cardOverlay backdrop-blur-md rounded-3xl p-3 flex flex-col items-center justify-center drop-shadow-lg ">
                <img
                  className="w-40 -mt-20"
                  src={n.imageSrc}
                  alt="imageSrc"
                />
                <p className="lg:text-lg text-md text-center font-semibold text-textColor">
                  {n.name}
                </p>
                <p className=" text-lighttextGray text-md text-center font-semibold my-2">
                  {n.decp}
                </p>
                <p className="text-sm font-semibold">
                  <span className="text-xs text-cartNumBg">$</span>
                  &ensp;{n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
