import { getBirthdayCustomerCode } from "./authorize";
require("dotenv").config();
const input = process.argv[2];

async function sendMessage(employee: { code: string; name: string }) {
  // Set the API endpoint URL and the message to send
  const apiUrl =
    "https://openapi.seatalk.io/messaging/v2/service_notice/send_message";
  const interactive_message = {
    default: {
      elements: [
        {
          element_type: "title",
          title: {
            text: `Happy birthday ${employee.name}`,
          },
        },
        {
          element_type: "description",
          description: {
            text: "You have a mail at the office lobby pending for collection. Please visit the lobby during the office hours to collect it.",
          },
        },
        {
          element_type: "button",
          button: {
            button_type: "redirect",
            text: "View details",
            mobile_link: {
              type: "web",
              path: "https://webApp.com/somePath",
            },
            desktop_link: {
              type: "web",
              path: "https://webApp.com/somePath",
            },
          },
        },
        {
          element_type: "button",
          button: {
            button_type: "callback",
            text: "I have collected it",
            value: "collected",
          },
        },
      ],
    },
    "zh-Hans": {
      elements: [
        {
          element_type: "title",
          title: {
            text: "待取信件",
          },
        },
        {
          element_type: "description",
          description: {
            text: "你有一封待取的信件，请在办公时间段前往大厅领取。",
          },
        },
        {
          element_type: "button",
          button: {
            button_type: "redirect",
            text: "查看详情",
            mobile_link: {
              type: "web",
              path: "https://webApp.com/somePath",
            },
            desktop_link: {
              type: "web",
              path: "https://webApp.com/somePath",
            },
          },
        },
        {
          element_type: "button",
          button: {
            button_type: "callback",
            text: "我已取件",
            value: "collected",
          },
        },
      ],
    },
  };
  const data = {
    employee_codes: [employee.code],
    interactive_message,
    tag: "interactive_message",
  };

  // Set the API key and any other necessary headers or parameters
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SEA_API_KEY}`,
      "Content-Type": "application/json",
      default_language: "en",
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
      return sendMessage(employee);
    })
  );
}

main();
