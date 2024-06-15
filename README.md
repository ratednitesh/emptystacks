# DESCRIPTION 

This is a **Web Based project** to Host my study material related to Software Engg.
> This is an Open Source Project.

## File System:
    FIRST LOAD:
            HTML - index.html,
            JS -   index.js
                         firebase-config.js
                         event-bus.js (content.js)
                         setup.js
                         router.js (dependency-loader.js), 
            CSS - *.css
    OTHER STATIC CONTENT:
            HTML - about.html
                   contact.html 
                   notFound.html 
                   profileUpdate.html  (potential modal)
                   register.html (potential modal)
    OTHER DYNAMIC CONTENT:
            HTML - content.html, contentSidebar.html, course.html, home.html, profile.html
            CSS - <none>
            JS  - home.js
                  course.js
                  profile.js 
                  fetch-data.js



# Javascript Files:
        Entry Point: 
                index.js 
                        - Imports all css files
                        - On DomContentLoaded initialize:
                        - firebase and then-
                                - eventbus
                                - staticContent
                                - Router
                                - remove preloader
        firebase-config.js
                - Setup connection with Firebase (Init)
                - Auth state Manangement (Init)
                - Authentication Functions
                - Login Status Checks/ Getters

        setup.js



