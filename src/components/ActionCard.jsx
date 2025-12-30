import { Link } from "react-router-dom";

const ActionCard = ({ title, desc, to }) => {
  return (
    <Link
      to={to}
      className="
  bg-white rounded-xl p-6 border
  hover:shadow-lg hover:-translate-y-1
  transition-all duration-300
"

    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{desc}</p>
    </Link>
  );
};

export default ActionCard;
