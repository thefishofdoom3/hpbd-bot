require("dotenv").config();
const input = process.argv[2];
const [spreadsheetId, sheetName, rangeName] = input
  .split(" - ")
  .filter((value) => value.trim());
async function checkBirthdays() {
  const apiKey = process.env.SHEET_API_KEY;

  // Set the API endpoint URL
//   const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${rangeName}?key=${apiKey}`;
const apiUrl = 'https://docs.google.com/spreadsheets/d/1jxzMQBfLAFOsu2Y_0tChpiSNfSsL7sc5jIR41ghdPQQ/'

  // Send a GET request to the API to retrieve the data from the sheet
  const response = await fetch(apiUrl);
  console.log({ response });

  // Check the status of the response to make sure it was successful
  if (response.ok) {
    // Get the data from the response as a JSON object
    const data: any = await response.json();

    // Get the current date
    const today = new Date().toISOString().slice(0, 10);

    // Loop through each row in the sheet
    for (const row of data.values) {
      // Get the name and birthday of the friend from the row
      const name = row[0];
      const birthday = row[1];

      // Check if the birthday is today
      if (birthday === today) {
        // Send a message to wish the friend a happy birthday
        await sendMessage(`Happy birthday, ${name}!`);
      }
    }
  } else {
    // There was an error with the request, so print the status code
    console.error(response.status);
  }
}

async function sendMessage(employee_code: string) {
  // Set the API endpoint URL and the message to send
  const apiUrl = "https://openapi.seatalk.io/messaging/v2/single_chat";
  const message = {
    tag: "",
    markdown: {
      content:
        'This is a Markdown msg.\n\nYou should see:\n\n1. __bold__\n\n2. *Italics*\n\n- List item 1\n\n- List item 2',
    },
  };
  const data = { employee_code, message };

  // Set the API key and any other necessary headers or parameters
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SEA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Send the message through the API
  const response = await fetch(apiUrl, options);

  // Print the status code of the response
  console.log(response.status);
}

// Call the checkBirthdays function
checkBirthdays();
