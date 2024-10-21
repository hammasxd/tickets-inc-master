'use client'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { pinata } from "@/utils/config";
import { useSendAndConfirmTransaction } from 'thirdweb/react';
import { prepareContractCall, PreparedTransaction, toTokens, toUnits } from 'thirdweb';
import { getTicketsContractByAddress } from '@/utils/contracts';
import { ticketsContract } from '@/utils/contractsUrl';


function CreateTicketPage() {
    const [eventName, setEventName] = React.useState('')
    const [eventSymbol, setEventSymbol] = React.useState('')
    const [eventDescription, setEventDescription] = React.useState('')
    const [ticketPrice,setTicketPrice]=React.useState(0)
    const [eventImage,setEventImage]=React.useState<File>()
    const [availableTickets,setAvailableTickets]=React.useState(0)
    const [uploading, setUploading] = React.useState(false);
    const {mutateAsync:sendCreateEventTransaction,isPending:createEventPending}= useSendAndConfirmTransaction()


    const uploadImage = async () => {
        if (!eventImage) {
          alert("No file selected");
          return;
        }
        try {
          const keyRequest = await fetch("/api/key");
			const keyData = await keyRequest.json();
			const upload = await pinata.upload.file(eventImage).key(keyData.JWT);
			const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
         
          return ipfsUrl
        } catch (e) {
          console.log(e);
          setUploading(false);
          alert("Trouble uploading file");
        }
      };

      const uploadMetaData = async (uriObject:any) => {
        if (!eventImage) {
          alert("No file selected");
          return;
        }
    
        try {
          const jsonString = JSON.stringify(uriObject);
          const keyRequest = await fetch("/api/key");
          const blob = new Blob([jsonString], { type: "application/json" });
            const metadataFile = new File([blob], `metadata-${Date.now()}.json`, { type: "application/json" });
			const keyData = await keyRequest.json();
			const upload = await pinata.upload.file(metadataFile).key(keyData.JWT);
			const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
          
          return ipfsUrl;
        } catch (e) {
          console.log(e);
          setUploading(false);
          alert("Trouble uploading file");
        }
      };
      const pinToPinata = async () => {
        if(!eventName || !eventSymbol || !eventDescription || !ticketPrice || !eventImage || !availableTickets){
            alert('Please fill all fields')
            return
        }
        try{
            setUploading(true)
            const imageUrl = await uploadImage();
            const uriObject = {
                name:eventName,
                description:eventDescription,
                image:imageUrl,
                symbol:eventSymbol,
            }
            const url =await uploadMetaData(uriObject)
            const priceInWei = toUnits(String(ticketPrice),18)
            try{
                if(url){
                    const transaction = prepareContractCall({
                        contract:getTicketsContractByAddress(ticketsContract),
                        method:'createEvent',
                        params:[eventName,eventSymbol,url,priceInWei,BigInt(availableTickets)]
                    })
                    await sendCreateEventTransaction(transaction as PreparedTransaction,{
                        onSuccess(data,variable,context){
                           
                            alert('Event created successfully')
                        }
                    })
                }
                setUploading(false)
            }
            catch(e){
                console.log(e)
                setUploading(false)
                alert('Error creating event')
            }
            
            

        }
        catch(e){
            console.log(e)
            alert('Error uploading to pinata')
        }
      }
      


  return (
    <div className='flex flex-col mt-20'>
        <h1 className=' text-3xl font-bold'>Create Event</h1>
        <div className='flex flex-col mt-10 w-1/2 gap-5'>
            <Input type='text' color='primary' title='Event Name' placeholder='Enter Event Name'  label='Event Name'
            variant='bordered'
            onChange={(e) => setEventName(e.target.value)}
            />
            <Input type='text' color='primary' title='Event Symbol' placeholder='Enter Event Symbol'  label='Event Symbol'
            variant='bordered'
            onChange={(e) => setEventSymbol(e.target.value)}
            />
            <Input type='text' color='primary' title='Event Description' placeholder='Enter Event Description'  label='Event Description'
            variant='bordered'
            onChange={(e) => setEventDescription(e.target.value)}
            />
            <Input type='number' endContent={<h1 className='text-primary font-bold text-xs'>MATIC</h1>} color='primary' title='Event Price' placeholder='Enter Event Price'  label='Event Price'
            variant='bordered'
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            />
            <Input type='file' color='primary' title='Event Image' placeholder='Enter Event Image'  label='Event Image'
            variant='bordered'
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setEventImage(e.target.files[0]);
                }
            }}
            />
            <Input type='number' color='primary' title='Available Tickets' placeholder='Enter Available Tickets'  label='Available Tickets'
            variant='bordered'
            onChange={(e) => setAvailableTickets(Number(e.target.value))}
            />
            <Button 
            onClick={async ()=>await pinToPinata()}
            isLoading={uploading}
            > Create Event</Button>

            

        </div>
    </div>
  )
}

export default CreateTicketPage