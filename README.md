# Resume Uploader & Details Viewer

This project is a web application that allows users to upload their resumes (in PDF format), extract details from the PDF, and view the extracted information. Additionally, it includes a feature to display all previously uploaded resumes and download them as PDF or CSV files.

## Features

- **Resume Upload**: Upload resumes in PDF format, extract key information like name, email, phone, college name, and skills.
- **Details Display**: View all uploaded resumes along with their extracted details.
- **AI Interation** : Utilize AI to extract details.
- **File Download**: Download individual resume details as PDF or CSV.
- **Tab Navigation**: Switch between "Upload Resume" and "Display Details" views using a simple tab navigation.

## Project Structure

```bash
├── public
│   └── index.html
├── src
│   ├── Components
│   │   ├── Display.js         # Displays the list of resumes
│   │   ├── Details.js         # Shows extracted details after uploading a resume
│   │   └── Upload.js          # Upload component to handle resume submission
│   ├── App.css                # Basic styling for the app
│   ├── App.js                 # Main component that manages tab switching and state
│   └── index.js               # Entry point for the React app
├── .gitignore
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps to Run

#### Clone the Repository

```bash
git clone https://github.com/your-username/resume-uploader.git
cd resume-uploader
```

#### Install Dependencies

Install all the necessary dependencies using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

#### Run the Application

Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Backend Setup

You need a backend server running to handle PDF extraction and storing of details. The app assumes you have the following endpoints:

- `POST /generateDetails`: To process the extracted text from a PDF and return details.
- `POST /postdetails`: To save the extracted details to a database.
- `GET /getdetails`: To fetch a list of previously submitted resumes.

Make sure to modify the URL in the `App.js` and `Display.js` files if your backend is hosted at a different location.

## Usage

### Upload a Resume:

1. Navigate to the **Upload Resume** tab.
2. Choose a PDF file containing the resume, and the system will extract details like name, email, phone, etc.
3. The extracted details will be sent to the server for further processing.

### View Uploaded Resumes:

1. Switch to the **Display Details** tab.
2. The system fetches all uploaded resumes and their details from the server.
3. You can download the details as either a PDF or CSV.

## Technologies Used

### Frontend:

- React.js
- Tailwind CSS for styling

### Backend (Expected setup):

- Node.js / Express (for API endpoints)
- A service for extracting text from PDFs (e.g., `pdf-parse`)