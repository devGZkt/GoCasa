import Nav from "../components/Nav";

export default function Home() {
  return (
    <div>
      <div className="h-20 bg-gray-800">
        <Nav />
      </div>
      <div className="h-120 bg-green-500">
        <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
          Hero Section
        </div>
      </div>
      <div className="h-120 bg-blue-500">
        <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
          Rent Page with btn
        </div>
      </div>
      <div className="h-120 bg-red-500">
        <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
          User Experiance
        </div>
      </div>
      <div className="h-20 bg-yellow-500">
        <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
          ©Copyright Gabriel Zimmermann
        </div>
      </div>
    </div>
  );
}