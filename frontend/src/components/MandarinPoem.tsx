import { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@chakra-ui/react';
import { mandarinPoem } from '../data/poems';
import { DynamicPoemLine } from './DynamicPoemLine';

export interface PoemLineProps {
    id: number;
    constantText: string;
    changingTextOptions: string[];
    selectedOption: string;
}

export const MandarinPoem: React.FC = () => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');
    const [isSmallerThan325] = useMediaQuery('(max-width: 325px)');
    const [currentPoem, setCurrentPoem] = useState<PoemLineProps[]>(mandarinPoem);

    // Randomly update lines within poem
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly update state of slots
            const randomSlotIndex = Math.floor(Math.random() * currentPoem.length);
            const newSlots = currentPoem.map((slot, index) => {
                // Clone slot to avoid direct mutation
                const newSlot = { ...slot };
                // Update slot's selectedOption if it matches randomSlotIndex
                if (randomSlotIndex === index) {
                    const optionIndex = Math.floor(Math.random() * slot.changingTextOptions.length);
                    newSlot.selectedOption = slot.changingTextOptions[optionIndex];
                }
                return newSlot;
            });
            setCurrentPoem(newSlots);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentPoem]);

    return (
        <Box
            h='100vh'
            bg='#121415'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            color='white'
        >
            <>
            {isLargerThan800 && (
                <Box h='fit-content' w='600px'>
                    {currentPoem.map(slot => (
                        <DynamicPoemLine key={slot.id} text={slot} interval={115}/>
                    ))}
                </Box>
            )}
            {!isLargerThan800 && !isSmallerThan450 && (
                <Box h='fit-content' w='400px'>
                    {currentPoem.map(slot => (
                        <DynamicPoemLine key={slot.id} text={slot} interval={115}/>
                    ))}
                </Box>
            )} 
            {isSmallerThan450 && !isSmallerThan325 && (
                <Box h='fit-content' w='350px'>
                    {currentPoem.map(slot => (
                        <DynamicPoemLine key={slot.id} text={slot} interval={115}/>
                    ))}
                </Box>
            )}  
            {isSmallerThan325 && (
                <Box h='fit-content' w='250px'>
                    {currentPoem.map(slot => (
                        <DynamicPoemLine key={slot.id} text={slot} interval={115}/>
                    ))}
                </Box>
            )}  
            </>
        </Box>
    );
};