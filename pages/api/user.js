import jwt from 'jsonwebtoken';


/**
 * This function checks if there is a cookie with user information
 * generated by the authentification API's. If so, then extract the
 * data and return to the front end
 */
export default async function getUser(req, res) {
  if (req.method === 'GET') {
    try {
      // Retrieve session token from request cookies
      const token = req.cookies.token;

      if (!token) {
        throw new Error('Session token not found');
      }

      // Verify and decode the token
      const decodedToken = jwt.verify(token, 'key');

      // Extract user data from the token payload
      const { username } = decodedToken;

      // Respond with user data
      res.status(200).json({ username });
    } catch (error) {
      console.error('Error retrieving user data:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}