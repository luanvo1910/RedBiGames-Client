import {useContext, useEffect } from 'react'
import { OrderContext } from '../contexts/OrderContext'
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const currency = "USD";
const style = {"layout":"vertical"};

const Payment = () => {
    let history = useHistory();

    const {
        orderState: {order},
        addOrder,
        setShowToast
    } = useContext(OrderContext)

    const {
		authState: {
			user
		}
	} = useContext(AuthContext)

    const createOrder = async () => {
        if (order.total > 0){
            try {
                const {success, message} = await addOrder(order)
                setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
            } catch (error) {
                console.log(error)
            }
        }
    }   

    const confirmOrder = () => {
        createOrder()
        history.push("/")
    }

    const ButtonWrapper = ({showSpinner}) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    
    
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[order.total, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: order.total,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                console.log(orderId)
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {
                            console.log('successful payment by PayPal')
                            confirmOrder()
                        });
                    }}
                />
            </>
        );
    }

  return (
      <>
      
                <h1>
                    CONFIRM ORDER {user.username.toUpperCase()}
                </h1>
                <h4>
                    Thank you for your purchanse
                </h4>
            <p>Please check invoice we have been sent to your email {order.email}</p>
            <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    showSpinner={false}
                />
			</PayPalScriptProvider>
		    </div>
            </>
  )
}

export default Payment