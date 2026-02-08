# Payment Management System (TMS)

A secure, internal-facing fintech administrative dashboard designed to manage payment flows, user directories, and transaction reporting. This system emphasizes data traceability and role-specific workflows through a modern, high-contrast web interface.

## Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [UI & Design Standards](#ui--design-standards)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Implementation Details](#implementation-details)

## About the Project
The **Payment Management System** is a back-office tool for fintech startups to monitor and manage their internal financial operations. It acts as a single source of truth for administrative staff to track payments, onboard users, and audit transaction lifecycles.



The system provides a clear separation between **User Management** (identity) and **Transaction Tracking** (financial flow), ensuring that every payment is linked to a valid system user for full auditability.

## Key Features

### User Management
* **Internal Onboarding:** A dedicated portal to register new system users with localized names and email validation.
* **Identity Ledger:** A centralized directory to view all registered users and their account status.
* **Validation:** Strict regex-based validation for email formats and name requirements to prevent data entry errors.

### Payment & Transaction Ledger
* **Detailed Traceability:** Every transaction is assigned a unique ID, category, and native JavaScript Date object timestamp.
* **Status Lifecycle Management:** Ability for administrators to update transaction states between `PENDING`, `COMPLETED`, `FAILED`, and `REFUNDED`.
* **Dynamic Filtering:** Search through records using a multi-parameter filter system:
    * Amount Range (Min/Max).
    * Transaction Status.
    * Payment Category (UPI, Credit Card, Net Banking).

### Reporting & Visualization
* **Status Badges:** Color-coded visual indicators for instant identification of payment health.
* **Formatted Auditing:** Localized currency display (₹) and standardized date formatting (DD/MM/YYYY).


## Tech Stack
* **Framework:** Vue.js 3 (Options API with TypeScript)
* **Styling:** Tailwind CSS (Utility-first framework)
* **State Management:** Vuex (Centralized store for Users and Transactions)
* **Routing:** Vue Router (SPA navigation with active state tracking)
* **Language:** TypeScript (Strict typing for financial data models)



## Getting Started
Prerequisites
* Node.js 
* NPM

Installation

1. Clone the repository
```
git clone https://github.com/Pavan-Chary/Payments-Management-System

cd payment-management-system
```
2. Install Dependencies

```
npm install
```
3. Run for Development
```
npm run serve
```
4. Build for Production
```
npm run build
```