import React from "react";
import saad from "../../Assets/TechSphere.png"
import anas from "../../Assets/TechSphere.png";
import saadhass from "../../Assets/TechSphere.png";
import Header from "../Header";
import Footer from "../Footer";
const TeamMembers = [
  {
    name: "Saad Ali",
    imageSrc: saad,
    instagram: "https://www.instagram.com/saad.ali619/",
    facebook: "/",
    twitter: "/",
  },
  {
    name: "Anas Khalid",
    imageSrc: anas,
    instagram: "https://www.instagram.com/saad.ali619/",
    facebook: "/",
    twitter: "/",
  },
  {
    name: "Saad Hassan",
    imageSrc: saadhass,
    instagram: "https://www.instagram.com/saad.ali619/",
    facebook: "/",
    twitter: "/",
  },
];

const OurTeam = () => {
  return (
    <>
    <Header/>
      <div className="flex justify-center mt-40">
        <p className="text-4xl font-bold">Our Team</p>
      </div>
      <div className="flex p-8 flex-col md:flex-row gap-6 justify-center items-center">
        {TeamMembers.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg w-[20rem]"
          >
            <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
              <img
                src={data.imageSrc}
                alt="saad ali"
                className="h-full w-full"
              />
            </div>

            <h2 className="mt-4 font-bold text-xl">{data.name}</h2>
            <h6 className="mt-2 text-sm font-medium">Team Member</h6>

            <ul className="flex flex-row mt-4 space-x-2">
              <li>
                <a
                  href={data.facebook}
                  className="flex items-center justify-center h-8 w-8  text-gray-800 border-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={data.twitter}
                  className="flex items-center justify-center h-8 w-8  text-gray-800 border-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={data.instagram}
                  target="null"
                  className="flex items-center justify-center h-8 w-8  text-gray-800 border-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full px-12 gap-y-5 justify-center text-center h-auto pb-6 md:px-32 mt-12">
        <h1 className="text-4xl font-bold">Project Insight</h1>
        <p className="text-justify text-base">
          Dive into a world of immersive shopping where every angle, curve, and
          feature of our products can be examined from every dimension. Our
          commitment to offering an interactive shopping journey allows you to
          virtually handle and inspect each item as if it were in your hands,
          ensuring that you make informed decisions before purchase.
        </p>
        <p className="text-justify text-base">
          TechSphere prides itself on quality, authenticity, and a seamless user
          experience. We value your satisfaction and aim to revolutionize the
          way you shop for tech products. Join us at TechSphere and unlock the
          door to a whole new dimension in online shopping. Your satisfaction is
          our priority.
        </p>
      </div>
      <Footer/>
    </>
  );
};

export default OurTeam;
