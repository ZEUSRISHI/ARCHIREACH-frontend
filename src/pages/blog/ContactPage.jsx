import React, { useState } from 'react';
import SharedNavbar from '../../components/Layout/SharedNavbar';
import { Users, MessageCircle, MapPin, CheckCircleIcon, XCircleIcon, ClockIcon, UsersIcon, Globe, ChartPie, Building, DollarSign, Search, X, User, GraduationCap, Compass, Zap, Star, Mail, Lock, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { LoginModal } from '../find-projects/LoginModal';
import Navbar from '../../components/Navbar';
import NavbarAll from '../../components/NavbarAll';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="pt-4">
<NavbarAll />
</div>

      <main className="pt-16 pb-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center px-6 mb-12">
          <h1 className="text-4xl font-medium text-[rgb(122,107,235)] mb-4">Get in touch</h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            Please do not hesitate to reach out to us for any queries or feedback. We are here to
            create effective solutions for any of your concerns
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto px-6 mb-20">
          <div className="border border-gray-100 rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[rgb(122,107,235)]"
              />
              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[rgb(122,107,235)]"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[rgb(122,107,235)]"
              />
              <textarea
                placeholder="Message *"
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[rgb(122,107,235)] resize-none"
              />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-10 py-2.5 bg-[#f5d0e8] text-[rgb(122,107,235)] font-semibold rounded-full hover:bg-[#f0bcdc] transition-colors shadow-sm"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Store Location Section */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <h2 className="text-3xl font-medium text-[rgb(122,107,235)] text-center mb-8">Store location</h2>

          <div className="bg-[#fcf8ff] rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
            {/* Contact Details */}
            <div className="flex-1 space-y-8 text-left w-full lg:w-auto">
              <section>
                <h3 className="text-[rgb(122,107,235)] font-bold text-lg mb-2">Timings:</h3>
                <p className="text-[#a28ef5] font-medium italic">All Days Available (10:00 am to 9:30 pm)</p>
              </section>

              <section>
                <h3 className="text-[rgb(122,107,235)] font-bold text-lg mb-2">Address:</h3>
                <p className="text-[#a28ef5] leading-relaxed">
                  123 Architecture Street,<br />
                  Design District, Mumbai,<br />
                  Maharashtra 400001
                </p>
              </section>

              <section>
                <h3 className="text-[rgb(122,107,235)] font-bold text-lg mb-2">Contact No:</h3>
                <p className="text-[rgb(122,107,235)] font-bold text-xl underline cursor-pointer">
                  +91-XXXXX-XXXXX
                </p>
              </section>

              <section>
                <h3 className="text-[rgb(122,107,235)] font-bold text-lg mb-2">Email us:</h3>
                <p className="text-[#e66fb0] font-medium break-all">hello@archireach.in</p>
              </section>
            </div>

            {/* Map Preview */}
            <div className="flex-1 w-full h-[350px] rounded-xl overflow-hidden shadow-md border-4 border-white">
              <iframe
                title="Archireach Location"
                src="https://maps.google.com/maps?q=Mumbai,Maharashtra,400001&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 shadow-inner"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Wide Banner Section */}
        <div className="w-full bg-[rgb(122,107,235)] py-4">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-white text-xs md:text-sm font-bold tracking-[0.1em] uppercase">
              Connecting thousands of verified architects with serious clients across India
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;