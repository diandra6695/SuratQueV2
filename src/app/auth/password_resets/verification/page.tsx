"use client";
import Image from "next/image";

const VerificationResetPassword = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
        <Image
          className="pointer-events-none w-48"
          src={"/assets/images/illustrations/auth/emailSend.svg"}
          alt="emailSend"
          height={300}
          width={300}
        />
        <h3 className="text-2xl text-primary font-bold">
          Please check your email
        </h3>
        <div className="text-center">
          <p className="text-neutral-400 text-sm">You are all ready to go!</p>
          <p className="text-neutral-400 text-sm">
            Check your email and follow link to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationResetPassword;
