To install PostgreSQL driver on your machine run:
- sudo apt update
- sudo apt install postgresql postgresql-contrib

To set the password for the PostgreSQL server and setup the initial database , run:
- sudo -u postgres psql
- Then type "ALTER USER postgres WITH PASSWORD '1234';"
- Then type "CREATE DATABASE saka_keja"

To create a connection to the saka_keja database on the PostgreSQL server in VS Code"
- Go to extensions search and install PostgreSQL by Microsoft. After installation it appears on the leftmost bar of the VS Code window
- Open the extension and click on Add New Connection:
    - For servername use 'localhost
    - For authentication type use 'password'
    - For username use 'postgres'
    - For password use '1234'
    - For database use 'saka_keja'
    - You can leave the connection name empty
    - Click on 'Save and Connect' and the connection will appear on the left panel under Connections

