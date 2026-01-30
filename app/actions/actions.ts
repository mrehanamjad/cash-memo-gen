'use server'; // This marks the file as server-side only

import nodemailer from 'nodemailer';

type Item = {
    id: number;
    description: string;
    qty: number;
    price: number;
  };


// Define types here or import them
type EmailPayload = {
  customerName: string;
  customerEmail: string;
  items: Item[]; 
  receiptId: string;
  grandTotal: number;
  advance: number;
  balance: number;
};

export async function sendReceiptEmail(data: EmailPayload) {
  try {
   const { customerName, customerEmail, items, grandTotal, advance, balance, receiptId } = data

   const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or use process.env.SMTP_HOST
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    // Generate Rows
    const itemsHtml = items.map((item) => `
      <tr>
        <td class="row-item" style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
          ${item.description}
        </td>
        <td class="row-item" style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; text-align: center;">
          ${item.qty}
        </td>
        <td class="row-item" style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
          Rs. ${item.price.toLocaleString()}
        </td>
        <td class="row-total" style="padding: 16px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">
          Rs. ${(item.qty * item.price).toLocaleString()}
        </td>
      </tr>
    `).join('');

    // --- FINAL EMAIL TEMPLATE (No Button) ---
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>Receipt from ScrubX</title>
        <style>
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
          
          /* Base Defaults (Light Mode) */
          body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header-bg { background-color: #7f1d1d; /* Maroon Base */ }
          .header-text { color: #ffffff; }
          .header-sub { color: #fecaca; }
          .content-bg { background-color: #ffffff; }
          .text-main { color: #1f2937; }
          .text-muted { color: #6b7280; }
          .info-box { background-color: #f9fafb; border: 1px solid #e5e7eb; }
          .table-header { color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; padding-bottom: 10px; border-bottom: 2px solid #f3f4f6; }
          .row-item { color: #374151; font-size: 14px; }
          .row-total { color: #111827; font-size: 14px; }
          .highlight-text { color: #7f1d1d; } 
          .divider { border-top: 1px solid #e5e7eb; }
          .footer { background-color: #1f2937; color: #9ca3af; }

          /* --- DARK MODE OVERRIDES --- */
          @media (prefers-color-scheme: dark) {
            body { background-color: #000000 !important; }
            .container { background-color: #1a1a1a !important; box-shadow: none !important; border: 1px solid #333333; }
            
            .header-bg { background-color: #1a1a1a !important; border-bottom: 2px solid #551111 !important; } 
            .header-text { color: #ffffff !important; }
            .header-sub { color: #888888 !important; }
            
            .content-bg { background-color: #1a1a1a !important; }
            .text-main { color: #e5e5e5 !important; }
            .text-muted { color: #a3a3a3 !important; }
            
            .info-box { background-color: #262626 !important; border: 1px solid #333333 !important; }
            .table-header { color: #6b7280 !important; border-bottom: 2px solid #333333 !important; }
            .row-item { color: #d1d5db !important; border-bottom: 1px solid #333333 !important; }
            .row-total { color: #ffffff !important; border-bottom: 1px solid #333333 !important; }
            
            .highlight-text { color: #f87171 !important; } 
            .divider { border-top: 1px solid #333333 !important; }
            .footer { background-color: #000000 !important; color: #6b7280 !important; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="header-bg" style="padding: 40px 30px; text-align: center;">
            <h1 class="header-text" style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">ScrubX</h1>
            <p class="header-sub" style="margin: 5px 0 0; font-size: 13px; letter-spacing: 1.5px; font-weight: 500;">PREMIUM MEDICAL APPAREL</p>
          </div>

          <div class="content-bg" style="padding: 40px 30px;">
            <h2 class="text-main" style="margin-top: 0; font-size: 20px; font-weight: 600;">Receipt & Payment</h2>
            <p class="text-muted" style="line-height: 1.6; font-size: 15px; margin-bottom: 25px;">
              Hi ${customerName},<br>Thank you for choosing ScrubX. Here is the breakdown of your order.
            </p>

            <table class="info-box" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px; border-radius: 12px; margin-bottom: 30px;">
              <tr>
                <td width="50%" valign="top">
                  <div class="table-header" style="border: none; padding: 0; margin-bottom: 5px;">Receipt #</div>
                  <div class="text-main" style="font-size: 16px; font-weight: 700;">${receiptId}</div>
                </td>
                <td width="50%" valign="top" style="text-align: right;">
                  <div class="table-header" style="border: none; padding: 0; margin-bottom: 5px;">Date</div>
                  <div class="text-main" style="font-size: 16px; font-weight: 700;">${date}</div>
                </td>
              </tr>
            </table>

            <table width="100%" style="border-collapse: collapse; margin-bottom: 30px;">
              <thead>
                <tr>
                  <th align="left" class="table-header">Description</th>
                  <th align="center" class="table-header">Qty</th>
                  <th align="right" class="table-header">Price</th>
                  <th align="right" class="table-header">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="divider"></div>
            <table width="100%" style="margin-top: 20px;">
              <tr>
                <td class="text-muted" style="text-align: right; padding: 5px 0;">Total Amount:</td>
                <td class="text-main" style="text-align: right; font-weight: 600; padding: 5px 0; width: 120px;">Rs. ${grandTotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td class="text-muted" style="text-align: right; padding: 5px 0;">Advance Paid:</td>
                <td class="text-main" style="text-align: right; font-weight: 600; padding: 5px 0;">- Rs. ${advance.toLocaleString()}</td>
              </tr>
              <tr>
                <td class="highlight-text" style="text-align: right; padding-top: 15px; font-size: 13px; font-weight: 700; text-transform: uppercase;">Balance Due</td>
                <td class="highlight-text" style="text-align: right; padding-top: 15px; font-size: 24px; font-weight: 800;">Rs. ${balance.toLocaleString()}</td>
              </tr>
            </table>
            
            <div style="margin-top: 40px;"></div>

          </div>

          <div class="footer" style="padding: 30px; text-align: center; font-size: 12px;">
            <p style="margin: 0; opacity: 0.7;">&copy; ${new Date().getFullYear()} ScrubX Medical. All rights reserved.</p>
            <p style="margin: 5px 0 0; opacity: 0.5;">Karachi, Pakistan</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"ScrubX Orders" <orders@scrubx.com>',
      to: customerEmail,
      subject: `Receipt #${receiptId}`,
      html: emailHtml, // The HTML you already wrote
    });

    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to send email.' };
  }
}