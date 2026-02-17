const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static('../'));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Error with email configuration:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email address'
        });
    }

    // Prepare email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'katmelonashi@gmail.com',
        subject: `Contact Form: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #8b6d5b; border-bottom: 2px solid #8b6d5b; padding-bottom: 10px;">New Contact Form Submission</h2>

                <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 10px 0;"><strong>Message:</strong></p>
                        <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>

                <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                    This message was sent from your pottery studio website contact form.
                </p>
            </div>
        `,
        replyTo: email
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);

        console.log(`Email sent from ${name} (${email})`);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error: 'Failed to send email. Please try again later.'
        });
    }
});

// Orders storage file path
const ordersFile = path.join(__dirname, 'data', 'orders.json');

// Initialize orders file if it doesn't exist
async function initOrdersFile() {
    try {
        const dataDir = path.join(__dirname, 'data');
        // Create data directory if it doesn't exist
        try {
            await fs.access(dataDir);
        } catch {
            await fs.mkdir(dataDir, { recursive: true });
        }

        // Check if orders file exists
        try {
            await fs.access(ordersFile);
        } catch {
            // Create orders file with empty array
            await fs.writeFile(ordersFile, JSON.stringify({ orders: [] }, null, 2));
            console.log('Created orders.json file');
        }
    } catch (error) {
        console.error('Error initializing orders file:', error);
    }
}

// Initialize on startup
initOrdersFile();

// Orders endpoint
app.post('/api/orders', async (req, res) => {
    try {
        const orderData = req.body;

        // Validate order data
        if (!orderData.items || orderData.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        if (!orderData.customer || !orderData.customer.email) {
            return res.status(400).json({ error: 'Customer information is required' });
        }

        // Read existing orders
        const data = await fs.readFile(ordersFile, 'utf8');
        const orders = JSON.parse(data);

        // Add new order
        orders.orders.push(orderData);

        // Save updated orders
        await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

        console.log(`New order received: ${orderData.orderId}`);

        // Send email notifications
        try {
            await sendOrderEmails(orderData);
        } catch (emailError) {
            console.error('Error sending order emails:', emailError);
            // Don't fail the order if email fails
        }

        res.status(200).json({
            success: true,
            orderId: orderData.orderId
        });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ error: 'Failed to process order' });
    }
});

