import React, { useRef, useEffect } from "react";

export default function Paypal({ totalPrice, setData, data, handelSubmit }) {
    const paypal = useRef();
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Cool looking table",
                                amount: {
                                    currency_code: "USD",
                                    value: totalPrice,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (res, actions) => {
                    const order = await actions.order.capture();
                    if(order.status === "COMPLETED") {
                        handelSubmit({...data, orderStatus: 1})
                    }
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
