import { Grid, Typography } from '@mui/material'
import React from 'react'
import theme from '../../theme'
import { Link } from 'react-router-dom'

function TagsWidget() {
    const questiontags = [{ name: "Javascript", description: "JavaScript is a versatile and widely-used programming language. It is primarily known for its role in web development, enabling dynamic and interactive behavior in web pages." },
    { name: "C++", description: "C++ is a powerful, general-purpose programming language. It extends the C programming language with additional features like object-oriented programming, making it suitable for a wide range of applications." },
    { "name": "C", "description": "C is a foundational and procedural programming language. It is widely used for system and application development and is known for its efficiency and low-level programming capabilities." },
    { name: "Java", description: "Java is a versatile, object-oriented programming language. It is designed to be platform-independent, allowing developers to write code that can run on different devices without modification." },
    { name: "Python", description: "Python is a high-level, interpreted programming language known for its readability and simplicity. It supports multiple programming paradigms and is widely used in various domains, including web development and data science." },
    { name: "Android", description: "Android refers to the open-source operating system and development platform used for mobile devices. Android apps are commonly written in Java or Kotlin." },
    { name: "CSS", description: "CSS (Cascading Style Sheets) is a styling language used to control the presentation of HTML and XML documents. It is crucial for web development to define the layout and appearance of web pages." },
    { name: "HTML", description: "HTML (Hypertext Markup Language) is the standard markup language used to create web pages. It structures content on the web and is essential for building the basic structure of a webpage." },
    { name: "IOS", description: "iOS is Apple's mobile operating system. It runs on Apple devices like iPhones and iPads. Development for iOS is typically done using Swift or Objective-C." },
    { name: "php", description: "PHP is a server-side scripting language used for web development. It can generate dynamic content, interact with databases, and is often embedded in HTML." },
    { name: "Kotlin", description: "Kotlin is a modern programming language that runs on the Java Virtual Machine (JVM). It's officially supported for Android development and is known for its conciseness and safety features." },
    { name: "Mysql", description: "MySQL is an open-source relational database management system (RDBMS). It is widely used for managing and querying databases in web applications." },
    { name: "mongodb", description: "MongoDB is a NoSQL database that stores data in JSON-like documents. It is designed for flexibility and scalability, making it suitable for various types of applications." },
    { name: "C#", description: "C# (pronounced C sharp) is a modern, object-oriented programming language developed by Microsoft. It is commonly used for developing Windows applications and web services." },
    { name: "Jquery", description: "jQuery is a fast and lightweight JavaScript library. It simplifies HTML document traversal and manipulation, event handling, and animation, making it easier to create interactive websites." },
    { name: "sql", description: "SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It is used for tasks such as querying databases, updating data, and creating tables." },
    { name: "swift", description: "Swift is a powerful and intuitive programming language developed by Apple for iOS, macOS, watchOS, and tvOS app development. It's known for its safety features and speed." },
    { name: "angular", description: "Angular is a front-end web application framework developed by Google. It simplifies the development of dynamic, single-page web applications." },
    { name: "react", description: "React is a JavaScript library for building user interfaces. It's maintained by Facebook and allows developers to create reusable UI components for building efficient and interactive user interfaces." },
    { name: "Threejs", description: "Three.js is a JavaScript library used for creating 3D graphics in web browsers. It simplifies the process of working with WebGL, enabling developers to build immersive 3D experiences." },
    { name: "NextJs", description: "ext.js is a React framework for building server-rendered applications. It simplifies the process of building React applications with features like server-side rendering and automatic code splitting." },
    { name: "Array", description: "An array is a data structure that stores elements of the same type in a contiguous block of memory. It allows for efficient indexing and retrieval of elements." },
    { name: "String", description: "A string is a sequence of characters. In programming, strings are used to represent text and are a fundamental data type in many programming languages." },
    { name: "Linux", description: "Linux is an open-source operating system kernel known for its stability, security, and flexibility. It serves as the foundation for various operating systems, offering a customizable and powerful environment for servers, desktops, and embedded systems" }]
    return (
        <div style={{ marginTop: '100px', overflowX: 'hidden' }}>
            <h1 style={{ color: "blue", marginLeft: "3rem" }}>
                Tags
            </h1>

            <Grid container spacing={2} style={{ justifyContent: 'center' }} >
                {questiontags.map((questiontag, i) =>
                    <Grid item xs={5} sm={3} md={3} lg={2.4} key={i} sx={{ margin: "1rem", border: "0.4px solid black" }} >
                        <Link to='/tagSelected' state={{ questiontag:questiontag.name }}> <Typography sx={{ marginLeft: "1rem", marginTop: "0.5rem", borderRadius: "6px", backgroundColor: theme.palette.primary.light, color: theme.palette.primary.main, padding: "0.2rem", fontSize: "0.7rem", display: "inline" }}>
                            {questiontag.name}
                        </Typography></Link>
                        <div style={{
                            overflow: 'hidden',
                            height: '8.4rem',
                            lineHeight: '1.1em', padding: "0.8rem"
                        }}>
                            <Typography style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 6,
                                WebkitBoxOrient: "vertical",
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                fontSize: "0.8rem"
                            }}>
                                {questiontag.description}
                            </Typography>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>

    )
}

export default TagsWidget
