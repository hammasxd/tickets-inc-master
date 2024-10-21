import React, { useEffect } from 'react'
import { Button, Image, Snippet } from '@nextui-org/react'
import { prepareContractCall, PreparedTransaction, toTokens } from 'thirdweb'
import { useActiveAccount, useSendAndConfirmTransaction, useWalletBalance } from 'thirdweb/react'
import ConnectWallet from './ConnectWallet'
import { polygonAmoy } from 'thirdweb/chains'
import { thirdWebClient } from '@/app/layout'
import { getTicketsContractByAddress } from '@/utils/contracts'
import { ticketsContract } from '@/utils/contractsUrl'
export type Event = [
    string,
    string,
    bigint,
    number,
    number,
    string
]
export type EventData = {
    name:string,
    description:string,
    image:string,
    symbol:string
}
   
function EventCard({event,reload,setReload}:{event:Event,reload:boolean,setReload:any}) {
    const [eventDetails, setEventDetails] = React.useState<EventData>()
    const activeAccount=useActiveAccount()
    const {data:balance} = useWalletBalance({
        chain:polygonAmoy,
        client:thirdWebClient,
        address:activeAccount?.address
    })
    const {mutateAsync:sendBuyTransaction,isPending:buyTransactionPending}=useSendAndConfirmTransaction()
    //get json object from uri and get name,description,image(image link),symbol from uri
    const getEventDetails = async (uri:string) => {
        const response = await fetch(uri);
        const data = await response.json();
        setEventDetails(data);
        return data;
    }
    const buyTicket = async () => {
        try{

            const contract = getTicketsContractByAddress(ticketsContract)
            const preparedTransaction = prepareContractCall({
                contract,
                method: 'buyTicket',
                value: event[2],
                params: [String(eventDetails?.name)],
            })
            await sendBuyTransaction(preparedTransaction as PreparedTransaction,{
                onSuccess(data,variables,context){
                    alert('Ticket bought successfully')
                    setReload(!reload)
                }
                
            })
        }
        catch(e){
            alert('Error buying ticket')
        }
       
    }
    useEffect(() => {
        getEventDetails(event[1])
    }, [])

  return (
    <div className='w-72 flex flex-col rounded-2xl relative border border-primary cursor-pointer hover:shadow-xl hover:shadow-primary hover:-translate-y-3 transition-all'>
        <Image
        src={eventDetails?.image}
        classNames={{
            img:'w-72 h-[400px]'
        }}
        className='w-full rounded-2xl'
        />
        <div className='flex flex-col p-5 w-[285] rounded-2xl absolute z-10 items-start gap-2 align-middle justify-start opacity-0 hover:opacity-100 hover:bg-black/80 hover:backdrop-blur h-full transition-all'>
            <h1 className='font-bold text-primary text-2xl'>{eventDetails?.name}</h1>
            <p className=' text-xs '>{eventDetails?.description}</p>
            <div className='grid grid-cols-2 justify-center w-full gap-3'>
                    <div className=''>
                        <h1  className='font-bold text-primary text-sm'>Symbol</h1>
                        <p className=' text-xs'>{eventDetails?.symbol}</p>
                    </div>
                    <div>
                        <h1 className='font-bold text-primary text-sm'>Price</h1>
                        <p className=' text-xs'>{toTokens(event[2],18)} MATIC</p>
                    </div>
                    <div>
                        <h1 className='font-bold text-primary text-sm'>Total Tickets</h1>
                        <p className=' text-xs'>{String(event[3])}</p>
                    </div>
                    <div>
                        <h1 className='font-bold text-primary text-sm'>Sold Tickets</h1>
                        <p className='text-xs'>{String(event[4])}</p>
                    </div>
            </div>
            <div className=' flex flex-col gap-1'>
                <div className=' flex flex-col gap-0'>
                <h1 className='text-sm'>Contract Address</h1>
                <Snippet codeString={event[0]}  size='sm'>{event[0].slice(0,4)+'...'+event[0].slice(39)}</Snippet>
                </div>
                <div className=' flex flex-col gap-0'>
                    <h1 className='text-sm'>Owner</h1>
                    <Snippet codeString={event[5]}  size='sm'>{event[5].slice(0,4)+'...'+event[5].slice(39)}</Snippet>
                </div>
            </div>
            {
                activeAccount?.address ? 
                    event[4] < event[3] ?
                    (
                        Number(balance?.displayValue) > Number(toTokens(event[2],18)) ? 
                        <Button color='primary' fullWidth isLoading={buyTransactionPending} onClick={async ()=>{
                            await buyTicket()
                        }} >Buy Ticket</Button>
                        :
                        <Button disabled color='warning' isDisabled fullWidth >Insufficient Balance</Button>
                    )
                    :
                    (
                        <Button disabled color='warning' isDisabled fullWidth >Sold Out</Button>
                    )

                
                :
                <Button color='danger' disabled isDisabled fullWidth>Not Connected</Button>
                
            }
            
            </div>
    </div>
  )
}

export default EventCard