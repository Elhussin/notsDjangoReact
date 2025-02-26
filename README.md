# NotsDjango Project

NotsDjango is a multifunctional Django project that provides a powerful API using Django REST Framework. The project aims to support modern applications by offering features such as user management, token-based authentication (JWT), and frontend integration using CORS.

## Key Features

- **User Management**: Login/registration using email or username.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **API Interface**: Customizable API using Django REST Framework.
- **Financial Support**: Uses the `djmoney` library for managing financial fields.
- **History and Logging**: Tracks changes using `django-simple-history`.
- **Automatic API Documentation**: Generates OpenAPI documentation with `drf-spectacular`.
- **CORS Support**: Enables frontend-backend interaction.
- **Product and Reporting Management**: Supports multiple applications for client management, HR, and financial reports.
- **Django Admin Support**: Provides an integrated management interface.
- **Frontend Built with React**: Ensures a modern and seamless user experience.

## Prerequisites

Before running the project, ensure that you have installed the following:

- Python 3.8+
- PostgreSQL (for production)
- Node.js (for running React frontend)

## Installation

### 1. Clone the Project

```bash
git clone https://github.com/your-repo/notsDjango.git
cd notsDjango
```

### 2. Set Up Virtual Environment and Install Dependencies

```bash
python -m venv venv
source venv/bin/activate  # On Linux/MacOS
venv\Scripts\activate     # On Windows
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file and add the following details:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
EMAIL_HOST_USER=your-email@example.com
EMAIL_HOST_PASSWORD=your-email-password
ACCESS_TOKEN_LIFETIME_MINUTES=15
REFRESH_TOKEN_LIFETIME_DAYS=7
```

## Project Structure

### Local Applications

- `notes`: Manages notes.
- `waseel`: Special project-specific functions.
- `accounting`: Handles financial management.
- `crm`: Manages client relationships.
- `hrm`: Handles human resource management.
- `reporting`: Generates reports.
- `product`: Manages products.
- `users`: Manages users.

### External Libraries

- `Django REST Framework`: For API development.
- `django-cors-headers`: Supports CORS requests.
- `dj-rest-auth`: Simplifies login/registration.
- `allauth`: Manages registration and authentication.
- `djmoney`: Handles financial fields.
- `drf-spectacular`: Generates API documentation.
- `React`: Creates a dynamic and interactive user interface.

## Production Setup

To deploy the project in a production environment, ensure:

- `DEBUG=False` is set in `.env` file.
- WSGI server such as Gunicorn or uWSGI is configured.
- Web server such as Nginx or Apache is set up.
- HTTPS is enabled using an SSL certificate.

## Contribution

If you wish to contribute to this project, please open an Issue or submit a Pull Request.

## License

This project is licensed under the `MIT License`.

