"use client";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import Button from "../button/Button";
import { IoLocation } from "react-icons/io5";
import { useSelector } from "react-redux";

const PatientsCards = ({ data }) => {
  const router = useRouter();

  const text_color = useSelector((state) => state.theme.text_color);
    const bg_color = useSelector((state) => state.theme.bg_color);

  return (
    <div className="flex flex-col bg-[#FFF6EB] w-full items-center gap-4 p-4 rounded-xl card_shadow_orange" key={data?._id}>
      <div className="flex flex-col w-52 items-center gap-4 h-full justify-between">
        <div className="flex flex-col items-center gap-4 w-full">
          <img
            src={data.profileImg}
            alt="no img"
            className="rounded-[100%] sm:w-auto min-w-[10rem] h-[10rem] object-cover"
          />
          <span className="flex flex-col gap-2 items-center w-full">
            <h2 className="text-primary-color">{data.name}</h2>
            <div className="flex justify-start w-full">
              {
                data.address === undefined ? '' : <div> <IoLocation className={`text-2xl ${text_color} mt-1`}/> </div>
              }
              <p className="ms-2">{data.address.slice(0, 20)}...</p>
            </div>
          </span>
        </div>

        <div className="w-full">
          <ul>
            <li className="flex items-center gap-2 text-sm">
              <GoDotFill color="#DE8127" />3 Orders
            </li>
            <li className="flex items-center gap-2 text-sm">
              <GoDotFill color="#DE8127" />2 Refills
            </li>
            <li className="flex items-center gap-2 text-sm">
              <GoDotFill color="#DE8127" />
              Enrolled yesterday{" "}
            </li>
          </ul>
        </div>

        <Button
          name={"View Profile"}
          style={{
            borderRadius: "50px",
            paddingInline: "2rem",
            width: "fit-content",
          }}
          bgcolor="bg-primary-color"
          textColor="text-white-color"
          className={"w-fit"}
          onClick={() => router.push(`/patients-profile/${data._id}`)}
        />
      </div>
    </div>
  );
};

export default PatientsCards;
