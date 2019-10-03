# CSV to GraphQL
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
    git clone git@github.com:Codebrahma/csv-to-graphql.git
    ```
2. Switch your current working directory to the root directory of the project

    ```shell
    cd csv-to-graphql
    ```
3. Install the dependencies required by the app and development environment

    ```shell
    npm install
    ```
4. Start the server

    ```shell
    npm start
    ```

## Developer notes

### To Contribute
1. Create a new feature branch from `master` branch
2. Make your contribution or changes
3. Push your branch to github.com
4. Raise PR to `master` from your feature branch.
5. Assign `ready-for-review` label to your PR once you are done.