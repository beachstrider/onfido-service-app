import { Onfido, Region, Applicant, OnfidoApiError } from "@onfido/api";

export async function init(req, res) {
  try {
    const onfido = new Onfido({
      apiToken: process.env.ONFIDO_API_TOKEN,
      region: Region.US
    });

    const applicant = await onfido.applicant.create({
      firstName: "Jane",
      lastName: "Doe"
    });

    const generateSdkToken = await onfido.sdkToken.generate({
      applicantId: applicant.id,
      referrer: "https://*.example.com/example_page/**"
    });

    res.json({
      sdk_token: generateSdkToken
    });
    
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
