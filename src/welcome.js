import React, { useState } from "react";
import { supabase } from "./lib/supabase";
import { redirect, useNavigate } from "react-router-dom";

import Illustration from "./assets/pooping-illustration.png";
import { AnimatePresence, motion } from "framer-motion";

const Welcome = ({ session }) => {
    const totalSteps = 2;

    const [currentStep, setCurrentStep] = useState(1);
  
    console.log("steps", currentStep);
    const nextStep = () => {
      setCurrentStep((prevStep) => prevStep + 1);
      console.log(currentStep);
    };
  
    const handleNext = (data) => {
      setCurrentStep((prevStep) => prevStep + 1);
    };
  
    const prevStep = () => {
      setCurrentStep((prevStep) => prevStep - 1);
      console.log(currentStep);
    };
  return (
    <AnimatePresence mode="wait">
      {/* Use motion.div for animated components */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: currentStep > 1 ? -100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: currentStep > 1 ? 100 : 100 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
      >
        {/* Render the current step component */}
        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {currentStep === 2 && <Step2 session={session} />}
        {/* Add more components for each step */}
      </motion.div>
    </AnimatePresence>
  );
};

const Step1 = ({onNext}) => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <img className="mb-10" src={Illustration} alt="Акащ човек" />
      <h1 className="font-semibold text-2xl mb-1 stolzl">Добре дошъл в Poop</h1>
      <h3 className="font-medium text-center">
        Остава само 1 стъпка, преди да станеш <br /> най-големия лайнар.
      </h3>

      <button
        className="text-white bg-[#5B3410] fixed bottom-8 mx-5  p-4 w-80 rounded-full manrope font-bold text-lg"
        onClick={() => onNext()}
      >
        Продължи
      </button>
    </div>
  );
};

const Step2 = ({session}) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  let userId = session.user.id;

  async function ChangeUsername() {
    const { error } = await supabase
      .from("profiles")
      .update({ username: username })
      .eq("id", userId);

    console.log(username);

    console.log("Error", error);

    if (error === null) {
        navigate("/");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center flex-col">
    <img className="mb-10" src={Illustration} alt="Акащ човек" />
    <h1 className="font-semibold text-2xl stolzl mb-2">Избери псевдоним:</h1>
    <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Напишете псевдонима тук"
        className="text-sm bg-transparent rounded-[4px] px-[15px] p-[10px] border-[1px] w-full border-[lightgray]"
      />

    <button
      className="text-white bg-[#5B3410] fixed bottom-8 mx-5  p-4 w-80 rounded-full manrope font-bold text-lg"
      onClick={() => ChangeUsername()}
    >
      Продължи
    </button>
  </div>
  )
};

export default Welcome;
