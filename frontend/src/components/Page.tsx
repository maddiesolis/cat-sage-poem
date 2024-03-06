import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@chakra-ui/react';
import { SlotComponent } from './Slot';
import { poetrySlots } from '../data/slots';

export interface SlotProps {
    id: number;
    constantText: string;
    changingTextOptions: string[];
    selectedOption: string;
}

export const Page = () => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');
    const [isSmallerThan325] = useMediaQuery('(max-width: 325px)');

    // Poetry lines (slots)
    const [slots, setSlots] = useState<SlotProps[]>(poetrySlots);
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly update state of slots
            const randomSlotIndex = Math.floor(Math.random() * slots.length);
            const newSlots = slots.map((slot, index) => {
                // Clone slot to avoid direct mutation
                const newSlot = { ...slot };
                // Update slot's selectedOption if it matches randomSlotIndex
                if (randomSlotIndex === index) {
                    const optionIndex = Math.floor(Math.random() * slot.changingTextOptions.length);
                    newSlot.selectedOption = slot.changingTextOptions[optionIndex];
                }
                return newSlot;
            });
            setSlots(newSlots);
        }, 3000);

        return () => clearInterval(interval);
    }, [slots]);

    return (
        <>
            {isLargerThan800 && (
                <Box
                    h='100vh'
                    bg='#121415'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    color='white'
                >
                    <Box h='fit-content' w='600px'>
                        {slots.map(slot => (
                            <SlotComponent key={slot.id} slot={slot} />
                        ))}
                    </Box>
                </Box>
            )}
            {!isLargerThan800 && !isSmallerThan450 && (
                <Box
                    h='100vh'
                    bg='#121415'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    color='white'
                >
                    <Box h='fit-content' w='400px'>
                        {slots.map(slot => (
                            <SlotComponent key={slot.id} slot={slot} />
                        ))}
                    </Box>
                </Box>
            )} 
            {isSmallerThan450 && !isSmallerThan325 && (
                <Box
                    h='100vh'
                    bg='#121415'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    color='white'
                >
                    <Box h='fit-content' w='350px'>
                        {slots.map(slot => (
                            <SlotComponent key={slot.id} slot={slot} />
                        ))}
                    </Box>
                </Box>
            )}  
            {isSmallerThan325 && (
                <Box
                    h='100vh'
                    bg='#121415'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    color='white'
                >
                    <Box h='fit-content' w='250px'>
                        {slots.map(slot => (
                            <SlotComponent key={slot.id} slot={slot} />
                        ))}
                    </Box>
                </Box>
            )}  
        </>
    );
};