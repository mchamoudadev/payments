import axios from "axios";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";



function generateUniqueId() {
    return 'order_'+ Date.now();
}


export async function POST(request:NextRequest) {

    const body  = await request.json();


    try {

        const orderId = generateUniqueId();

        const payload = {
            apiOperation : 'INITIATE_CHECKOUT',
            order: {
                amount: body.amount,
                currency: "USD",
                description: "Order Description",
                id: orderId
            },
            interaction : {
                operation: "PURCHASE",
                returnUrl: body.returnUrl,
            }
        }

        // MASTER_CARD_MERCHANT_ID
        // MASTER_CARD_API_PASSWORD


        const authString = `merchant.${process.env.MASTER_CARD_MERCHANT_ID}:${process.env.MASTER_CARD_API_PASSWORD}`;

        const authHeader = `Basic ${Buffer.from(authString).toString("base64")}`;
        // https://test-gateway

        const response = await axios.post(`https://test-gateway.mastercard.com/api/rest/version/65/merchant/${process.env.MASTER_CARD_MERCHANT_ID}/session`, payload , {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });


        const sessionData = response.data;

        console.log("session data", sessionData);

        // model 

        // ordrId, session, sessionIdicator

        return NextResponse.json({session: {id: sessionData.session.id}})
        
    } catch (error) {
        // @ts-ignore
        console.error('Error creating checkout session:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest){



    try {
        const { resultIndicator } = req.query;
    
        // Find the order using the result indicator and orderId
        const order = await Orders.findOne({ resultIndicator });
    
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        if (order.masterCardStatus === 'CAPTURED' || order.status === 'Completed') {
          return res.json({ success: false, message: 'Payment already captured' });
        }


        const authString = `merchant.${process.env.MASTER_CARD_MERCHANT_ID}:${process.env.MASTER_CARD_API_PASSWORD}`;
        const authHeader = `Basic ${Buffer.from(authString).toString('base64')}`;
        // Make a request to get the order info
        const response = await axios.get(
          `https://test-gateway.mastercard.com/api/rest/version/65/merchant/${process.env.MASTER_CARD_MERCHANT_ID}/order/${order.orderId}`,
          {
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
          }
        );
    
        const orderInfo = response.data;
    
        if (orderInfo.status === 'CAPTURED') {
          order.masterCardStatus = 'CAPTURED';
          order.phone = "";
          order.status = 'Completed';
          await order.save();
    
    
          return res.json({ success: true, message: 'Payment captured successfully' });
        }
    
     
        return res.json({ success: false, message: 'Payment not captured', orderInfo });
      } catch (error) {
        console.error('Error confirming payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}