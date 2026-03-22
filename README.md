# Project Title: Global Grooves Explorer

## Project Overview
The Global Grooves Explorer is a web-based application designed to facilitate the discovery of international radio stations through a dynamic and interactive interface. The primary objective of this project is to allow users to explore diverse cultures and languages by accessing real-time audio streams from across the globe.

This project serves as a practical implementation of modern front-end development techniques, specifically focusing on asynchronous data fetching, dynamic DOM manipulation, and the rigorous application of JavaScript Array Higher-Order Functions (HOFs).

## Technical Objectives
The application is built to demonstrate proficiency in the following areas:

* **API Integration:** Utilizing the Fetch API to retrieve real-time data from a public directory.
* **Data Processing:** Implementing complex logic for searching, filtering, and sorting using exclusively Array Higher-Order Functions such as map, filter, and sort.
* **Responsive Design:** Developing a user interface that adapts seamlessly to mobile, tablet, and desktop environments.
* **User Experience:** Providing immediate feedback through loading states and intuitive interactive elements.

## Public API Integration
The application utilizes the Radio Browser API, a comprehensive, community-driven database of worldwide radio stations.

* **API Resource:** https://de1.api.radio-browser.info/
* **Functionality:** This API provides a vast dataset including station names, geographical locations, broadcast languages, genres, and streaming URLs, which allows for extensive data manipulation and filtering.

## Planned Features
In accordance with the project milestones, the following features will be implemented:

### Core Functionality
* **Keyword Search:** Users can locate specific stations or genres using a search input, processed via the .filter() and .includes() methods.
* **Criteria Filtering:** A system to filter results by country or language to narrow down the global dataset.
* **Dynamic Sorting:** Options to arrange stations alphabetically or by popularity using the .sort() method.

### User Interface Elements
* **Theme Customization:** A toggle for Dark Mode and Light Mode to enhance visual comfort.
* **Interactive Station Cards:** Each result will feature an interactive element to trigger the live audio stream or view additional station details.

## Implementation Constraints
* **Logic Requirements:** All data operations will be performed using Higher-Order Functions. Traditional loops such as "for" or "while" are strictly avoided to ensure modern, declarative code patterns.
* **Originality:** This project is developed without the use of AI generation tools for implementation, ensuring all logic and styling are original works.
* **Version Control:** Regular commits with meaningful messages will be maintained throughout the development process to track progress across all four milestones.

## Setup and Execution
To run this project locally for evaluation:
1. Clone the repository to your local machine.
2. Open the index.html file in any modern web browser.
3. Ensure an active internet connection to allow the Fetch API to retrieve live data from the Radio Browser servers.
