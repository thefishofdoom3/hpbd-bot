import { getBirthdayCustomerCode } from "./authorize";
require("dotenv").config();
const input = process.argv[2];

async function sendMessage(employee_code: string) {
  // Set the API endpoint URL and the message to send
  const apiUrl = "https://openapi.seatalk.io/messaging/v2/single_chat";
  const message = {
    tag: "",
    markdown: {
      content:
        "This is a Markdown msg.\n\nYou should see:\n\n1. __bold__\n\n2. *Italics*\n\n- List item 1\n\n- List item 2",
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

async function main() {
  const employeeList = await getBirthdayCustomerCode();
  await Promise.all(
    employeeList.map((employee) => {
      return sendMessage(employee.code);
    })
  );
}

main();
