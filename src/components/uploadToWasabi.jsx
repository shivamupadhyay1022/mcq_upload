import AWS from 'aws-sdk';

const uploadToWasabi = async (file) => {

  const access_key= "S0P7Y5BIZCESVVUDSLF1"
    const secret_key= "27tQIQ3CplvhDBoQ8hczVg8l33c9A9oVjBoA1FN3"
    const WASABI_BUCKET_NAME = "mcqupload";
    const WASABI_REGION = "ap-southeast-1"; // Use your bucket's region
    const WASABI_ENDPOINT = new AWS.Endpoint('s3.ap-southeast-1.wasabisys.com');
  
    const s3 = new AWS.S3({
      accessKeyId: access_key,
      secretAccessKey: secret_key,
      endpoint: WASABI_ENDPOINT,
      region: WASABI_REGION,
    });
    
  try {
    const params = {
      Bucket: WASABI_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type,
    };

    const data = await s3.upload(params).promise();
    console.log("Uploaded successfully:", data.Location);
    return data.Location;  // URL for accessing the file
  } catch (error) {
    console.error("Error uploading to Wasabi:", error);
    return null;
  }
};

export default uploadToWasabi;
