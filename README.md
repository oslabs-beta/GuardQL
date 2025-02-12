<p align="center">
  <img src="https://imgur.com/iNek9oJ.png" width="50%" alt="GuardQL_Logo">
</p>

# GuardQL

### Uncover, Analyze, and Optimize Your GraphQL Performance

GuardQL is a debugging and performance monitoring tool that logs GraphQL API errors, tracks slow query execution times, and provides a central dashboard with search and filtering functionality for multiple projects.

<!-- To be inserted:
screenshots, more details about product, acknowledgements, instructions
-->
<details>
  <summary>Table of Contents</summary>
  
  - [Technologies](#technologies)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Initial Set-up and Installation](#initial-set-up-and-installation)
  - [Contributions](#contributions)
  - [GuardQL Team](#guardql-team)
  - [Contact Us](#contact-us)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

</details>

## Technologies
<!-- Backend -->
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) <!-- Frontend --> ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Introduction 

Debugging GraphQL APIs can be difficult, especially when trying to pinpoint errors in slow or inefficient queries. GuardQL streamlines this process by providing a comprehensive debugging and performance monitoring tool that:

- ✅ Captures GraphQL API errors in real-time with detailed logs
- ✅ Monitors query execution times to detect inefficiencies
- ✅ Offers an intuitive dashboard for visualizing key performance metrics
- ✅ Enables users to create and manage multiple projects with a dropdown selection

With GuardQL, developers gain real-time visibility into their GraphQL queries, making it easier to diagnose issues and optimize performance.

## Features

#### 🚨 Real-time GraphQL Error Tracking & Debugging
* Instant Error Logging: Captures GraphQL API errors as they occur, complete with timestamps and detailed error messages.
* Query & Mutation Context: Provides full visibility into which GraphQL query or mutation caused the error, along with stack trace details.

#### 🎯 Performance Monitoring & Query Optimization
* Slow Query Identification: Automatically flags GraphQL queries that take longer than a set threshold, helping pinpoint performance bottlenecks.
* Comprehensive Query Performance Tracking: Logs execution times for all queries, not just slow ones, offering a complete overview of GraphQL performance.

#### 📊 Intuitive & Insightful Dashboard
* User-Friendly Interface: Built for fast debugging and troubleshooting with a clean, easy-to-navigate UI.
* Visual Performance Analytics: Displays query execution trends and error frequency over time through graphical reports.

#### 🚀 Seamless GraphQL Integration via NPM Plugin
* Effortless Setup: A lightweight NPM package that integrates smoothly into any GraphQL project with minimal configuration.
* Automated Logging: Instantly starts tracking errors and performance metrics without requiring additional setup.

## Initial Set-up and Installation

#### 1️⃣ Sign Up & Get Your API Key
* Create an account to gain access to the GuardQL Dashboard.
* Upon signup, you'll receive a unique API key, which is required for configuring the plugin. 
![signup](src/client/assets/signup.gif) 

#### 2️⃣ Create & Select a Project
* Inside the dashboard, create a new project using the project dropdown.
* Select your project to start tracking GraphQL request performance and error logs.
![projects](src/client/assets/dashboard.gif)

#### 3️⃣ Install the GuardQL NPM Package
* Add GuardQL to your application by running:
    `npm install guardql`

#### 4️⃣ Configure the Plugin in Apollo Server
* Integrate GuardQL into your Apollo Server setup by adding the plugin and providing:
    * Your project name
    * The API key from your dashboard
    * Any query execution time thresholds for slow query detection
    ```import { ApolloServer } from '@apollo/server';
       import { guardqlPlugin } from 'guardql';
        
        const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            guardqlPlugin({
                apiKey: 'your-api-key',
                projectName: 'your-project-name',
                slowQueryThreshold: 1000 // in milliseconds
            })
        ]
    });```

#### 5️⃣ Run Your Application
* Start your server and begin making GraphQL requests as usual.

#### 6️⃣ Monitor Your API in Real-Time
* Access the GuardQL Dashboard to track:
    * Query execution times
    * GraphQL errors with stack traces
    * Performance trends and slow query alerts

## Contributions

We welcome contributions!

If you’d like to contribute: 

1. Fork this repository
2. Create a feature branch 
    - `git checkout -b feature-branch-name`
3. Commit your changes
    - `git add .`
    - `git commit -m "Added new feature XYZ"`
4. Push to your branch
    - `git push origin feature-branch-name`
5. Create a pull request

For major changes, please open an issue first to discuss what you’d like to change.

## GuardQL Team
---
<!-- Nico Henry -->
![Static Badge](https://img.shields.io/badge/Henry%20%E2%86%92-none?style=flat-square&logoColor=white&logoSize=auto&label=Nico&labelColor=%23E623C6&color=%238A1877) [![Static Badge](https://img.shields.io/badge/%40Nico21221-Dark%20Charcoal?style=flat-square&logo=Github&logoColor=white&logoSize=auto&color=%23333333)](https://github.com/Nico21221) [![LinkedIn](https://img.shields.io/badge/linkedin/in/nico_henry-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nico-henry/)
<!-- Cindy Rodriguez-Llivipuma -->
![Static Badge](https://img.shields.io/badge/Rodriguez%20Llivipuma%20%E2%86%92-none?style=flat-square&logoColor=white&logoSize=auto&label=Cindy&labelColor=%23E623C6&color=%238A1877) [![Static Badge](https://img.shields.io/badge/%40csrl23-none?style=flat-square&logo=Github&logoColor=white&logoSize=auto&color=%23333333)](https://github.com/csrl23) [![LinkedIn](https://img.shields.io/badge/linkedin/in/cindy_rod_lliv-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cindy-rod-lliv/)
<!-- Sienna Shepherd -->
![Static Badge](https://img.shields.io/badge/Shepherd%20%E2%86%92-none?style=flat-square&logoColor=white&logoSize=auto&label=Sienna&labelColor=%23E623C6&color=%238A1877) [![Static Badge](https://img.shields.io/badge/%40codecaptaincode-none?style=flat-square&logo=Github&logoColor=white&logoSize=auto&color=%23333333)](https://github.com/codecaptaincode) [![LinkedIn](https://img.shields.io/badge/linkedin/in/sienna_shepherd-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sienna-shepherd/)
<!-- Sabrina Ira -->
![Static Badge](https://img.shields.io/badge/Ira%20%E2%86%92-none?style=flat-square&logoColor=white&logoSize=auto&label=Sabrina&labelColor=%23E623C6&color=%238A1877) [![Static Badge](https://img.shields.io/badge/%40sabrinaira-none?style=flat-square&logo=Github&logoColor=white&logoSize=auto&color=%23333333)](https://github.com/sabrinaira) [![LinkedIn](https://img.shields.io/badge/linkedin/in/sabrina_ira-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sabrinaira)
<!-- Mike Thurstlic -->
![Static Badge](https://img.shields.io/badge/Thurstlic%20%E2%86%92-none?style=flat-square&logoColor=white&logoSize=auto&label=Mike&labelColor=%23E623C6&color=%238A1877) [![Static Badge](https://img.shields.io/badge/%40thurstlic7-none?style=flat-square&logo=Github&logoColor=white&logoSize=auto&color=%23333333)](https://github.com/thurstlic7) [![LinkedIn](https://img.shields.io/badge/linkedin/in/mike_thurstlic-%230077B5.svg?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mike-thurstlic-a2b8a82a4/)


<!-- - **Nico Henry** - [@Nico21221](https://github.com/Nico21221)
- **Cindy Rodriguez-Llivipuma** - [@csrl23](https://github.com/csrl23)
- **Sienna Shepherd** - [@codecaptaincode](https://github.com/codecaptaincode)
- **Sabrina Ira** - [@sabrinaira](https://github.com/sabrinaira)
- **Mike Thurstlic** - [@thurstlic7](https://github.com/thurstlic7) -->

## Contact Us 
LinkedIn link

## License
Distributed under the [MIT](LICENSE.txt) License.

## Acknowledgements

We would like to thank the following resources that helped make GuardQL possible:

- **[Material-UI](https://mui.com/)** - Used for designing UI components
- **[Canva](https://www.canva.com/)** - Used to help create logo

Special thanks to the entire GuardQL team for their hard work and dedication into making GuardQL a reality! ✨

#### Return to [top](#guardql)