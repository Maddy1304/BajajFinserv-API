// Test file to verify API functionality
const testCases = [
    {
        name: "Example A",
        input: ["a","1","334","4","R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            special_characters: ["$"],
            sum: "339"
        }
    },
    {
        name: "Example B", 
        input: ["2","a", "y", "4", "&", "-", "*", "5","92","b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A","Y","B"],
            special_characters: ["&", "-", "*"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        input: ["A","ABcD","DOE"],
        expected: {
            alphabets: ["A","ABCD","DOE"],
            sum: "0"
        }
    }
];

function runTests() {
    console.log("Testing API logic locally...\n");
    
    testCases.forEach((testCase, index) => {
        console.log(`Test ${index + 1}: ${testCase.name}`);
        console.log(`Input: ${JSON.stringify(testCase.input)}`);
        
        
        const result = processData(testCase.input);
        console.log(`Output: ${JSON.stringify(result, null, 2)}\n`);
    });
}


function processData(data) {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    function isNumber(str) {
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    function isAlphabet(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    function isSpecialCharacter(str) {
        return str.length === 1 && !isNumber(str) && !isAlphabet(str);
    }

    
    data.forEach(item => {
        const str = String(item);
        
        if (isNumber(str)) {
            
            const num = parseInt(str);
            sum += num;
            
            if (num % 2 === 0) {
                evenNumbers.push(str);
            } else {
                oddNumbers.push(str);
            }
        } else if (isAlphabet(str)) {
            // Handle alphabetic strings
            alphabets.push(str.toUpperCase());
        } else if (isSpecialCharacter(str)) {
            // Handle special characters
            specialCharacters.push(str);
        }
    });

    // Create concatenation string
    function createConcatString(alphabets) {
        if (alphabets.length === 0) return "";
        
        const allChars = alphabets.join('').split('').reverse();
        let result = "";
        for (let i = 0; i < allChars.length; i++) {
            if (i % 2 === 0) {
                result += allChars[i].toUpperCase();
            } else {
                result += allChars[i].toLowerCase();
            }
        }
        return result;
    }

    const concatString = createConcatString(alphabets);

    return {
        is_success: true,
        user_id: "amar_madrewar_13112004", 
        email: "amar.madrewar2022@vitstudent.ac.in", 
        roll_number: "22BCE0827", 
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(),
        concat_string: concatString
    };
}


if (require.main === module) {
    runTests();
}