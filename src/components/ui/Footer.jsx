import React from "react";
import { MdCardMembership } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineBookOnline } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { FaQq } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-white border-t pt-10 pb-6 text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-4">
          {/* ZANDO APP */}
          <div>
            <h3 className="font-bold mb-3">ICT APP</h3>
            <img src="/qr-code.png" alt="QR Code" className="w-28 h-28" />
          </div>

          {/* LOYALTY */}
          <div>
            <h3 className="font-bold mb-3">LOYALTY</h3>
            <p className="flex items-center gap-2">
              <span>
                <MdCardMembership />
              </span>{" "}
              Membership & Benefits
            </p>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="font-bold mb-3">FOLLOW US</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaFacebook /> Facebook
              </li>
              <li className="flex items-center gap-2">
                <FiInstagram /> Instagram
              </li>
              <li className="flex items-center gap-2">
                <FaTiktok /> TikTok
              </li>
              <li className="flex items-center gap-2">
                <FaYoutube /> Youtube
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICES */}
          <div>
            <h3 className="font-bold mb-3">CUSTOMER SERVICES</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdOutlineBookOnline /> Online exchange policy
              </li>
              <li className="flex items-center gap-2">
                <MdPrivacyTip /> Privacy Policy
              </li>
              <li className="flex items-center gap-2">
                <FaQq /> FAQs & guides
              </li>
              <li className="flex items-center gap-2">
                <MdFindInPage /> Find a store
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="font-bold mb-3">CONTACT US</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MdEmail /> customer.care@ICT.com
              </li>
              <li className="flex items-center gap-2"><FaPhone /> (+855) 012 34 56</li>
              <li className="flex items-center gap-2"><FaTelegram /> Telegram</li>
            </ul>
          </div>
        </div>

        {/* WE ACCEPT */}
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <h3 className="font-bold mb-3">WE ACCEPT</h3>
          <div className="flex flex-wrap items-center gap-4">
            {/* Replace with your actual payment images */}
            <img src="/pay-aba.png" className="h-8" alt="ABA Pay" />
            <img src="/visa.png" className="h-8" alt="Visa" />
            <img src="/mastercard.png" className="h-8" alt="MasterCard" />
            <img src="/unionpay.png" className="h-8" alt="UnionPay" />
            <img src="/jcb.png" className="h-8" alt="JCB" />
            <img src="/wing.png" className="h-8" alt="Wing Bank" />
            <img src="/bank.png" className="h-8" alt="Bank Transfer" />
            <img src="/cash.png" className="h-8" alt="Cash on Delivery" />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto mt-12 px-4 border-t pt-4 text-sm text-gray-600">
          © 2015 - 2025 ICT SHOP. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
