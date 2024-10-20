const projectId = 'YOUR_PROJECT_ID';
const sessionId= 'YOUR_SESSION_ID';
const languageCode = 'en-US';
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();
async function detectIntent(queryText) {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
    },
    },
    };
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
}
document.getElementById('chatbot-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userInput = event.target.value.toLowerCase();
        if (userInput.includes("weather")) {
            
            const city = document.getElementById('city-input').value || "default city";
            fetchWeatherData(city); 
        } else {
            displayChatbotResponse("I am currently able to answer weather-related queries.");
        }
        event.target.value = '';
    }
});
function displayChatbotResponse(response) {
    const chatbotResponse = document.createElement('div');
    chatbotResponse.className = 'chatbot-response';
    chatbotResponse.textContent = response;
    document.getElementById('chatbot-messages').appendChild(chatbotResponse);
}
