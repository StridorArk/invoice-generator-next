# Invoice Generator (Next.js)

Invoice Generator is a web application built with **Next.js** that allows users to create, customize, and export professional invoices in PDF format. This project is designed to streamline the invoicing process for businesses and freelancers.

## Features

- **Dynamic Invoice Creation**: Add company and client details, invoice items, and additional notes.
- **PDF Export**: Export the invoice as a high-quality PDF file.
- **Validation**: Ensures required fields are filled before exporting.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Drag-and-Drop Logo Upload**: Easily upload a company logo for branding.

## Demo

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/invoice-generator-next.git
   cd invoice-generator-next
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Build for Production

To create a production build, run:
```bash
npm run build
```
The optimized build will be available in the `.next/` folder.

To start the production server:
```bash
npm start
```

## Usage

1. Fill in your company and client details.
2. Add invoice items (description, quantity, and price).
3. Upload your company logo (optional).
4. Click the "Export to PDF" button to download the invoice.

## Project Structure

```
invoice-generator-next/
├── components/         # React components
│   ├── form/           # Invoice form components
│   ├── sections/       # Form sections (e.g., Header, Body, Footer)
├── pages/              # Next.js pages
│   ├── index.js        # Main page (e.g., InvoiceApp)
│   ├── api/            # API routes (optional)
├── public/             # Static assets (e.g., images, logos)
├── styles/             # CSS styles
├── .gitignore          # Files to ignore in Git
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
```

## Technologies Used

- **Frontend**: Next.js, React, HTML, CSS
- **PDF Generation**: [html2canvas](https://github.com/niklasvh/html2canvas), [jsPDF](https://github.com/parallax/jsPDF)
- **Date Picker**: [react-datepicker](https://reactdatepicker.com/)
- **Styling**: Bootstrap, custom CSS

## Validation

The app validates the following fields before exporting the invoice:
- Your Company
- First Name
- Last Name
- Phone Number
- Email Address
- Website

If any required field is missing, a styled error message will appear.

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the app:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/) for the framework.
- [html2canvas](https://github.com/niklasvh/html2canvas) and [jsPDF](https://github.com/parallax/jsPDF) for PDF generation.
- [react-datepicker](https://reactdatepicker.com/) for date selection.
- [Bootstrap](https://getbootstrap.com/) for styling.