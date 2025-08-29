const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const USER_INFO = {
    user_id: "amar_madrewar_13112004", // Replace with your user_id in format: fullname_ddmmyyyy
    email: "amar.madrewar2022@vitstudent.ac.in", // Replace with your email
    roll_number: "22BCE0827" // Replace with your college roll number
};


function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}


function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}


function isSpecialCharacter(str) {
    return str.length === 1 && !isNumber(str) && !isAlphabet(str);
}


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

        
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;

        
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

        const concatString = createConcatString(alphabets);

        
        const response = {
            is_success: true,
            user_id: USER_INFO.user_id,
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


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});


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