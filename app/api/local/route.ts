import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {


    const body = await request.json();

    try {
        
        // if(body.operator === "ebir"){

        // }else{

        // }

        const paymentBody = {
            schemaVersion: "1.0",
            requestId: "10111331033",
            timestamp: Date.now(),
            channelName: "WEB",
            serviceName: "API_PURCHASE",
            serviceParams: {
              merchantUid: process.env.MERCHANT_U_ID,
              apiUserId: process.env.MERCHANT_API_USER_ID,
              apiKey: process.env.MERCHANT_API_KEY,
              paymentMethod: "mwallet_account",
              payerInfo: {
                accountNo: body.phone,
              },
              transactionInfo: {
                referenceId: "12334",
                invoiceId: "7896504",
                amount: body.amount,
                // currency: "ETB", // ebir
                currency: "USD",
                description: "Product details",
              },
            },
          };

        //   ebir apiurl => https://payments.ebirr.com/asm
          const response = await axios.post(`https://api.waafipay.net/asm`,paymentBody)

          console.log("response", response.data);

          return NextResponse.json(response.data)

    } catch (error) {
        console.log("error at waafi", error);
    }
}