export async function onRequest(context) {
  return new Response(`
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Web Proxy</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
          body { 
            font-family: 'Roboto', sans-serif; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
            background-color: #ffecd2; 
            background-image: linear-gradient(to right, #ffecd2, #fcb69f);
            box-sizing: border-box;
          }
          form { 
            background-color: white; 
            padding: 20px; 
            border-radius: 16px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.15); 
            display: flex; 
            align-items: center;
            width: 90%;
            max-width: 500px;
            box-sizing: border-box;
          }
          input[type="text"] { 
            flex: 1;
            padding: 12px; 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            padding-left: 40px; 
            background: url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Internet_Icon.png') no-repeat 10px center;
            background-size: 20px 20px;
            font-size: 16px;
            outline: none;
          }
          input[type="text"]:focus {
            border-color: #007bff;
          }
          button { 
            padding: 12px 24px; 
            background-color: #007bff; 
            color: white; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            margin-left: 10px;
            font-size: 16px;
            font-weight: 500;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          button:hover { 
            background-color: #0056b3; 
            transform: scale(1.02);
          }
          @media (max-width: 600px) {
            form {
              flex-direction: column;
            }
            input[type="text"] {
              width: 100%;
              margin-bottom: 10px;
              box-sizing: border-box;
            }
            button {
              width: 100%;
              margin-left: 0;
            }
          }
        </style>
      </head>
      <body>
        <form id="proxyForm" onsubmit="handleProxy(event)">
          <input type="text" id="urlInput" placeholder="输入你想访问的网址 (例如: google.com)" required aria-label="Enter URL">
          <button type="submit">Go</button>
        </form>

        <script>
          function handleProxy(event) {
            event.preventDefault();
            const input = document.getElementById('urlInput').value.trim();
            if (!input) return;
            
            let targetUrl = input;
            if (!/^https?:\\/\\//i.test(targetUrl)) {
              targetUrl = 'https://' + targetUrl;
            }
            
            // 动态跳转：当前域名 + / + 目标网址
            window.location.href = window.location.origin + '/' + targetUrl;
          }
        </script>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
