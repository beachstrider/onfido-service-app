import { Onfido, Region, Applicant, OnfidoApiError } from "@onfido/api";

export async function init(req, res) {
  try {
    const onfido = new Onfido({
      apiToken: process.env.ONFIDO_API_TOKEN,
      region: Region.US
    });

    console.log('here', onfido);
  } catch (error) {
    if (error instanceof OnfidoApiError) {
      console.log(error.message);
      console.log(error.type);
      console.log(error.isClientError());
    } else {
      console.log(error.message);
    }
  }
  
  res.send('onfi....');
}
