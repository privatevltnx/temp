import re

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract download URLs
download_urls = []

# Look for href attributes with download-related URLs
href_pattern = r'href="([^"]*(?:download|\.iso|\.wsl|parrot|deb\.parrot)[^"]*)"'
matches = re.findall(href_pattern, content, re.IGNORECASE)

for match in matches:
    if match and not match.startswith('#') and not match.startswith('javascript:'):
        download_urls.append(match)

# Print all found URLs
print("Download URLs found:")
for url in set(download_urls):  # Remove duplicates
    print(url)