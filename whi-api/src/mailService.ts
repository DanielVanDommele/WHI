import { MessageClient } from "cloudmailin"

const USER_NAME = "1aec506dea731b2f";
const API_KEY = "jNBfEiU1v1NnLetm7rLZfDf9";

export default async function sendMail (to: string, subject: string, html: string) {
    const client = new MessageClient({ username: USER_NAME, apiKey: API_KEY});
    const response = await client.sendMessage({
        to: to,
        from: "noreply@whi.net",
        html:  html,
        subject: subject
    });
}