function createHtml(url) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSS Parser App - Verification Successful</title>
        <style>
          html,
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          p,
          h1,
          h2,
          h3 {
            font-family: Roboto;
            margin: 0;
            padding: 0;
            text-align: center;
          }
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fafafa;
          }
          .wrapper {
            background-color: #fff;
            border: 1px solid gray;
            border-radius: 2rem;
            padding: 2rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
    
            -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
            box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    
            width: 60%;
          }
          .main-title {
            color: #49409c;
            font-size: 2rem;
            font-style: normal;
            font-weight: 900;
            line-height: 1.5;
            letter-spacing: 0em;
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .subtitle {
            color: #010;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .text {
            color: #000;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
          .link {
            text-decoration: none;
            font-weight: 600;
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
            color: #000;
            transition: 250ms ease-in-out;
          }
          .symbol {
            font-size: 1.2rem;
          }
          .link:hover,
          .link:focus {
            transform: translateY(-0.2rem);
            text-shadow: 0px 3px 2px rgba(150, 150, 150, 1);
          }
          .counter {
            font-weight: 600;
          }
          @media (min-width: 768px) {
            .wrapper {
              width: 480px;
            }
            .main-title {
              font-size: 4rem;
            }
            .subtitle {
              font-size: 2rem;
              margin-bottom: 1.5rem;
            }
            .link {
              font-size: 2rem;
            }
            .text {
              font-size: 1.5rem;
            }
            .symbol {
              font-size: 1.5rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="wrapper">
            <h1 class="main-title">Congratulations!</h1>
            <h2 class="subtitle">You've successfully confirmed registration!</h2>
            <p class="text">You will be redirected to</p>
            <a href="${url}" class="link"
              >Lifehacker RSS parser APP</a
            >
    
            <p class="text">
              in
              <span id="counter">5</span> second(s)...
            </p>
          </div>
        </div>
      </body>
      <script>
        const counter = document.querySelector("#counter");
    
        const changeCounterAndRedirect = () => {
          setInterval(() => {
            counter.innerHTML -= 1;
            if (counter.innerHTML === "1") {
              window.location.replace("${url}");
            }
          }, 1000);
        };
    
        changeCounterAndRedirect();
       </script>
    </html>
    `;
}

module.exports = createHtml;
