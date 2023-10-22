
```markdown
# Vacation Booking Application


Welcome to the Vacation Booking Application repository! This application allows users to book vacations, follow their favorite destinations, filter vacations, and includes both user and admin sides. Users can also register on the website to access additional features.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Code Examples](#code-examples)
- [Contributing](#contributing)
- [License](#license)

## Features

- Book vacations to various destinations.
- Follow/unfollow vacation destinations.
- Filter vacations by criteria such as destination, date, etc.
- User registration and authentication.
- Admin panel for managing reports and vacations.

## Demo

You can check out a live demo of the application [here](https://your-demo-url.com).

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vacation-booking-app.git
   ```

2. Change to the project directory:

   ```bash
   cd vacation-booking-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the backend server (if applicable) and provide the necessary environment variables.

5. Start the development server:

   ```bash
   npm start
   ```

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. **User Dashboard**: Users can log in, browse available vacations, book vacations, and follow/unfollow destinations.

2. **Admin Panel**: Admins can access an admin panel where they can view reports, manage vacations, and perform administrative tasks.

3. **Filtering**: Users can filter vacations based on their preferences, such as destination, date, and more.

4. **Download CSV**: Users can download vacation data in CSV format.

5. **Share via WhatsApp**: Users can share vacation information with friends via WhatsApp.

## Code Examples

Here are some code examples from the application:

### Download CSV Function

```javascript
const downloadCSV = () => {
    // Your downloadCSV function code here
    // Example code...
    if (downloadRef.current) {
        const header = 'Vacations, Likes\n';
        const data = vacations.map(v => `${v.destination}, ${v.followersAmount}`).join('\n');
        const csvData = header + data;
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        (downloadRef.current as HTMLAnchorElement).setAttribute('href', url);
        (downloadRef.current as HTMLAnchorElement).setAttribute('download', 'vacations.csv');
        (downloadRef.current as HTMLAnchorElement).click();
    } else {
        console.error("downloadRef is not defined");
    }
}
```

### Follow/Unfollow Function

```javascript
async function isFollow() {
    try {
        const vacationId = props.vacation.vacationId;
        const userId = await authService.getUserIdFromToken();

        const follower = new FollowerModel();
        follower.vacationId = vacationId;
        follower.userId = userId;

        if (isFollowing) {
            setIsFollowing(false);
            setFollowers(followers - 1);
            await followersService.deleteFollower(follower);
        } else {
            setIsFollowing(true);
            setFollowers(followers + 1);
            await followersService.addFollower(follower);
        }
    } catch (error) {
        console.error(error);
    }
}
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your changes to your fork:

   ```bash
   git push origin feature/new-feature
   ```

5. Create a pull request to the `main` branch of the original repository.

6. Be sure to follow the code of conduct and contribute in a respectful and collaborative manner.

## License

This project is licensed under the MIT License.
```

You can use this updated text with code examples as your README.md file on GitHub.
