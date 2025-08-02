import NavLogin from './NavLogin';

const Nav = () => {

  return (
    <nav className="flex justify-between items-center w-full px-4 py-2">
      <ul className="flex">
        <li className="p-5 text-white"><a href="">Home</a></li>
        <li className="p-5 text-white"><a href="">Rent & Prices</a></li>
        <li className="p-5 text-white"><a href="">About Us</a></li>
        <li className="p-5 text-white"><a href="/contact">Contact</a></li>
        <li className="p-5 text-white"><a href="/reviews">Reviews</a></li>
      </ul>

      <NavLogin />
    </nav>
  );
};

export default Nav;