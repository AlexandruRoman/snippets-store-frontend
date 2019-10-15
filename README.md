<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/AlexandruRoman/snippets-store-frontend">
    <img src="logo.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Snippets Store</h3>

  <p align="center">
    The perfect place for your code inspiration
    <br />
    <br />
    <a href="https://github.com/AlexandruRoman/snippets-store-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/AlexandruRoman/snippets-store-frontend/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Snippet Store Showcase][product-screenshot]](https://github.com/AlexandruRoman/snippets-store-frontend)

Snippets Store is an online platform which was built with the purpose of helping programmers build good looking interfaces. Web programming is a vast domain, frontend programmers are facing day by day more and more challenges implementing applications that are conforming with modern quality standards, making them to focus more on optimisations, micro-interactions and complex flows instead of design aspects. In the same time, the design proces a complex task, a domain in continual transformation and change of trends.

The term of programming is used having in mind scripting languages and not declarative languages like HTML or CSS. The majority of web designers have control over those 2 technologies, making them able to share their knowledge and talent with the less experimented programmers. This web application aims to be the linking bridge between programmers and designers.

### Built With

- [React](https://reactjs.org)
- [Redux](https://redux.js.org)
- [Braintree](https://www.braintreepayments.com)
- [redux-first-router](https://github.com/faceyspacey/redux-first-router)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [TypeScript](https://www.typescriptlang.org)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- [Install Node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/AlexandruRoman/snippets-store-frontend.git
```

2. Install NPM packages

```sh
npm install
```

3. Enter your API url in `src/_brain/_helpers/api.ts`

```JS
const api = axios.create({
    baseURL: 'YOUR API URL',
    ...
})
```

<!-- USAGE EXAMPLES -->

## Usage

Running the app in dev mode:

```sh
npm start
```

Creating a production build of the app:

```sh
npm run build
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/AlexandruRoman/snippets-store-frontend/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

<!-- ACKNOWLEDGEMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/AlexandruRoman/snippets-store-frontend.svg?style=flat-square
[contributors-url]: https://github.com/AlexandruRoman/snippets-store-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AlexandruRoman/snippets-store-frontend.svg?style=flat-square
[forks-url]: https://github.com/AlexandruRoman/snippets-store-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/AlexandruRoman/snippets-store-frontend.svg?style=flat-square
[stars-url]: https://github.com/AlexandruRoman/snippets-store-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/AlexandruRoman/snippets-store-frontend.svg?style=flat-square
[issues-url]: https://github.com/AlexandruRoman/snippets-store-frontend/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandru-daniel-roman/
[product-screenshot]: screenshot.png
