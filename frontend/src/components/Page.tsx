import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { SlotComponent } from './Slot';

export interface SlotProps {
    id: number;
    constantText: string;
    changingTextOptions: string[];
    selectedOption: string;
}

export const Page = () => {
    // Poetry lines (slots)
    const [slots, setSlots] = useState<SlotProps[]>([
        { id: 1, constantText: 'This will', changingTextOptions: ['change', 'not change'], selectedOption: 'change' },
        { id: 2, constantText: 'Clover is', changingTextOptions: ['cute', 'small', 'black'], selectedOption: 'cute' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Select random slot to update
            const newSlots = slots.map((slot, index) => {
                // Clone slot to avoid direct mutation
                const newSlot = { ...slot };
                // Randomly update one slot's selectedOption
                if (Math.floor(Math.random() * slots.length) === index) {
                    const optionIndex = Math.floor(Math.random() * slot.changingTextOptions.length);
                    newSlot.selectedOption = slot.changingTextOptions[optionIndex];
                }
                return newSlot;
            });
            // Update state of slots
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