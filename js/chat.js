export function chatFunction(transcribedText) {

    const openaiEndpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const openaiApiKey = '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';

    const input = 'Translate the following English text to French: Good morning, how are you?';

    fetch(openaiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
            prompt: input,
            temperature: 0.7,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        const output = data.choices[0].text.trim();
        console.log(output); // Handle the output as per your requirements
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
