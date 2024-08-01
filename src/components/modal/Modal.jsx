import Modal from "react-modal";
// import style from '@/app/components/Modal/Modal.module.css'
// import styles from "@/components/components.module.scss";
import { MdCancel } from "react-icons/md";
import Field from "../inputFIeld/Field";
import Button from "../button/Button";
import { useState } from "react";

const ModalComp = ({ isOpen, closeModal, order, handelChange, handelSubmit, isLoading }) => {
  // const overlayClass = isOpen ? `${styles.custom_overlay} ${styles.modal_open}` : `${styles.custom_overlay}`;
  const { Prescription, price, order_status } = order;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false}
    //   overlayClassName={styles.custom_overlay}
      className={`w--[20rem] border-2 border-[#de8127] w-fit w--[50%] h-fit h--[95%]  md:w--fit max--[340px]:h-[26rem] flex bg-white absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-xl overflow-hidden overflow-y-auto z-[9999]`}
    >
      <div className="border--2 border-[blue] w-full">
        <div className="border--2 border-[green] min-w-full h-fit h--[5rem] relative flex justify-between items-center">
          <div>
            <h2
              className={`max-[340px]:text-[1.3rem] text-2xl md:text-3xl lg:text-[2rem] font-semibold`}
            >
              Direct Order
            </h2>
          </div>

          <div className="flex items-center">
            <button
              onClick={closeModal}
              className="bg-[white] p-1 rounded-2xl h-full ms-10"
            >
              <MdCancel
                className={`max-[340px]:text-[1.3rem] text-2xl md:text-[2rem]`}
              />
            </button>
          </div>
        </div>

        <div className="border--2 border-[green] flex flex-col items-center">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow--md">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-base font-bold mb-2"
                htmlFor="file"
              >
                Select Prescription File
              </label>
              <input
                type="file"
                id="file"
                name="Prescription"
                // value={Prescription}
                onChange={handelChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Field type="text" name="price" placeHolder={"Price"} value={price} onChange={handelChange} />
            <Field name={"order_status"} placeHolder={"Order Status"} value={order_status} onChange={handelChange} className={`mt-4`} disabled={true} />

            <div className="border--2 border-purple-900 md:col-span-4 lg:col-span-5 flex items-center justify-center mt-5">
              <Button
                name={"Create Order"}
                textColor={"text-white-color"}
                bgcolor={"bg-primary-color"}
                pClass={"w-fit justify-center"}
                mainClass={`mt-4 w-[90%] md:mt-0 md:w-[10rem] rounded-lg p-2 active:scale-95`}
                // onClick={() => setModalIsOpen(true)}
                onClick={handelSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComp;
