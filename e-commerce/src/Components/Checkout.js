import React,{useState, useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from "@mui/material";
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import {commerce} from "../lib/commerce"
import { Link } from "react-router-dom";


const steps = ["Shipping address", "Payment details"];

function Checkout({ cart, onCaptureCheckout, order, error }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        // console.log(token);
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
     setIsFinished(true)
    }, 3000);
  }

 let Confirmation = () =>
   order.customer ? (
     <>
       <div>
         <Typography variant="h5">
           Thank you for your purchase, {order.customer.firstname}{" "}
           {order.customer.lastname}!
         </Typography>
         <Divider style={{ margin: "20px 0" }} />
         <Typography variant="subtitle2">
           Order ref: {order.customer_reference}
         </Typography>
       </div>
       <br />
       <Button component={Link} variant="outlined" type="button" to="/">
         Back to home
       </Button>
     </>
   ) : isFinished ? (
     <>
       <div>
         <Typography variant="h5">
           Thank you for your purchase
         </Typography>
         <Divider style={{ margin: "20px 0" }} />
       </div>
       <br />
       <Button component={Link} variant="outlined" type="button" to="/">
         Back to home
       </Button>
     </>
   ) : (
     <div
       style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
       }}
     >
       <CircularProgress />
     </div>
   );

 if (error) {
   Confirmation = () => (
     <>
       <Typography variant="h5">Error: {error}</Typography>
       <br />
       <Button component={Link} variant="outlined" type="button" to="/">
         Back to home
       </Button>
     </>
   );
 }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep ={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout = {timeout}
      />
    );
  return (
    <div>
      <CssBaseline />
      <div style={{ flexGrow: 1 }} />
      <main
        style={{
          marginTop: "5%",
          width: "auto",
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        <Paper style={{ marginTop: 84, marginBottom: 24, padding: 16 }}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            style={{
              paddingTop: 24,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 40,
            }}
          >
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  );
}

export default Checkout