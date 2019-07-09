import {
  EntityMetadata,
  FindOperator,
  getConnection,
  createConnection,
  getRepository,
  ObjectType,
  Repository,
} from 'typeorm';


(async () => {

  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "test"
  });

  console.log(getConnection().entityMetadatas);
})()

