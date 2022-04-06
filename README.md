<section align="center">
    <h1>FinApi</h1>
</section>

---

<h2 align="center">Summary</h2>

<p align="center">
    <a href="#about">📙 About</a>
    <a href="#start">📖 How to Start</a>
    <a href="#requirements">💡 Requirements</a>
    <a href="#business">💼 Business Rules</a>
    <a href="#technologies">💻 Technologies</a>
</p>

<h4 align="center">
   ✔️ Ig.news project finished ✔️
</h4>

<H2 id="about">📙 About</H2>

<p>API developed following the introduction chapter of Rocketseat Ignite Course, using basic HTTP request methods on the application and learning about other concepts like Middleware, Express Framework, Nodemon, etc.</p>
<p>This project is originally created on Ignite from <a href="https://www.rocketseat.com.br/">Rocketseat</a> and made by <a href="https://www.linkedin.com/in/kleverson-kenji-iwatani/">Kenji Iwatani</a></p>

---

<H2 id="start">📖 How to Start</H2>

```bash
# Clone this repository
$ git clone https://github.com/iwataniKenji/finapi

# Access the project directory
$ cd finapi

# Install dependencies
$ yarn

# Initialize and open local host
$ yarn dev
```

---

<H2 id="requirements">💡 Requirements</H2>

- [x] Should be able to create an account
- [x] Should be able to fetch the customer's bank statement
- [x] Should be able to deposit
- [x] Should be able to withdraw
- [x] Should be able to search for the customer's bank statement by date
- [x] Should be able to update customer's account name
- [x] Should be able to get customer's account data
- [x] Should be able to delete an account
- [x] Should be able to return the balance

---

<H2 id="business">💼 Business Rules</H2>

- [x] Should not be possible to register an account with an existing CPF
- [x] Should not be possible to fetch a statement from a non-existing account
- [x] Should not be possible to deposit into a non-existing account
- [x] Should not be possible to withdraw from a non-existing account
- [x] Should not be possible to withdraw when the balance is insufficient
- [x] Should not be possible to delete a non-existing account

---

<H2 id="technologies">💻 Technologies</H2>

- [x] <a href="https://nodejs.org/en/">NodeJS</a>
- [x] <a href="https://expressjs.com/">ExpressJS</a>
- [x] <a href="https://nodemon.io/">Nodemon</a>
- [x] <a href="https://insomnia.rest/">Insomnia</a>
