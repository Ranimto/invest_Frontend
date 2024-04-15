import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types'

function PayPal({totalPrice,nameProgram}) {

     const paypal = useRef();

    useEffect(() => {
     const initializePayPal = async () => {
     if (!window.paypal) {
         console.error("La bibliothèque PayPal n'est pas chargée.");
          return;
        }
        // Utilisez window.paypal.Buttons() pour créer et afficher le bouton PayPal   
         window.paypal.Buttons(
              { createOrder: (data, actions, err) => {
                   return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {description: nameProgram, 
                            amount: {currency_code: "CAD",value: totalPrice }
                            } ]
                            } 
                    ); },
                onApprove: async (data, actions) => { const order = await actions.order.capture();
                             console.log(order); },
                onError: (err) => { console.log(err); }}).render(paypal.current);};

        initializePayPal();
    }, [totalPrice,nameProgram]);


    return (
         <div>
            <div ref={paypal}></div>
         </div>
              );}


PayPal.propTypes = {

totalPrice: PropTypes.number.isRequired,
nameProgram: PropTypes.string.isRequired

};
export default PayPal;

