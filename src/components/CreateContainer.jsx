import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
  MdOutlineMonetizationOn,
} from 'react-icons/md';
import Loader from './Loader';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase.config';
import {
  getAllFoodItems,
  saveItem,
} from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

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
    id: 5,
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

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setcategory] = useState(null);
  const [imageAsset, setimageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{}, dispatch] = useStateValue();

  const upLoadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const StorageRef = ref(
      storage,
      `Image${Date.now()}-${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(StorageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setFields(true);
        setMsg('Error while uploading: Try AGain');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setimageAsset(downloadURL);
            setIsLoading(false);
            setFields(true);
            setMsg('Image Uploaded Successfully');
            setAlertStatus('success');
            setTimeout(() => {
              setFields(false);
            }, 4000);
          }
        );
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setimageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (
        !title ||
        !categories ||
        !imageAsset ||
        !category ||
        !price
      ) {
        setFields(true);
        setMsg('Required fields can not  be empty');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Image Uploaded successfully');
        setTimeout(() => {
          cleaData();
        }, 2000);
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      setFields(true);
      setMsg('Error while uploading: Try AGain');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const cleaData = () => {
    setTitle('');
    setimageAsset(null);
    setCalories('');
    setPrice('');
    setcategory('Select Category');
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_iTEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-90 md:w-[75%] border border-Gray rounded-lg p-4 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center ${
              alertStatus === 'danger'
                ? 'text-DarkRed bg-LightSalmon'
                : 'text-DarkGreen bg-LimeGreen'
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-Gray flex items-center gap-2">
          <MdFastfood className="text-xl text-headingColor" />
          <input
            type={'text'}
            required
            value={title}
            placeholder="Give me a title..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-full text-lg bg-primary  outline-none border-none placeholder:text-lighttextGray text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setcategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-Gray p-2 pl-6 cursor-pointer rounded-md"
          >
            <option value={'other'} className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mt-5 group flex justify-center items-center flex-col border-2 border-dotted border-Gray w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer ">
                    <div className="w-ful h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-Gray text-3xl hover:text-textColor" />
                      <p className="text-Gray hover:text-textColor">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type={'file'}
                      name="uploadimage"
                      accept="image/*"
                      onChange={upLoadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadimage"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-cartNumBg text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-Gray flex items-center gap-2 ">
            <MdFoodBank className="text-textColor text-2xl" />
            <input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              type={'text'}
              className="w-full h-full text-lg bg-primary outline-none border-none placeholder:text-lighttextGray"
              placeholder="Calories"
            />
          </div>
          <div className="w-full py-2 border-b border-Gray flex items-center gap-2 ">
            <MdOutlineMonetizationOn className="text-textColor text-2xl" />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type={'text'}
              className="w-full h-full text-lg bg-primary outline-none border-none placeholder:text-lighttextGray"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full mt-3 md:w-auto border-none outline-none bg-DarkMagenta px-12 py-2 rounded-lg text-lg text-white font-semibold "
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
