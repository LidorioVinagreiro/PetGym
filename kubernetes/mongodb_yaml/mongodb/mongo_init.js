/*db.createUser(
   {
     user: "chefe",
     pwd: "password",
     roles: [
        {
          role : "userAdmin",
          db : "db"
        }
      ]
    }
)

use QuintaMiao;
db.CreateCollection("Users");
db.CreateCollection("User");*/

/*db.createUser(
  {
    user: "chefe",
    pwd: "password",
    roles: [
       {
         role : "readWrite",
         db : "QuintaMiao2"
       }
     ]
   }
)
*/

  db.createUser(
    {
      user: "chefe",
      pwd: "password",
      roles: [
         {
           role : "readWrite",
           db : "QuintaMiao2"
         }
       ]
     }
  );

  db.createCollection("users");
