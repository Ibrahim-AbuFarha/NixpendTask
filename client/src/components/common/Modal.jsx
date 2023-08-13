function Modal({ onClose, children }) {
  return (
    <>
      <div className="bg-[#2c2c38] p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] sm:w-[500px] z-10 rounded-lg  ">
        {children}
      </div>

      <div
        onClick={onClose}
        className="absolute w-full h-full top-0 left-0 opacity-40 bg-black"
      ></div>
    </>
  );
}

export default Modal;
