import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 pb-20 pt-32">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[var(--color-primary)] mb-4">
          About Live Auction House
        </h1>
        <p className="text-[var(--color-muted)] text-lg md:text-xl max-w-3xl mx-auto">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur iure expedita consectetur, adipisci aut itaque fugit, recusandae nesciunt saepe voluptas qui ducimus ut sint!
        </p>
      </div>

      {/* MISSION & VISION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=800&q=80"
            alt="Auction Concept"
            className="rounded-2xl shadow-xl object-cover w-full max-w-md"
          />
        </div>

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
            Our Mission
          </h2>
          <p className="text-[var(--color-muted)] mb-6 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolor facilis minima. Eligendi officiis possimus exercitationem reiciendis voluptates. Voluptas expedita voluptate excepturi earum adipisci mollitia placeat quam doloribus!
          </p>

          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
            Our Vision
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse consequuntur corporis, aperiam, mollitia odio quam repudiandae velit aut distinctio natus neque ipsum at, deserunt error!
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-4xl font-extrabold text-[var(--color-primary)] mb-8">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-[var(--color-card)] rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Real-Time Bidding</h3>
            <p className="text-[var(--color-muted)]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, omnis?
            </p>
          </div>

          <div className="p-6 bg-[var(--color-card)] rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-[var(--color-muted)]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, nemo?
            </p>
          </div>

          <div className="p-6 bg-[var(--color-card)] rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Exciting Rewards</h3>
            <p className="text-[var(--color-muted)]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, magnam?
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[var(--color-primary)] mb-6">
          Ready to Join the Excitement?
        </h2>
        <a
          href="/home"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg"
        >
          Explore Auctions 
        </a>
      </div>

    </div>
  );
};

export default About;