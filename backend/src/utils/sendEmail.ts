import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || 'your-api-key',
    apiSecret: process.env.MAILJET_API_SECRET || 'your-api-secret'
});

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        const result = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.SENDER_EMAIL || 'noreply@taskflow.com',
                            Name: 'MiniTask App',
                        },
                        To: [
                            {
                                Email: options.email,
                            },
                        ],
                        Subject: options.subject,
                        TextPart: options.message,
                        HTMLPart: `<p>${options.message.replace(/\n/g, '<br>')}</p>`,
                    },
                ],
            });

        console.log('--- MAILJET RESPONSE ---');
        console.log(JSON.stringify(result.body, null, 2));
        console.log('------------------------');
    } catch (error) {
        console.error('Mailjet send error:', error);
        // Don't throw logic error to crash app, but maybe throw to controller to handle
        throw new Error('Email could not be sent');
    }
};

export default sendEmail;
