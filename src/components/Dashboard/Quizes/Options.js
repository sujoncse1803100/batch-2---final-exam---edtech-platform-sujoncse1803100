const UseerForm = () => {
  const showStep = (step) => {
    switch (step) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      case 2:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="mt-5 mb-5 text-center">
        <Stepper
          className="w-75"
          style={{ margin: "0 auto" }}
          activeStep={currentStep}
          alternativeLabel
        >
          <Step>
            <StepLabel>Personal Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Bank Payment</StepLabel>
          </Step>
          <Step>
            <StepLabel>Membership Created</StepLabel>
          </Step>
        </Stepper>
      </div>
      {showStep(currentStep)}
    </div>
  );
};
