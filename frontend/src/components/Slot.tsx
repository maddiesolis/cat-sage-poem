import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SlotProps } from "./Page";

interface SlotComponentProps {
    slot: SlotProps
}
export const SlotComponent: React.FC<SlotComponentProps> = ({ slot }) => {
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
        <Text h='60px' fontSize='x-large' color='#F4F1BB'>
            {slot.constantText} {displayedText}
        </Text>
    );
};