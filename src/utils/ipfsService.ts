
import axios from 'axios';

const pinataApiKey = process.env.PINATA_IPFS_API_KEY;
const pinataSecretApiKey = process.env.PINATA_IPFS_API_SECRET;

export const uploadToIPFS = async (file:any) => {
   
  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name
  });
  formData.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0
  });
  formData.append('pinataOptions', options);

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (json:any) => {
  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', json, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    });

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};
