import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg text-sm font-bold">
          {book.publishYear}
        </h2>

        <h4 className="mb-3 text-gray-500 text-xs break-words">{book._id}</h4>

        <div className="flex items-center gap-x-2 mb-2">
          <PiBookOpenTextLight className="text-red-300 text-xl" />
          <h2 className="text-base font-semibold">{book.title}</h2>
        </div>

        <div className="flex items-center gap-x-2 mb-2">
          <BiUserCircle className="text-red-300 text-xl" />
          <h2 className="text-sm text-gray-700">{book.author}</h2>
        </div>
        <p className="mt-4">Description</p>
        <p className="my-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt eius cum distinctio molestias reprehenderit delectus, rem quibusdam ducimus. Necessitatibus numquam voluptatibus unde, sequi quia culpa quas cum quod eaque ut!
          Debitis itaque odio placeat excepturi praesentium nostrum a error illo facilis at, ab explicabo, sed illum fugiat eos quae quasi assumenda totam voluptatibus voluptate maxime reprehenderit magni dolor blanditiis. Quo.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
