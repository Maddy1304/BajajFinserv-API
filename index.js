const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const USER_INFO = {
    full_name: "amar_madrewar", 
    birth_date: "13112004",
    email: "amar.madrewar2022@vitstudent.ac.in", 
    roll_number: "22BCE0827" 
};

// Helper function to check if a string represents a valid number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a string is entirely alphabetic
function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

// Helper function to check if a string is a special character
function isSpecialCharacter(str) {
    return str.length === 1 && !isNumber(str) && !isAlphabet(str);
}

// Helper function to process concatenation string
function createConcatString(alphabets) {
    if (alphabets.length === 0) return "";
    
    // Join all alphabets and reverse
    const allChars = alphabets.join('').split('').reverse();
    
    // Apply alternating caps (starting with uppercase)
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

// Main API endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' should be an array"
            });
        }

        // Initialize arrays
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        // Process each element in the data array
        data.forEach(item => {
            const str = String(item);
            
            if (isNumber(str)) {
                // Handle numbers
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
        const concatString = createConcatString(alphabets);

        // Create response
        const response = {
            is_success: true,
            user_id: `${USER_INFO.full_name}_${USER_INFO.birth_date}`,
            email: USER_INFO.email,
            roll_number: USER_INFO.roll_number,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET endpoint for testing
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "VIT Full Stack API is running!",
        endpoints: {
            "POST /bfhl": "Main API endpoint",
            "GET /bfhl": "Returns operation code"
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;