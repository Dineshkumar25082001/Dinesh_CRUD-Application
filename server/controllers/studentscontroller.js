
const mysql=require("mysql");
const con=mysql.createPool({
    host : process.env.DB_HOST,
    user:  process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

 });



exports.view=(req,res)=>{
    con.getConnection((err,connection)=>{
     if(err) throw err
        connection.query("select * from dkcrud",(err,rows)=>{
            connection.release();
            if(!err){
                console.log("good");
                return res.render("home",{rows});
            }
            else{
               console.log("Error in Listin"+err);
                }
                
        });
        });
       
 };
 exports.adduser=(req,res)=>{
    res.render("adduser");
 }

 exports.save=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
           const {First,Last,location,email,Dob,education}=req.body;
           connection.query("insert into dkcrud (FNAME,LNAME,LOCATION,email,DOB,EDUCATION) values(?,?,?,?,?,?)"
            ,[First,Last,location,email,Dob,education],(err,rows)=>{
            connection.release();
               if(!err){
                
                   return res.render("adduser",{msg:"User Details added success"});
               }
               else{
                  console.log("Error in Listin"+err);
                   }
           
           });
        });
    }
 

    exports.edituser=(req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
            let id=req.params.id;
               connection.query("select * from dkcrud where id=?",[id]
                ,(err,rows)=>{
                   connection.release();
                   if(!err){
                       
                       return res.render("edituser",{rows});
                   }
                   else{
                      console.log("Error in Listin"+err);
                       }
                       
               });
               });

    }
    exports.edit=(req,res)=>{
        con.getConnection((err,connection)=>{
            if(err) throw err
               const {First,Last,location,email,Dob,education}=req.body;
               let id=req.params.id;
               connection.query("update dkcrud set FNAME=?,LNAME=?,LOCATION=?,email=?,DOB=?,EDUCATION=?,where ID=?"
                ,[First,Last,location,email,Dob,education,id],(err,rows)=>{
                connection.release();
                   if(!err){
                    con.getConnection((err,connection)=>{
                        if(err) throw err
                        let id=req.params.id;
                           connection.query("select * from dkcrud where id=?",[id]
                            ,(err,rows)=>{
                               connection.release();
                               if(!err){
                                   return res.render("edituser",{rows,msg:"User Details Updated success"});
                               }
                               else{
                                console.log("Error in Listin"+err);
                                 }
                                 
                                   
                           });
                           });
                        }
                        else{
                            console.log("Error in Listin"+err);
                             }
                      
                   
               
               });
            });
        }

        exports.Delete=(req,res)=>{
                  con.getConnection((err,connection)=>{
                   if(err) throw err
                   let id=req.params.id;
                   connection.query("delete from dkcrud where id=?",[id],(err,rows)=>{
                    connection.release();
                    if(!err){
                        res.redirect("/");
                    }else{
                        console.log(err);
                    }
                   });
                

                  });
        }
     