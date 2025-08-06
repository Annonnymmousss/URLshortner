# URL Shortener

A simple URL shortening service built with Node.js, Express, and MongoDB. This service allows you to create short URLs that redirect to longer URLs and tracks visit history.

## Features

- Create short URLs from long URLs
- Automatic redirection from short URLs to original URLs
- Visit history tracking with timestamps
- RESTful API endpoints
- MongoDB integration for data persistence

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **shortid** - Generate unique short IDs

## Project Structure

```
url-shortener/
├── controllers/
│   └── url.js          # URL controller with business logic
├── models/
│   └── url.js          # MongoDB schema for URLs
├── routes/
│   └── url.js          # API routes
├── connect.js          # Database connection utility
└── index.js           # Main application entry point
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-shortener
```

2. Install dependencies:
```bash
npm install express mongoose shortid
```

3. Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`

4. Start the server:
```bash
node index.js
```

The server will start on port 8000.

## API Endpoints

### Create Short URL
- **POST** `/url`
- **Body**: 
```json
{
  "url": "https://example.com/very/long/url"
}
```
- **Response**:
```json
{
  "id": "abc123def"
}
```

### Access Short URL
- **GET** `/:shortId`
- Redirects to the original URL
- Automatically tracks visit with timestamp

## Usage Examples

### Creating a short URL
```bash
curl -X POST http://localhost:8000/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```

### Accessing a short URL
```bash
curl http://localhost:8000/abc123def
# This will redirect to the original URL
```

## Database Schema

The URL document structure in MongoDB:

```javascript
{
  shortId: String,      // Unique short identifier
  redirectURL: String,  // Original long URL
  visitHistory: [{      // Array of visit records
    timestamp: Number   // Unix timestamp of visit
  }],
  createdAt: Date,      // Auto-generated creation time
  updatedAt: Date       // Auto-generated update time
}
```

## Configuration

- **Port**: 8000 (configurable in `index.js`)
- **MongoDB URL**: `mongodb://localhost:27017/short-url` (configurable in `index.js`)
- **Database Name**: `short-url`

## Error Handling

- Returns `400` status with error message if URL is not provided
- Automatically handles MongoDB connection errors
- Graceful handling of invalid short IDs

## Known Issues

There's a bug in the redirect functionality in `index.js`. The code uses `findOneAndReplace` instead of `findOneAndUpdate`, which may cause issues. Consider fixing this:

```javascript
// Current (problematic):
const entry = await URL.findOneAndReplace({shortId}, {$push: {...}});

// Should be:
const entry = await URL.findOneAndUpdate(
  {shortId}, 
  {$push: {visitHistory: {timestamp: Date.now()}}},
  {new: true}
);
```

## Future Enhancements

- Add analytics dashboard
- Implement custom short URL aliases
- Add URL validation
- Implement rate limiting
- Add user authentication
- Bulk URL shortening
- URL expiration dates
- Click analytics and statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
