# Node.js backend boilerplate
## Dev environment setup

### Setup Prerequisites
Install the below softwares

| S.No        | Software   | Version   | Reference |
| :---------  | :--------  | :-------  | :-------- |
| 1           | node       | >= 9.10.0 | [Node.js installation with nvm](https://blog.pm2.io/install-node-js-with-nvm/) |
| 2           | npm        | >= 6.4.1  | [npm installation](https://www.npmjs.com/get-npm) |
| 3           | postgresql | >= 10.1   | [PostgreSQL installation](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04) |

### Setup Instructions
1. Clone the project

    ```shell
    git clone git@github.com:Codebrahma/nodejs-backend-boilerplate.git
    ```
2. Switch your current working directory to the root directory of the project

    ```shell
    cd nodejs-backend-boilerplate
    ```
3. Install the dependencies required by the app and development environment

    ```shell
    npm install
    ```
3. Clone the `config/config.json.example` file. Renamed the cloned file to `config/config.json`

    ```shell
    cp config/config.json.example config/config.json
    ```
4. Open `config/config.json` in your source code editor and update your database credentials for development & test environments.
5. Copy the environmental variables for development and test environments

    ```shell
    cp config/sample.env.example config/development.env
    cp config/sample.env.example config/test.env
    ```
6. Create databases for development and test environments

    ```shell
    NODE_ENV=development node_modules/.bin/sequelize db:create
    NODE_ENV=test node_modules/.bin/sequelize db:create
    ```
7. Run schema migrations for development and test environments

    ```shell
    NODE_ENV=development node_modules/.bin/sequelize db:migrate
    NODE_ENV=test node_modules/.bin/sequelize db:migrate
    ```
8. Verify the setup by running the following command. If all the tests pass, then you are good to go. If any tests fail, address your issue by mailing repo maintainers.

    ```shell
    npm run test
    ```
9. Start the server

    ```shell
    npm start
    ```

## Developer notes

### To Contribute
1. Create a new feature branch from `master` branch
2. Make your contribution or changes
3. Make sure no test is failing and you have code coverage more than 90% by running `npm run test`
4. Push your branch to github.com
5. Raise PR to `staging` from your feature branch.
6. Make sure `CircleCI` build passes at your feature branch. Your branch will only be merged after the review done by app maintainers.
7. Assign `ready-for-review` label to your PR once you are done.