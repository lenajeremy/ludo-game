<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LUDO</title>
    <link rel="stylesheet" href="bootstrap.css" />
    <link rel="stylesheet" href="ludo.css" />
  </head>
  <body>
    <h1></h1>

    <div class="seedsWon player1">
      <h5>YOU</h5>
    </div>
    <div class="seedsWon player2">
      <h5>COMP</h5>
    </div>

    <div class="ludo">
      <div class="house" id="house1">
        <p>You</p>
      </div>
      <div class="house" id="house2">
        <p>Comp</p>
      </div>
      <div class="house" id="house4">
        <p>You</p>
      </div>
      <div class="house" id="house3">
        <p>Comp</p>
      </div>
      <div class="center">
        <div class="houses"></div>
        <div class="die1 die">
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
        </div>
        <div class="die2 die">
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
          <div class="parent">
            <div class="dot"></div>
          </div>
        </div>
        <div class="die-values">
          <button class="value1 value">4</button>
          <button class="value2 value">6</button>
        </div>
      </div>
      <div class="player1 won"></div>
      <div class="player2 won"></div>
    </div>
  </body>
  <script src="path.js"></script>
</html>
