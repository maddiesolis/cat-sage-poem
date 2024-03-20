import { Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PoemLineProps } from "./EnglishPoem";

interface DynamicPoemLineProps {
    text: PoemLineProps
}
export const EnglishPoemLine: React.FC<DynamicPoemLineProps> = ({ text }) => {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');
    const [isSmallerThan325] = useMediaQuery('(max-width: 325px)');

    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let currentText = '';
        const maxIndex = text.selectedOption.length;
        // Reveal text letter by letter
        const revealText = (index: number) => {
            if (index <= maxIndex) {
                currentText = text.selectedOption.substring(0, index);
                setDisplayedText(currentText);
                setTimeout(() => revealText(index + 1), 75);
            }
        };
        revealText(0);
    }, [text.selectedOption]);

    return (
        <>
            {isLargerThan800 && (
                <Text h='60px' fontSize='x-large' color='#F4F1BB'>
                    {text.constantText} {displayedText}
                </Text>
            )}
            {!isLargerThan800 && !isSmallerThan450 && (
                <Text h='40px' fontSize='m' color='#F4F1BB'>
                    {text.constantText} {displayedText}
                </Text>
            )}
            {isSmallerThan450 && !isSmallerThan325 && (
                <Text h='30px' fontSize='small' color='#F4F1BB'>
                    {text.constantText} {displayedText}
                </Text>
            )}
            {isSmallerThan325 && (
                <Text h='25px' fontSize='x-small' color='#F4F1BB'>
                    {text.constantText} {displayedText}
                </Text>
            )}
        </>
    );
};