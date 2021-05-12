import "reflect-metadata"; 
import {createConnection} from "typeorm"; 
import {Student} from "./entity/Student"; 
import {getMongoRepository} from "typeorm"; 


createConnection().then(async connection => { 

   console.log("Inserting a new Student into the database..."); const std = new Student(); std.Name = "Student2"; 
   std.Country = "Brasil"; 
   await connection.manager.save(std); console.log("Saved a new user with id: " + std.id); 
   
   console.log("Loading users from the database..."); 
   const stds = await connection.manager.find(Student); console.log("Loaded users: ", stds); 

   const studentRepository = getMongoRepository(Student); 
   const result = await studentRepository.find({ 
      where: { 
         Country: {$eq: "Brasil"}, 
      } 
   });

   console.log("Repository Students:", result[0])
   
   console.log("TypeORM with MongoDB"); 
}).catch(error => console.log(error));