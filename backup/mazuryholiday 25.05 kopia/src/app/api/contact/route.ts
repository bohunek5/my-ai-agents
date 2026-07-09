import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Utwórz transporter używając danych SMTP z .env
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true dla portu 465, false dla innych (np. 587)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Opcje wiadomości e-mail
        const mailOptions = {
            from: process.env.SMTP_USER ? `"Formularz Mazury Holiday" <${process.env.SMTP_USER}>` : '"Mazury Holiday" <no-reply@mazury.holiday>',
            to: 'prezes@zeglarstwomazury.pl',
            replyTo: email,
            subject: `[Formularz Kontaktowy] ${subject || 'Nowa wiadomość'}`,
            text: `
Otrzymałeś nową wiadomość z formularza kontaktowego Mazury Holiday:

Imię i nazwisko: ${name}
Adres e-mail: ${email}
Numer telefonu: ${phone || 'Nie podano'}

Temat: ${subject}

Wiadomość:
${message}
            `,
            html: `
<h3>Otrzymałeś nową wiadomość z formularza kontaktowego Mazury Holiday</h3>
<p><strong>Imię i nazwisko:</strong> ${name}</p>
<p><strong>Adres e-mail:</strong> ${email}</p>
<p><strong>Numer telefonu:</strong> ${phone || 'Nie podano'}</p>
<p><strong>Temat:</strong> ${subject}</p>
<br/>
<p><strong>Wiadomość:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>
            `,
        };

        // Wyślij e-mail
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Wiadomość została wysłana pomyślnie' });
    } catch (error) {
        console.error('Błąd podczas wysyłania e-maila:', error);
        return NextResponse.json({ success: false, error: 'Nie udało się wysłać wiadomości' }, { status: 500 });
    }
}
