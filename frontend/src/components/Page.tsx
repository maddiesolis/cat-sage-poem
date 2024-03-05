import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { SlotComponent } from './Slot';
import { poetrySlots } from '../data/slots';

export interface SlotProps {
    id: number;
    constantText: string;
    changingTextOptions: string[];
    selectedOption: string;
}

export const Page = () => {
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
        }, 5000);

        return () => clearInterval(interval);
    }, [slots]);

    return (
        <Box
            h='100vh'
            bg='black'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            color='white'
        >
            {slots.map(slot => (
                <SlotComponent key={slot.id} slot={slot} />
            ))}
        </Box>
    );
};