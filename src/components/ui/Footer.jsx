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
          {/* ict APP */}
          <div>
            <h3 className="font-bold mb-3"></h3>
            <img src="/public/icon.png" alt="QR Code" className="w-28 h-28" />
          </div>

          {/* LOYALTY */}
          <div>
            <h3 className="font-bold mb-3">LOYALTY</h3>
            <p className="flex items-center gap-2">
              <span>
                <MdCardMembership />
              </span>
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
            <img src="https://super-duper.biz/wp-content/uploads/Untitled-1.jpg" className="h-8" alt="ABA Pay" />
            <img src="https://m.eyeofriyadh.com/news_images/2020/07/1c58492c218f6.jpg" className="h-8" alt="Visa" />
            <img src="https://p7.hiclipart.com/preview/130/79/694/mastercard-credit-card-mastercard-logo-png.jpg" className="h-8" alt="MasterCard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png" className="h-8" alt="UnionPay" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1200px-JCB_logo.svg.png" className="h-8" alt="JCB" />
            <img src="https://hrincjobs-pro.s3.amazonaws.com/media/public/filer_public/b2/44/b2445f30-f856-4958-8b21-c76754717a1a/wing.png" className="h-8" alt="Wing Bank" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOYT7e94q9uJr9eaV4bXs0VJEWkhgpSA4bpdlrirzBpXZJkEIPstB5Nbe_4LtmMQ0Z9g&usqp=CAU" className="h-8" alt="Bank Transfer" />
            <img src="https://support.sitegiant.com/wp-content/uploads/2022/08/cash-on-delivery-banner.png" className="h-8" alt="Cash on Delivery" />
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
