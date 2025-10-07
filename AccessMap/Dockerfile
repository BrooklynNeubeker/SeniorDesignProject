
# Application Build for Node JS
FROM node
WORKDIR /AccessMap
COPY package*.json /AccessMap
COPY . /AccessMap
RUN npm install
# tailwindcss @tailwindcss/cli
# this one is defined in the package.json, it does the npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css without the watch so that it actually ends
RUN npm run build-css

EXPOSE 8080
CMD ["node","app.js"]