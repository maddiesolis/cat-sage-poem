import { Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SlotProps } from "./Page";

interface SlotComponentProps {
    slot: SlotProps
}
export const SlotComponent: React.FC<SlotComponentProps> = ({ slot }) => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');
    const [isSmallerThan325] = useMediaQuery('(max-width: 325px)');

    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let currentText = '';
        const maxIndex = slot.selectedOption.length;
        // Reveal text letter by letter
        const revealText = (index: number) => {
            if (index <= maxIndex) {
                currentText = slot.selectedOption.substring(0, index);
                setDisplayedText(currentText);
                setTimeout(() => revealText(index + 1), 75);
            }
        };
        revealText(0);
    }, [slot.selectedOption]);

    return (
        <>
            {isLargerThan800 && (
                <Text h='60px' fontSize='x-large' color='#F4F1BB'>
                    {slot.constantText} {displayedText}
                </Text>
            )}
            {!isLargerThan800 && !isSmallerThan450 && (
                <Text h='40px' fontSize='m' color='#F4F1BB'>
                    {slot.constantText} {displayedText}
                </Text>
            )}
            {isSmallerThan450 && !isSmallerThan325 && (
                <Text h='30px' fontSize='small' color='#F4F1BB'>
                    {slot.constantText} {displayedText}
                </Text>
            )}
            {isSmallerThan325 && (
                <Text h='25px' fontSize='x-small' color='#F4F1BB'>
                    {slot.constantText} {displayedText}
                </Text>
            )}
        </>
    );
};