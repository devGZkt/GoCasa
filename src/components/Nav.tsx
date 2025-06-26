import Link from 'next/link';

const Nav = () => {

  return (
    <nav className="flex justify-between items-center w-full px-4 py-2">
      <ul className="flex">
        <li className="p-5 text-white"><a href="">Home</a></li>
        <li className="p-5 text-white"><a href="">Rent & Prices</a></li>
        <li className="p-5 text-white"><a href="">About Us</a></li>
        <li className="p-5 text-white"><a href="">Contact</a></li>
      </ul>
      {/*Login and Signup btns with routes*/}
      <div className="flex items-center">
        <Link className="p-2 bg-blue-500 text-white rounded" href="/login">Login</Link>
        <Link className="p-2 bg-green-500 text-white rounded ml-2" href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Nav;