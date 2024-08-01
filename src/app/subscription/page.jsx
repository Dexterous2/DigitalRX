"use client";

import Subscription from "@/components/subscription/Subscription";
// import DashboardLayout from "@/layout/DLayout/DashboardLayout";
import PharmacyLayout from "@/layout/PharmacyLayout/PharmacyLayout";

const Page = () => {
  return (
    <PharmacyLayout headingName={"Subscription"}>
      {/* <div className="border-2 border-[red] min-w-full flex justify-center"> */}
        {/* <div className="flex gap-4 flex-col md:flex-row mt-8 max-w-6xl w-full justify-stretch"> */}
        <div className="border--2 border-[red] grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Subscription /> 
        </div>
      {/* </div> */}
    </PharmacyLayout>
  );
};

export default Page;
