import re

with open('1.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract URLs from JS
urls = re.findall(r'https?://[^\s"\'<>]+', content)

print("URLs found in JS:")
for url in set(urls):
    print(url)