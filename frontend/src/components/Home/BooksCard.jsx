import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books.map((item) => (
        <div
          key={item._id}
          className="border-2 border-gray-500 rounded-lg px-4 py-4 m-2 relative hover:shadow-xl w-full"
        >
          <h2 className="absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg text-sm font-bold">
            {item.publishYear}
          </h2>

          <h4 className="mb-3 text-gray-500 text-xs break-words">{item._id}</h4>

          <div className="flex items-center gap-x-2 mb-2">
            <PiBookOpenTextLight className="text-red-300 text-xl" />
            <h2 className="text-base font-semibold">{item.title}</h2>
          </div>

          <div className="flex items-center gap-x-2 mb-2">
            <BiUserCircle className="text-red-300 text-xl" />
            <h2 className="text-sm text-gray-700">{item.author}</h2>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link to={`/books/details/${item._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/books/edit/${item._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
            </Link>
            <Link to={`/books/delete/${item._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
