import * as curlconverter from 'curlconverter';

curlconverter.toPython('curl example.com');
curlconverter.toPython(['curl', 'example.com']);
// "import requests\n\nresponse = requests.get('http://example.com')\n"