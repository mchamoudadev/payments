Here’s the updated README with the correct `.env` keys and environment setup details:

---

# Somali Local Payment System

[![License](https://img.shields.io/github/license/mchamoudadev/payments)](LICENSE)  
[![Contributors](https://img.shields.io/github/contributors/mchamoudadev/payments)](https://github.com/mchamoudadev/payments/graphs/contributors)  
[![Issues](https://img.shields.io/github/issues/mchamoudadev/payments)](https://github.com/mchamoudadev/payments/issues)

A robust payment system designed to integrate Somali local payment methods such as **EVC**, **Zaad**, **Sahal**, and **Premier Bank Gateway** (powered by Mastercard). This project aims to simplify online transactions across Somalia using the most widely adopted local payment solutions.

---

## 🚀 Key Features

- **Support for Somali Local Payment Methods**: Seamless integration with EVC, Zaad, Sahal, and Premier Bank Gateway (Mastercard).
- **High Security**: Implements secure protocols to ensure safe and encrypted transactions.
- **Real-time Payment Processing**: Instant verification and processing of payments for quick transaction completions.
- **Customizable Integration**: Easy API setup to integrate with e-commerce platforms, websites, and mobile apps.
- **Detailed Documentation**: Clear and concise instructions to help developers quickly set up and use the system.
- **Scalable Infrastructure**: Handles large transaction volumes efficiently with minimal downtime.

---

## 🏗️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mchamoudadev/payments.git
   ```

2. Navigate into the project directory:

   ```bash
   cd payments
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:

   - Set up the following environment variables in your `.env` file:

     ```env
     MASTER_CARD_MERCHANT_ID=your_mastercard_merchant_id
     MASTER_CARD_API_PASSWORD=your_mastercard_api_password
     MERCHANT_U_ID=your_merchant_u_id
     MERCHANT_API_USER_ID=your_merchant_api_user_id
     MERCHANT_API_KEY=your_merchant_api_key
     ```

5. Run the development server:

   ```bash
   npm start
   ```

---

## 🌐 Supported Payment Methods

- **EVC**: Mobile payment service widely used across Somalia.
- **Zaad**: Popular mobile money platform from Telesom.
- **Sahal**: Digital payment solution for easy transfers.
- **Premier Bank Gateway**: Mastercard-powered payment gateway for secure transactions.

---

## 🤝 Contributing

We welcome contributions to improve and expand this project! To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Create a Pull Request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## ✨ Acknowledgements

- **EVC** - For providing the mobile payment platform used by millions.
- **Zaad** - For creating a reliable mobile money service.
- **Sahal** - For enabling easy digital transactions across the country.
- **Premier Bank** - For powering online transactions through Mastercard.

---
