/*

## **Part One: Solidify Terminology**

In your own terms, define the following terms:

- What is HTTP?
- What is a URL?
- What is DNS?
- What is a query string?
- What are two HTTP verbs and how are they different?
- What is an HTTP request?
- What is an HTTP response?
- What is an HTTP header? Give a couple examples of request and response headers you have seen.
- What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?

## ****Part Two: Practice Tools****

1. Using ***curl***, make a ***GET*** request to the *icanhazdadjoke.com* API to find all jokes involving the word “pirate”
2. Use ***dig*** to find what the IP address is for *icanhazdadjoke.com*
3. Make a simple web page and serve it using ***python3 -m http.server***. Visit the page in a browser.


*/


/*

HTTP: HyperText Transfer Protocol (HTTP) is a set of rules that allows web browsers and web servers to communicate with each other. 

URL: URL stands for Uniform Resource Locator. It is an address used to access resources on the internet. 

DNS: DNS stands for Domain Name System. It's like the phonebook of the internet. The DNS translates that domain name into an IP address, which is used to locate the server where the website is hosted.

Query String: A query string is the part of a URL that contains data to be passed to web applications. It usually starts with a question mark (?) and consists of key-value pairs separated by ampersands (&). For example, in the URL example.com/search?query=apple&sort=asc, the query string is query=apple&sort=asc.

Two HTTP Verbs and Their Differences:

GET: This is used to request data from a server. When you visit a website, your browser usually sends a GET request to retrieve the web page. GET requests should not change the state of the server.
POST: This is used to submit data to a server, resulting in changes of the server's state. For example, when you fill out a form on a website and click "submit", your browser might send a POST request with the form data.
HTTP Request: An HTTP request is a message sent by a client (usually a web browser) to a server, asking for a specific resource or action. It consists of a request line (indicating the HTTP method, URL, and HTTP version), headers, and optionally a body.

HTTP Response: An HTTP response is the message sent by a server in response to an HTTP request, from a client. It contains a status line (indicating the HTTP status code and reason phrase), headers, and the actual content or body.

HTTP Header: HTTP headers are key-value pairs included in both HTTP requests and responses. They provide metadata about the request or response.

Request Headers Examples:
User-Agent: Describes the client making the request, such as a web browser or mobile device.
Accept: Specifies the types of media that the client can process.
Response Headers Examples:
Content-Type: Specifies the type of data in the response body, such as text/html or application/json.
Set-Cookie: Sends a cookie from the server to the client.
Processes When Typing a URL into a Browser:

The browser checks its local storage (cache) to see if it already knows the IP address for the domain.
If not found in the cache, the browser references the DNS server to translate (resolve) the domain name into an IP address.
The browser establishes a connection to the server at the resolved IP address, using the HTTP protocol.
The browser sends an HTTP GET request to the server, asking for the specified resource (/some/page.html).
The server processes the request and sends back an HTTP response containing the requested resource.
The browser renders the received web page and displays it to the user.

*/
