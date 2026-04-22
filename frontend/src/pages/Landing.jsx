import React from "react";

const Landing = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
         src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=1600&q=80"
          alt="Auction Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* OPTIONAL GLOW EFFECT */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] md:bg-yellow-500 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] md:bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Welcome to <span className="text-yellow-400">Live Auction House</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Experience the thrill of real-time bidding. Compete, win, and own exclusive items at unbeatable prices.
        </p>

        <a
          href="/home"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
        >
          Enter Auction 
        </a>

      </div>

    </div>
  );
};

export default Landing;