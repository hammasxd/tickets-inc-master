'use client'
import { getTicketsContractByAddress } from '@/utils/contracts'
import { ticketsContract } from '@/utils/contractsUrl'
import React, { useEffect, useState } from 'react'
import { readContract, toTokens } from 'thirdweb'
import { useReadContract } from 'thirdweb/react'
import EventCard from './EventCard'

function AvailableEvents() {
    const [events, setEvents] = useState<any[]>([])
    const [reload, setReload] = useState(false)
    const getContractValues = async () => {
        let i = 0
        let fetchedEvents: any[] = [] // Temporary array to store fetched events
        
        while (true) {
            const event = await readContract({
                contract: getTicketsContractByAddress(ticketsContract),
                method: 'eventsWithId',
                params: [BigInt(i)]
            })
            
            // Check if the value at index 2 of the event is 0 (stop condition)
            if (Number(toTokens(event[2], 18)) === 0) {
                break
            }
            
            // Add the event to the local array
            fetchedEvents.push(event)
            console.log('fetcted event :',fetchedEvents)
            i++
        }

        // Update the state after fetching all events
        setEvents(fetchedEvents)
    }

    useEffect(() => {
        getContractValues()
        console.log("available events : ",events)
    }, [reload])

    return ( 
        <div className='flex flex-col gap-10 w-full mt-10'>
            <h1 className='font-bold text-2xl'>Available Events</h1>
            <div className='flex flex-col w-full'>
                <div className='flex flex-wrap gap-10'>
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} reload={reload} setReload={setReload}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AvailableEvents
