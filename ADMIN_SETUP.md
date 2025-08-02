# Portfolio Admin Panel Setup

Your portfolio now has an admin panel! Here's how to use it:

## Accessing the Admin Panel

Navigate to your portfolio URL and add `#admin` at the end:
- Local: `http://localhost:5173/#admin`
- Production: `https://your-domain.com/#admin`

## Admin Features

1. **Personal Information**: Update your name, title, email, GitHub, LinkedIn, and profile image
2. **Skills Management**: Add/remove skill categories and individual skills
3. **Projects Management**: Add/edit/delete projects with all details
4. **Achievements Management**: Add/edit/delete achievements with certificates

## How It Works

1. **Login**: Use password `555` to access the admin panel
2. **Edit Content**: Use the tabbed interface to edit different sections
3. **Save Changes**: Click "Save & Download" to download the updated `portfolio.json`
4. **Update Website**: Replace the file at `src/data/portfolio.json` with your downloaded file
5. **Rebuild**: Your changes will appear after rebuilding the site

## Security Note

This is a client-side only solution for simplicity. For production use, consider:
- Using environment variables for the admin password
- Implementing proper authentication
- Using a backend API to save changes directly

## Current Data Structure

The portfolio data is stored in `src/data/portfolio.json` with the following structure:
- `personalInfo`: Basic information and links
- `skills`: Array of skill categories with items
- `projects`: Array of project objects
- `achievements`: Array of achievement objects

## Next Steps

You can now easily update your portfolio content without touching code!
Just use the admin panel, download the JSON, and replace the file.
