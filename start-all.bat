echo off

rem NPM Startup

cd angular\whi
start "Angular" "npm start"
cd ..\..

pause 1

cd react-next\whi
start "React-Next" "npm run dev"
cd ..\..

pause 1

cd svelte\whi
start "Svelte" "npm run dev"
cd ..\..

pause 1

cd vue\whi
start "Vue" "npm run serve"
cd ..\..

pause 10

rem TODO typescript server

rem start browser

start chrome localhost:4200

pause 1

start chrome localhost:3000

pause 1

start chrome localhost:5173

pause 1

start chrome localhost:8080

pause