// Send order confirmation emails
async function sendOrderEmails(order) {
    const { customer, orderId, items, subtotal, createdAt } = order;
    const orderDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Customer confirmation email
    const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: `Order Confirmation - ${orderId}`,
        html: `
            <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F5F1E8; border-radius: 8px;">
                <h2 style="color: #6B4423; font-family: 'Georgia', serif; border-bottom: 2px solid #C4774C; padding-bottom: 10px;">
                    Thank You for Your Order!
                </h2>

                <div style="background-color: white; padding: 25px; border-radius: 5px; margin-top: 20px;">
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Hi ${customer.name},
                    </p>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Thank you for your order! Here are your order details:
                    </p>

                    <div style="background-color: #E8D5C4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderId}</p>
                        <p style="margin: 5px 0;"><strong>Order Date:</strong> ${orderDate}</p>
                    </div>

                    <h3 style="color: #6B4423; font-size: 18px; margin-top: 25px; margin-bottom: 15px;">Items Ordered:</h3>
                    ${items.map(item => `
                        <div style="border-bottom: 1px solid #E8D5C4; padding: 10px 0;">
                            <p style="margin: 5px 0; font-size: 16px;">
                                <strong>${item.title}</strong> × ${item.quantity}
                            </p>
                            <p style="margin: 5px 0; color: #C4774C; font-size: 14px;">
                                ${item.priceDisplay} each - Subtotal: $${item.price * item.quantity}
                            </p>
                        </div>
                    `).join('')}

                    <div style="text-align: right; margin-top: 20px; padding-top: 15px; border-top: 2px solid #6B4423;">
                        <p style="font-size: 18px; margin: 5px 0;"><strong>Subtotal:</strong> $${subtotal}</p>
                        <p style="font-size: 14px; margin: 5px 0; color: #8B6F47;">Shipping: TBD</p>
                    </div>

                    <div style="background-color: #F5F1E8; padding: 20px; border-radius: 5px; margin-top: 25px;">
                        <h3 style="color: #6B4423; font-size: 16px; margin-top: 0;">What's Next?</h3>
                        <p style="font-size: 14px; color: #333; line-height: 1.6;">
                            I'll contact you within 24-48 hours to:
                        </p>
                        <ul style="font-size: 14px; color: #333; line-height: 1.8; margin-left: 20px;">
                            <li>Confirm item availability</li>
                            <li>Calculate shipping cost</li>
                            <li>Arrange payment (Venmo, PayPal, or bank transfer)</li>
                        </ul>
                        <p style="font-size: 14px; color: #333; line-height: 1.6;">
                            You'll receive a follow-up email at <strong>${customer.email}</strong>.
                        </p>
                    </div>

                    <p style="font-size: 14px; color: #333; line-height: 1.6; margin-top: 25px;">
                        Thank you for supporting my pottery!
                    </p>
                    <p style="font-size: 14px; color: #333; margin-top: 10px;">
                        Kathleen<br>
                        <a href="mailto:katmelonashi@gmail.com" style="color: #C4774C;">katmelonashi@gmail.com</a>
                    </p>
                </div>

                <p style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
                    This is an automated confirmation from your pottery studio website.
                </p>
            </div>
        `
    };

    // Owner notification email
    const ownerMailOptions = {
        from: process.env.EMAIL_USER,
        to: 'katmelonashi@gmail.com',
        subject: `New Order - ${orderId}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #6B4423; border-bottom: 2px solid #C4774C; padding-bottom: 10px;">
                    🎉 New Order Received!
                </h2>

                <div style="background-color: white; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <div style="background-color: #E8D5C4; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>Order #:</strong> ${orderId}</p>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${orderDate}</p>
                        <p style="margin: 5px 0;"><strong>Subtotal:</strong> $${subtotal}</p>
                    </div>

                    <h3 style="color: #6B4423; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Customer Information:</h3>
                    <p style="margin: 5px 0;"><strong>Name:</strong> ${customer.name}</p>
                    <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a></p>
                    <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>

                    <h3 style="color: #6B4423; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Shipping Address:</h3>
                    <p style="margin: 5px 0;">${customer.address}</p>
                    <p style="margin: 5px 0;">${customer.city}, ${customer.state} ${customer.zip}</p>
                    <p style="margin: 5px 0;">${customer.country}</p>

                    ${customer.notes ? `
                        <h3 style="color: #6B4423; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Special Notes:</h3>
                        <p style="margin: 5px 0; font-style: italic; color: #555;">${customer.notes}</p>
                    ` : ''}

                    <h3 style="color: #6B4423; font-size: 18px; margin-top: 20px; margin-bottom: 10px;">Items Ordered:</h3>
                    ${items.map(item => `
                        <div style="border-bottom: 1px solid #e0e0e0; padding: 10px 0;">
                            <p style="margin: 5px 0;">
                                <strong>${item.title}</strong> (ID: ${item.id})
                            </p>
                            <p style="margin: 5px 0; color: #666;">
                                Quantity: ${item.quantity} × ${item.priceDisplay} = $${item.price * item.quantity}
                            </p>
                        </div>
                    `).join('')}

                    <div style="background-color: #FFF9E6; padding: 15px; border-left: 4px solid #C4774C; margin-top: 20px;">
                        <h3 style="color: #6B4423; font-size: 16px; margin-top: 0;">Action Required:</h3>
                        <ol style="margin: 10px 0; padding-left: 20px;">
                            <li>Verify item availability</li>
                            <li>Calculate shipping cost</li>
                            <li>Contact customer at <a href="mailto:${customer.email}">${customer.email}</a></li>
                            <li>Arrange payment details</li>
                        </ol>
                    </div>
                </div>
            </div>
        `
    };

    // Send both emails
    await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(ownerMailOptions)
    ]);

    console.log(`Order confirmation emails sent for ${orderId}`);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
