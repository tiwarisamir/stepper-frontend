import React, { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepConfig = [] }) => {
  const [currentStep, setcurrentStep] = useState(1);
  const [isComplete, setisComplete] = useState(false);
  const [margins, setmargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  useEffect(() => {
    setmargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef]);

  if (!stepConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setcurrentStep((prevStep) => {
      // console.log(prevStep);
      if (prevStep === stepConfig.length) {
        setisComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const handelClick = (e, index) => {
    // console.log(index);
    setcurrentStep(index + 1);
  };

  const ActiveComponent = stepConfig[currentStep - 1]?.Component;

  return (
    <div className="flex flex-col justify-center items-center px-10 ">
      <div className="relative flex justify-between items-center w-full mb-5 ">
        {stepConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className="flex flex-col items-center"
            >
              <div
                className={`w-7 h-7 border-0 rounded-full flex justify-center items-center  z-10 bg-slate-300 cursor-pointer
                ${currentStep > index + 1 ? "bg-green-600 text-white " : ""}
              ${currentStep === index + 1 ? "bg-blue-600 text-white" : ""} `}
                onClick={(e) => handelClick(e, index)}
              >
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-base font-semibold ">{step.name}</div>
            </div>
          );
        })}

        <div
          className="absolute top-1/4  h-1 bg-slate-200"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bg-green-600 h-full transition duration-200 ease"
            style={{
              width: `${((currentStep - 1) / (stepConfig.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="text-center ">
        <ActiveComponent />
      </div>

      {!isComplete && (
        <button
          className="bg-zinc-700 py-1 px-2 m-5  rounded-md text-white text-md font-semibold "
          onClick={handleNext}
        >
          {currentStep === stepConfig.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default CheckoutStepper;
